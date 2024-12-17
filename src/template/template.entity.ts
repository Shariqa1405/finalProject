import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.templates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text' })
  templateText: string;

  @Column({ type: 'text' })
  originalText: string;

  @Column('json')
  preview: Record<string, any>;
}
