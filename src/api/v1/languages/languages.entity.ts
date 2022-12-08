import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('language')
@Unique(['code'])
export class Language extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: - create migration "CREATE INDEX "LOWERCASE_TITLE" ON "language" (lower("title"))"
  @Column()
  title: string;

  @Column()
  code: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
