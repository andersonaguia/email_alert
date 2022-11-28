import { DataSource } from 'typeorm';
import { AlarmEntity } from './entities/alarm.entity';

export const alarmProviders = [
  {
    provide: 'ALARM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AlarmEntity),
    inject: ['DATA_SOURCE'],
  },
];