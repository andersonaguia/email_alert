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
        private alarmRepository: Repository<AlarmEntity>        
    ) { }   

    async insert(alarm: CreateAlarmDTO): Promise<AlarmEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                const { id } = (await this.alarmRepository.insert(alarm)).generatedMaps[0];
                let created = new AlarmEntity();
                created = { ...alarm, id: id, createdAt: new Date() }
                const body = {
                    body: {
                        addresses: [
                            "manutencao@condominiosolartambau.com.br", "sindico@condominiosolartambau.com.br", "atendimento@condominiosolartambau.com.br", "manutencao2@condominiosolartambau.com.br", "supervisaosolartambaujp@gmail.com"
                        ],
                        // addresses: [
                        //     "manutencao@condominiosolartambau.com.br"
                        // ],
                        subject: "",
                        text: ""		
                    }
                }

                if(created.activated === "1" || created.activated === "true"){
                    body.body.subject = "Alarme no Sistema (não responder)"
                    body.body.text = `Existe um alarme no sistema <strong>${created.device}</strong>.<br><br>Detalhes: <strong>${created.message}</strong>`
                }else{
                    body.body.subject = "Recuperação de Alarme (não responder)"
                    body.body.text = `O alarme no sistema <strong>${created.device}</strong> foi resolvido.`
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
