import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  questionid: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
