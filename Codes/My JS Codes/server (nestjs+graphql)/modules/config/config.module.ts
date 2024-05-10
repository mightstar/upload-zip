import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService as NestConfigService } from '@nestjs/config';

import configuration from 'config/configuration';
import { EnvironmentVariables } from 'types';
import { envValidationSchema } from 'validation/env';

export class ConfigService extends NestConfigService<EnvironmentVariables, true> {}

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      validationSchema: envValidationSchema,
      load: [configuration],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
