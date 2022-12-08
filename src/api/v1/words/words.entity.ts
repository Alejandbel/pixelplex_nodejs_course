import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Language } from '@languages';

@Entity('word')
export class Word extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Language, {
    onDelete: 'CASCADE',
  })
  language: Language;

  @Column()
  word: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
