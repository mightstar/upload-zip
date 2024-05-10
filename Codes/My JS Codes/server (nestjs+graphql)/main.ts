import { NestFactory } from '@nestjs/core';

import { ConfigService } from 'modules/config/config.module';

import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  await app.listen(config.get<number>('PORT'));
})();
