import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { Report } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
