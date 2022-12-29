import { Post, Body, Controller, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { StatusPumpsDTO } from '../dto/statusPumps.dto';
import { PumpsEntity } from '../entities/pumps.entity';
import { PumpsService } from '../service/pumps.service';

@Controller('pumps')
export class AlarmController {

    constructor(private pumpsService: PumpsService) { }  

    @Post()
    async insert(@Body() statePumps: StatusPumpsDTO): Promise<PumpsEntity> {
        try {
            return await this.pumpsService.insert(statePumps);
        } catch (err) {
            throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findOne(){
        try{
            const res = await this.pumpsService.findAll();
            return res;
        }catch (err) {
            throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
        }       
    }
}
