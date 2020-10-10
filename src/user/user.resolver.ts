import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
	constructor(private readonly _userService: UserService) {}

	@Query(() => [User])
	async users(): Promise<User[]> {
		return await this._userService.finAll();
	}

	@Mutation(() => User)
	async createUser(@Args('data') data: CreateUserInput): Promise<User> {
		return await this._userService.createUser(data);
	}

	@Query(() => User)
	async user(@Args('id') id: string): Promise<User> {
		return await this._userService.findOneById(id);
	}

	@Mutation(() => User)
	async updateUser(
		@Args('id') id: string,
		@Args('data') data: UpdateUserInput,
	): Promise<User> {
		return await this._userService.updateUser(id, data);
	}

	@Mutation(() => Boolean)
	async deletUser(@Args('id') id: string): Promise<boolean> {
		return await this._userService.deleteUser(id);
	}
}
