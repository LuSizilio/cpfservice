import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserDTO } from '../../utils/dto/users.dto';

@Injectable()
export class UsersEntity {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.usersWhereUniqueInput): Promise<UserDTO> {
    return this.prisma.users.findUniqueOrThrow({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<Omit<UserDTO, 'id'>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.users.findMany({
      select: {
        cpf: true,
        createdAt: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.usersCreateInput): Promise<UserDTO> {
    return this.prisma.users.create({
      data,
    });
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<UserDTO> {
    return this.prisma.users.delete({
      where,
    });
  }
}
