import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

// The order of the statements below makes a huge difference.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
