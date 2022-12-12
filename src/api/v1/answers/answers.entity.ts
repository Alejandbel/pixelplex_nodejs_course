import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from '@entities';
import { Task } from '@tasks';
import { User } from '@users';

@Entity('answer')
export class Answer extends CommonEntity {
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Task, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column()
  taskId: number;

  @Column()
  answerWord: string;

  @Column()
  isSuccess: boolean;
}
