import { HttpException, HttpStatus } from '@nestjs/common';

export const HandleError = (error) => {
  if (error?.status !== undefined) {
    const { status, ...errorData } = error;
    throw new HttpException(errorData, status);
  }
  throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR, { cause: error });
};
