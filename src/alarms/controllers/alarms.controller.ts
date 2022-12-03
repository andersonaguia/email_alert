import { Post, Body, Controller, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { CreateAlarmDTO } from '../dto/create-alarm.dto';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmService } from '../service/alarm.service';

@Controller('system_alarms')
export class AlarmController {

    constructor(private alarmService: AlarmService) { }  

    @Post()
    async insert(@Body() alarm: CreateAlarmDTO): Promise<AlarmEntity> {
        try {
            return await this.alarmService.insert(alarm);
        } catch (err) {
            throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    findOne(){
        return "recebido";
    }
}
