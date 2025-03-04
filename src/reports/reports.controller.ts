import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Get()
    async getEstimate(@Query() query: GetEstimateDto){
        return this.reportsService.createEstimate(query)
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    async createRepost(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportsService.create(body, user)
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    async approveReport(@Param("id") id: string, @Body() body: ApproveReportDto){
        return this.reportsService.changeApproval(id, body.approved)
    }
}
