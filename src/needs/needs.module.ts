import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheltersModule } from '../shelters/shelters.module';
import { Need } from './entities/need.entity';
import { NeedsController } from './needs.controller';
import { NeedsService } from './needs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Need]), SheltersModule],
  controllers: [NeedsController],
  providers: [NeedsService],
})
export class NeedsModule {}
