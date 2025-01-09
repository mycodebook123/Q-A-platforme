import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { User } from '../users/user.entity';
import { GetAnswerDto } from './dto/get_answers.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  // Get all answers for a specific question
  @UseGuards(AuthGuard)
  @Get(':question_id')
  async getAllAnswers(@Param('question_id') questionId: string): Promise<{ statusCode: number; data: GetAnswerDto[] }> {
    try {
      const results = await this.answersService.getAllAnswers(questionId);
      return {
        statusCode: HttpStatus.OK,
        data: results,
      };
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Post a new answer
  @UseGuards(AuthGuard)
  @Post('postAnswers')
  async postAnswer(@Body() createAnswerDto: CreateAnswerDto, @Req() req: any) {
    const user: User = req.user; // Assuming AuthGuard attaches a `user` object to the request

    if (!createAnswerDto.answer) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: 'Please provide an answer' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.answersService.postAnswer(createAnswerDto, user);
      return {
        statusCode: HttpStatus.CREATED,
        message: result.message,
        insertId: result.insertId,
      };
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update an existing answer
  @UseGuards(AuthGuard)
  @Patch(':answerid')
  async updateAnswer(
    @Param('answerid') answerid: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Req() req: any
  ) {
    const user: User = req.user; // Get user from request, added by the AuthGuard

    try {
      const result = await this.answersService.updateAnswer(answerid, updateAnswerDto, user);
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
        updatedAnswer: result.updatedAnswer,
      };
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete an answer
  @UseGuards(AuthGuard)
  @Delete(':answerid')
  async deleteAnswer(@Param('answerid') answerid: number, @Req() req: any) {
    const user: User = req.user; // Get user from request, added by the AuthGuard

    try {
      const result = await this.answersService.deleteAnswer(answerid, user);
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
