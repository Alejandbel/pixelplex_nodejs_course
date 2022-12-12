import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from '@entities';
import { User } from '@users';
import { Word } from '@words';

@Entity('card')
export class Card extends CommonEntity {
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Index()
  @Column()
  userId: number;

  @ManyToOne(() => Word, {
    onDelete: 'CASCADE',
  })
  foreignWord: Word;

  @ManyToOne(() => Word, {
    onDelete: 'CASCADE',
  })
  nativeWord: Word;
}
