import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Card } from '@cards';
import { CommonEntity } from '@entities';
import { User } from '@users';

import { TARGET_CONSTANTS } from './tasks.constants';

@Entity('task')
export class Task extends CommonEntity {
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

  @Column({ default: false })
  isCompleted: boolean;
}
