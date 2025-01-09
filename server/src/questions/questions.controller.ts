import { Controller, Get, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AuthGuard } from '../auth/auth.guard'; 
import { Request } from 'express';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @UseGuards(AuthGuard) // Protect route with auth guard
  async getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }

  @Get(':question_id')
  @UseGuards(AuthGuard) // Protect route with auth guard
  async getSingleQuestion(@Param('question_id') questionid: string) {
    return this.questionsService.getSingleQuestion(questionid);
  }

  @Post()
  @UseGuards(AuthGuard) // Protect route with auth guard
  async postQuestion(@Body() createQuestionDto: CreateQuestionDto, @Req() req: Request) {
    const user = req.user; // Get user from JWT
    return this.questionsService.postQuestion(createQuestionDto, user);
  }
}
