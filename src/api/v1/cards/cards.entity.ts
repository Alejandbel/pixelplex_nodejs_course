import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
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
  @JoinColumn({ name: 'userId' })
  user: User;

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

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
