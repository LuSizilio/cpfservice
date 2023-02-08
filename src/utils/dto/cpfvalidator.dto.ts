import { ApiProperty } from '@nestjs/swagger';

export class AddCpfInputDTO {
  @ApiProperty()
  cpf: string;
}

export class CheckCpfResponseDTO {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  createdAt: Date;
}

export class ErrorDTO {
  status: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  message: string;
}
