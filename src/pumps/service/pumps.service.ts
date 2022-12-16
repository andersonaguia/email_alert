import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmailService } from './email.service';
import { PumpsEntity } from './../entities/pumps.entity';
import { StatusPumpsDTO } from './../dto/statusPumps.dto';
import { CmdPumpsEntity } from '../entities/cmdPumps.entity';

@Injectable()
export class PumpsService {

    constructor(
        private emailService: EmailService,

        @Inject('PUMPS_REPOSITORY')
        private pumpRepository: Repository<PumpsEntity>,
        @Inject('CMD_PUMPS_REPOSITORY')
        private cmdPumpsRepository: Repository<CmdPumpsEntity>       
    ) { }  
    
    async

    async insert(statePumps: StatusPumpsDTO): Promise<PumpsEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                const { id } = (await this.pumpRepository.insert(statePumps)).generatedMaps[0];
                let created = new PumpsEntity();
                created = { ...statePumps, id: id, createdAt: new Date() }
                /*const body = {
                    body: {
                        addresses: [
                            "manutencao@condominiosolartambau.com.br", "sindico@condominiosolartambau.com.br", "atendimento@condominiosolartambau.com.br", "manutencao2@condominiosolartambau.com.br", "supervisaosolartambaujp@gmail.com"
                        ],
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
                */
                resolve(created);
            } catch (error: any) {
                reject({
                    code: error.code,
                    detail: error.detail
                })
            } 
        })
    }

    async findAll(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const cmdBombas = await this.cmdPumpsRepository.find();
                const response = cmdBombas[0].piscina + cmdBombas[0].fonte + cmdBombas[0].borda + cmdBombas[0].relay4;
                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }
}
