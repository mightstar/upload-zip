import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { Module } from '@nestjs/common';
import { Format } from 'logform';
import { WinstonModule as NestWinstonModule, utilities } from 'nest-winston';
import { format, transports } from 'winston';

import { ConfigService } from 'modules/config/config.module';

const defaultFormat: Format = format.combine(format.timestamp(), utilities.format.nestLike());

@Module({
  imports: [
    NestWinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transports: [
          new transports.Console({
            format: defaultFormat,
          }),
          new LogtailTransport(new Logtail(configService.get('LOGTAIL_TOKEN')), {
            format: defaultFormat,
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class LoggerModule {}
