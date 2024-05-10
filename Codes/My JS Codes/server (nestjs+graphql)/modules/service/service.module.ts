import { Module } from '@nestjs/common';

import { ConfigModule } from 'modules/config/config.module';
import { DatabaseModule } from 'modules/database/database.module';
import { LoggerModule } from 'modules/logger/logger.module';

@Module({
  imports: [ConfigModule, DatabaseModule, LoggerModule],
})
export class ServiceModule {}
