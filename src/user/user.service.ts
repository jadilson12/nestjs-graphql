import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handlerError } from 'src/config';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async finAll(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async findOneById(id: string): Promise<User> {
		try {
			const user = await this.userRepository.findOne(id);
			if (!user) {
				throw new NotFoundException('User not found');
			}
			return user;
		} catch (err) {
			handlerError(err);
		}
	}

	async createUser(data: CreateUserInput): Promise<User> {
		try {
			const user = this.userRepository.create(data);
			const userSaved = await this.userRepository.save(user);

			if (!userSaved) {
				throw new InternalServerErrorException(
					'Problem to create a user. Try again',
				);
			}
			return userSaved;
		} catch (err) {
			handlerError(err);
		}
	}

	async updateUser(id: string, data: UpdateUserInput): Promise<User> {
		try {
			const user = await this.findOneById(id);
			await this.userRepository.update(user, { ...data });
			return this.userRepository.create({ ...user, ...data });
		} catch (err) {
			handlerError(err);
		}
	}

	async deleteUser(id: string): Promise<boolean> {
		try {
			const user = await this.findOneById(id);
			const deleted = await this.userRepository.delete(user);

			if (deleted) {
				return true;
			}

			return false;
		} catch (err) {
			handlerError(err);
		}
	}
}
