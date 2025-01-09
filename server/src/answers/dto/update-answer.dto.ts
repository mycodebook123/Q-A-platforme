// src/answers/dto/update-answer.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateAnswerDto {
  @IsString()
  @IsOptional()
  answer?: string;
}
