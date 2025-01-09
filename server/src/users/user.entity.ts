import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 20 })
  firstname: string;

  @Column({ length: 20 })
  lastname: string;

  @Column({ length: 40 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @OneToMany(() => Question, (question) => question.user, { cascade: true })
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.user, { cascade: true })
  answers: Answer[];
}
