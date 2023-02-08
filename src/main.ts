import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CpfValidatorModule } from './CpfValidator/cpfvalidator.module';

async function bootstrap() {
  const app = await NestFactory.create(CpfValidatorModule);
  const config = new DocumentBuilder()
    .setTitle('Documentação CPF Service')
    .setDescription('API para tratamentos e validações de usuários.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8000);
}
bootstrap();
