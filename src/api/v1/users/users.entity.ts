import { Entity, Column, ManyToOne, Index, Unique, JoinColumn } from 'typeorm';

import { CommonEntity } from '@entities';
import { Language } from '@languages';

import { USER_ROLES } from './users.constants';

@Entity('user')
@Unique(['normalizedEmail'])
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Index()
  @Column()
  normalizedEmail: string;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.USER,
  })
  role: USER_ROLES;

  @ManyToOne(() => Language, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'languageId' })
  language: Language;

  @Column({
    nullable: true,
  })
  languageId: number;
}
