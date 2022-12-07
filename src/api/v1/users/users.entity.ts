import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  Index,
} from 'typeorm';

import { Language } from '@languages';

import { USER_ROLES } from './users.constants';

@Entity('user')
export class User extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Index()
  @Column({
    unique: true,
  })
  normalizedEmail: string;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
  })
  role: string;

  @ManyToOne(() => Language, {
    onDelete: 'SET NULL',
  })
  languages: Language[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
