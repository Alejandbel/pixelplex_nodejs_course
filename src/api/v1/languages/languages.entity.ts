import { Column, Entity, Index, Unique } from 'typeorm';

import { CommonEntity } from '@entities';

@Entity('language')
@Unique(['code'])
export class Language extends CommonEntity {
  @Index()
  @Column()
  title: string;

  @Column()
  code: string;
}
