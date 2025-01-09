import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { User } from '../users/user.entity'; // Assuming you have a User entity
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, User]), // Import necessary entities
    AuthModule,  // Import AuthModule to use AuthService and AuthGuard
  ],
  controllers: [QuestionsController],  // Declare the controller here
  providers: [QuestionsService],  // Provide the service here
})
export class QuestionsModule {}
