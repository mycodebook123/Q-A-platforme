import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from '../questions/question.entity'; // Adjust path accordingly
import { User } from '../users/user.entity'; // Assuming you also have a User relationship

@Entity('answers') // Table name
export class Answer {
  @PrimaryGeneratedColumn()
  answerid: number;

  @Column({ length: 200 })
  answer: string;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionid' }) // Explicitly define the foreign key column
  question: Question; // This establishes the relationship

  @ManyToOne(() => User, (user) => user.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid' }) // Foreign key for the user
  user: User;
}
