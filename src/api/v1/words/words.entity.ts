import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonEntity } from '@entities';
import { Language } from '@languages';

@Entity('word')
export class Word extends CommonEntity {
  @ManyToOne(() => Language, {
    onDelete: 'CASCADE',
  })
  language: Language;

  @Column()
  word: string;
}
