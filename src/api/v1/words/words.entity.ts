import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { CommonEntity } from '@entities';
import { Language } from '@languages';
import { User } from '@users';

@Entity('word')
@Unique(['languageId', 'word', 'userId'])
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

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
