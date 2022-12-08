import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@users';
import { Word } from '@words';

@Entity('card')
export class Card extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Word, {
    onDelete: 'CASCADE',
  })
  foreignWord: Word;

  @ManyToOne(() => Word, {
    onDelete: 'CASCADE',
  })
  nativeWord: Word;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
