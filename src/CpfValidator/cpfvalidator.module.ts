import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsersEntity } from '../database/entities/users.entity';
import { CpfValidatorController } from './cpfvalidator.controller';
import { CpfValidatorService } from './cpfvalidator.service';

@Module({
  imports: [],
  controllers: [CpfValidatorController],
  providers: [CpfValidatorService, PrismaService, UsersEntity],
})
export class CpfValidatorModule {}
