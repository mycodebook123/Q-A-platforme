import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { GetAnswerDto } from './dto/get_answers.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}

  // Get all answers for a specific question
  async getAllAnswers(question_id: string): Promise<GetAnswerDto[]> {
    const answers = await this.answerRepository.find({
      where: { question: { questionid: question_id } },
      relations: ['question', 'user'],
      order: { answerid: 'DESC' },
    });

    return answers.map(answer => {
      const dto = new GetAnswerDto();
      dto.questionid = answer.question.questionid;
      dto.username = answer.user.username;
      dto.answer = answer.answer;
      return dto;
    });
  }

  // Post a new answer
  async postAnswer(createAnswerDto: CreateAnswerDto, user: User): Promise<any> {
    const { questionid, answer } = createAnswerDto;

    const answerEntity = new Answer();
    answerEntity.answer = answer;

    const question = await this.questionRepository.findOne({ where: { questionid } });
    if (!question) {
      throw new Error('Question not found');
    }

    answerEntity.question = question;
    answerEntity.user = user;

    try {
      const result = await this.answerRepository.save(answerEntity);
      return {
        message: 'Answer posted successfully',
        insertId: result.answerid,
      };
    } catch (error) {
      throw new Error(`Error posting answer: ${error.message}`);
    }
  }

  // Update an existing answer
  async updateAnswer(
    answerid: number,
    updateAnswerDto: UpdateAnswerDto,
    user: User
  ): Promise<any> {
    const { answer } = updateAnswerDto;

    const existingAnswer = await this.answerRepository.findOne({
      where: { answerid },
      relations: ['user'],
    });

    if (!existingAnswer) {
      throw new Error('Answer not found');
    }

    // Check if the user is the one who posted the answer
    if (existingAnswer.user.userid !== user.userid) {
      throw new Error('You are not authorized to update this answer');
    }

    existingAnswer.answer = answer;

    try {
      const updatedAnswer = await this.answerRepository.save(existingAnswer);
      return {
        message: 'Answer updated successfully',
        updatedAnswer,
      };
    } catch (error) {
      throw new Error(`Error updating answer: ${error.message}`);
    }
  }

  // Delete an answer
  async deleteAnswer(answerid: number, user: User): Promise<any> {
    const answer = await this.answerRepository.findOne({
      where: { answerid },
      relations: ['user'],
    });

    if (!answer) {
      throw new Error('Answer not found');
    }

    // Check if the user is the one who posted the answer
    if (answer.user.userid !== user.userid) {
      throw new Error('You are not authorized to delete this answer');
    }

    try {
      await this.answerRepository.delete(answerid);
      return { message: 'Answer deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting answer: ${error.message}`);
    }
  }
}
