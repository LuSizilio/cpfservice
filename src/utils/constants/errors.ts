import { HttpStatus } from '@nestjs/common';
import { ErrorDTO } from '../dto/cpfvalidator.dto';

export const UNKNOW_ERROR: ErrorDTO = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  type: 'InternalServerError',
  message: 'Sorry, may occurred some internal server error, try again later.',
};

export const INVALID_CPF_EXCEPTION: ErrorDTO = {
  status: HttpStatus.BAD_REQUEST,
  type: 'InvalidCpfException',
  message: 'CPF is not valid.',
};

export const NOTFOUND_CPF_EXCEPTION: ErrorDTO = {
  status: HttpStatus.NOT_FOUND,
  type: 'NotFoundCpfException',
  message: 'CPF is not valid.',
};

export const EXISTS_CPF_EXCEPTION: ErrorDTO = {
  status: HttpStatus.BAD_REQUEST,
  type: 'ExistsCpfException',
  message: 'CPF already exists.',
};
