import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
// import { QuestionsController } from './questions/questions.controller';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service'; // Import the AuthService
import { AuthGuard } from './auth/auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot(databaseConfig),  // Configure database connection
    AnswersModule,
    QuestionsModule,
    UsersModule,
  
  ],
  controllers: [AppController],
  providers: [AppService,AuthService, AuthGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply AuthMiddleware only to routes that require authentication
    consumer.apply(AuthMiddleware).forRoutes('users/check-user'); // Only for `/check-user` route
  }
}
