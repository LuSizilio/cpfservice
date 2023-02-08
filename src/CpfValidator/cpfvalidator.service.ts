import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entities/users.entity';
import { EXISTS_CPF_EXCEPTION, INVALID_CPF_EXCEPTION, NOTFOUND_CPF_EXCEPTION, UNKNOW_ERROR } from '../utils/constants/errors';
import { AddCpfInputDTO, CheckCpfResponseDTO } from '../utils/dto/cpfvalidator.dto';

@Injectable()
export class CpfValidatorService {
  constructor(private readonly usersEntity: UsersEntity) {}

  async addCpf(input: AddCpfInputDTO): Promise<void> {
    if (this.validaCpf(input.cpf) === false) {
      throw INVALID_CPF_EXCEPTION;
    }

    try {
      await this.usersEntity.user({ cpf: input.cpf });
    } catch (error) {
      // 'P2025' é o código retornado pelo prisma quando não encontra o usuário
      if (error?.code === 'P2025') {
        await this.usersEntity.createUser({
          cpf: input.cpf,
        });
        return;
      } else {
        throw UNKNOW_ERROR;
      }
    }
    throw EXISTS_CPF_EXCEPTION;
  }

  async checkCpf(cpf: string): Promise<CheckCpfResponseDTO> {
    if (this.validaCpf(cpf) === false) {
      throw INVALID_CPF_EXCEPTION;
    }
    try {
      const user = await this.usersEntity.user({ cpf });
      return {
        cpf: user.cpf,
        createdAt: user.createdAt,
      };
    } catch (error) {
      // 'P2025' é o código retornado pelo prisma quando não encontra o usuário
      if (error?.code === 'P2025') {
        throw NOTFOUND_CPF_EXCEPTION;
      }
    }
    throw UNKNOW_ERROR;
  }

  async removeCpf(cpf: string): Promise<void> {
    await this.checkCpf(cpf);
    await this.usersEntity.deleteUser({ cpf });
  }

  async findAllCpfs(): Promise<CheckCpfResponseDTO[]> {
    return await this.usersEntity.users({});
  }

  validaCpf(cpf: string): boolean {
    if (typeof cpf !== 'string' || cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false;
    }

    const values = cpf.split('').map((el) => +el);
    const rest = (count) => ((values.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10;

    return rest(10) === values[9] && rest(11) === values[10];
  }
}
