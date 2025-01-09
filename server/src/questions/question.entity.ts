import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Answer } from '../answers/answer.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  questionid: string;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 200 })
  description: string;

  @Column({ length: 20, nullable: true })
  tag?: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
