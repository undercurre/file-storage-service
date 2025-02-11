import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponceInterceptor } from './intercept/responce.intercepter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponceInterceptor());
  await app.listen(3004);
}
bootstrap();
