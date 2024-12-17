import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Template } from '../template/template.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  username: string;

  @Column({ default: 18 })
  age: number;

  @Column({ default: 0 })
  lastTemplateId: number;

  @OneToMany(() => Template, (template) => template.user, { cascade: true })
  templates: Template[];
}
