import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  createdAt: Date;
}
