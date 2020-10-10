import { BadRequestException, NotFoundException } from '@nestjs/common';
import { message } from 'src/config/message';

export const handlerError = (error: any) => {
	const { response: res } = error;

	if (
		res?.statusCode !== undefined &&
		res?.statusCode &&
		res?.statusCode === 404
	) {
		throw new NotFoundException(message.notFound, res.error);
	}

	throw new BadRequestException(message.errorInternal);
};
