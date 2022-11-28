import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { AlarmController } from './controllers/alarms.controller';
import { AlarmService } from './service/alarm.service';
import { alarmProviders } from './alarm.providers';
import { EmailService } from './service/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [  
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true 
    }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.USER_EMAIL}:${process.env.PASSWORD}@${process.env.SERVER_EMAIL}`,
      defaults: {
        from: `"Solar Tambaú" <${process.env.USER_EMAIL}>`,
      },
      preview: false,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],  
  controllers: [AlarmController],
  providers: [
    ...databaseProviders,
    ...alarmProviders,    
    AlarmService,
    EmailService
  ]  
})
export class UsuariosModule {}
