import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { NeedsModule } from './needs/needs.module';
import { SheltersModule } from './shelters/shelters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    SheltersModule,
    NeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
