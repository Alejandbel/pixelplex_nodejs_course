import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from '@entities';
import { Language } from '@languages';

@Entity('word')
export class Word extends CommonEntity {
  @ManyToOne(() => Language, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'languageId' })
  language: Language;

  @Column()
  languageId: number;

  @Column()
  word: string;
}
