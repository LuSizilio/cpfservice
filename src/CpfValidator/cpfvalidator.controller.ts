import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddCpfInputDTO, CheckCpfResponseDTO, ErrorDTO } from '../utils/dto/cpfvalidator.dto';
import { HandleError } from '../utils/handle.errors';
import { CpfValidatorService } from './cpfvalidator.service';

@ApiTags('Validação CPF de usuários')
@Controller('/cpf')
export class CpfValidatorController {
  constructor(private readonly cpfValidatorService: CpfValidatorService) {}

  @ApiCreatedResponse({
    description: 'CPF Validado e cadastrado com sucesso.',
  })
  @ApiBadRequestResponse({
    type: ErrorDTO,
    description: 'Ocorreu um erro durante a validação do CPF especificado.',
  })
  @ApiBody({ type: AddCpfInputDTO })
  @ApiOperation({ summary: 'Adicionar CPF a lista restrita (addCpf)' })
  @Post()
  async addCpf(@Body() input: AddCpfInputDTO): Promise<void> {
    try {
      await this.cpfValidatorService.addCpf(input);
    } catch (error) {
      HandleError(error);
    }
  }

  @ApiOkResponse({
    type: CheckCpfResponseDTO,
    description: 'CPF encontrado com sucesso.',
  })
  @ApiBadRequestResponse({
    type: ErrorDTO,
    description: 'Ocorreu um erro de validação para o CPF especificado.',
  })
  @ApiNotFoundResponse({
    type: ErrorDTO,
    description: 'CPF verificado porém não foi encontrado.',
  })
  @ApiParam({ name: 'cpf', required: true, description: 'CPF usado para checagem', schema: { oneOf: [{ type: 'string' }] } })
  @ApiOperation({ summary: 'Checar se CPF está na lista restrita (checkCpf)' })
  @Get('/:cpf')
  async checkCpf(@Param('cpf') cpf): Promise<CheckCpfResponseDTO> {
    try {
      return await this.cpfValidatorService.checkCpf(cpf);
    } catch (error) {
      HandleError(error);
    }
  }

  @ApiOkResponse({
    description: 'CPF deletado com sucesso.',
  })
  @ApiBadRequestResponse({
    type: ErrorDTO,
    description: 'Ocorreu um erro de validação para o CPF especificado.',
  })
  @ApiNotFoundResponse({
    type: ErrorDTO,
    description: 'CPF verificado porém não foi encontrado.',
  })
  @ApiParam({
    name: 'cpf',
    required: true,
    description: 'CPF que será removido da lista restrita.',
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiOperation({ summary: 'Remover CPF da lista restrita (removeCpf)' })
  @Delete('/:cpf')
  async removeCpf(@Param('cpf') cpf): Promise<void> {
    try {
      await this.cpfValidatorService.removeCpf(cpf);
    } catch (error) {
      HandleError(error);
    }
  }

  @ApiOkResponse({
    type: CheckCpfResponseDTO,
    isArray: true,
    description: 'Listagem de todos CPFs encontrados.',
  })
  @ApiOperation({ summary: 'Retornar todos os CPFs da lista restrita (findAllCpfs)' })
  @Get()
  async findAllCpfs(): Promise<CheckCpfResponseDTO[]> {
    return this.cpfValidatorService.findAllCpfs();
  }
}
