import { DataSource } from 'typeorm';
import { CmdPumpsEntity } from './entities/cmdPumps.entity';
import { PumpsEntity } from './entities/pumps.entity';

export const pumpsProviders = [
  {
    provide: 'PUMPS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PumpsEntity),
    inject: ['DATA_SOURCE']
  },
  {
    provide: 'CMD_PUMPS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CmdPumpsEntity),
    inject: ['DATA_SOURCE']
  },
];