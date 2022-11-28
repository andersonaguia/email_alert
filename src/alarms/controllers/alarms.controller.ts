import { Post, Body, Controller, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { CreateAlarmDTO } from '../dto/create-alarm.dto';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmService } from '../service/alarm.service';

@Controller('system_alarms')
export class AlarmController {

    constructor(private alarmService: AlarmService) { }  

    @Post()
    async insert(@Query() activated: boolean, @Query() device: string) {
        console.log("Activated: ", activated);
        console.log("Device: ", device);
        try {
           // return await this.alarmService.insert(alarm);
           return "throw new HttpStatus.CREATED;";
        } catch (err) {
            throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
        }
    }
}
