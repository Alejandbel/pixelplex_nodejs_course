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

import { Card } from '@cards';
import { User } from '@users';

import { TARGET_CONSTANTS } from './tasks.constants';

@Entity('task')
export class Task extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Index()
  @Column()
  userId: number;

  @ManyToOne(() => Card, {
    onDelete: 'CASCADE',
  })
  card: Card;

  @Column({
    type: 'enum',
    enum: TARGET_CONSTANTS,
  })
  target: TARGET_CONSTANTS;

  @Column()
  isCompleted: boolean;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
