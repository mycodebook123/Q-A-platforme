import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answer } from './answer.entity';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, User, Question]), // Ensure these entities are included
    AuthModule, // Import AuthModule so AuthService is available
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}

