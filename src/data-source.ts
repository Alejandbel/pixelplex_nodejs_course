import { DataSource } from 'typeorm';

import { Answer } from '@answers';
import { Card } from '@cards';
import { DATASOURCE_CONFIG } from '@config';
import { Language } from '@languages';
import * as Migrations from '@migrations';
import { Task } from '@tasks';
import { User } from '@users';
import { Word } from '@words';

export const AppDataSource = new DataSource({
  type: DATASOURCE_CONFIG.TYPE,
  host: DATASOURCE_CONFIG.HOST,
  port: DATASOURCE_CONFIG.PORT,
  username: DATASOURCE_CONFIG.USERNAME,
  password: DATASOURCE_CONFIG.PASSWORD,
  database: DATASOURCE_CONFIG.DATABASE,
  synchronize: DATASOURCE_CONFIG.SYNCHRONIZE,
  logging: DATASOURCE_CONFIG.LOGGING,
  entities: [User, Language, Task, Card, Answer, Word],
  migrations: Object.values(Migrations),
});
