import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmModule } from './alarms/alarm.module';
import { PumpsModule } from './pumps/pumps.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true 
    }),   
    AlarmModule,
    PumpsModule
  ],
  controllers: [AppController],
  providers: [    
    AppService
  ],
})
export class AppModule {}
