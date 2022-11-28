import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './alarms/alarm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true 
    }),
   
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [    
    AppService
  ],
})
export class AppModule {}
