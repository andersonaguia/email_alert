import { Inject, Injectable } from '@nestjs/common';
import { CreateAlarmDTO } from 'src/alarms/dto/create-alarm.dto';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';
import { EmailService } from './email.service';

@Injectable()
export class AlarmService {

    constructor(
        private emailService: EmailService,

        @Inject('ALARM_REPOSITORY')
        private userRepository: Repository<AlarmEntity>        
    ) { }   

    async insert(alarm: CreateAlarmDTO): Promise<AlarmEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                const { id } = (await this.userRepository.insert(alarm)).generatedMaps[0];
                let created = new AlarmEntity();
                created = { ...alarm, id: id }
                const body = {
                    body: {
                        addresses: [
                            "andersonlaguiar@gmail.com", "manutencao@condominiosolartambau.com.br"
                        ],
                        subject: "",
                        text: ""		
                    }
                }

                if(created.activated){
                    body.body.subject = "Alarme no Sistema (não responder)"
                    body.body.text = `Existe um alarme no sistema ${created.device}. Deve ser verificado imediatamente`
                }else{
                    body.body.subject = "Recuperação de Alarme (não responder)"
                    body.body.text = `O alarme no sistema ${created.device} foi resolvido.`
                }
                await this.emailService.sendingMail(body);
                resolve(created);
            } catch (error: any) {
                reject({
                    code: error.code,
                    detail: error.detail
                })
            }
        })
    }
}
