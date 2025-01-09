import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { User } from '../users/user.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find({
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async getSingleQuestion(questionid: string): Promise<Question> {
    return this.questionRepository.findOne({
      where: { questionid },
      relations: ['user'],
    });
  }

  // In QuestionsService
async postQuestion(createQuestionDto: CreateQuestionDto, user: User): Promise<any> {
    const { title, description, tag } = createQuestionDto;
  
    const question = new Question();
    question.title = title;
    question.description = description;
    question.tag = tag;
    question.questionid = `${user.userid}-${Date.now()}`;
    question.user = user;
  
    try {
      const savedQuestion = await this.questionRepository.save(question);
      
      // Return a success message instead of the full question data
      return {
        message: 'Question posted successfully',
        questionId: savedQuestion.questionid,
        title: savedQuestion.title,
      };
    } catch (error) {
      console.error('Error saving question:', error);
      throw new Error('Error saving question');
    }
  }
}  