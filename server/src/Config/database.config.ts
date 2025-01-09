import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {User} from "../users/user.entity"
import {Question} from "../questions/question.entity"
import {Answer} from "../answers/answer.entity"
export const databaseConfig: TypeOrmModuleOptions = {

  type: 'mysql',
  host: 'localhost', 
  port: 3306, 
  username: 'admin', 
  password: '123456', 
  database: 'q&a', 
  entities: [User, Question, Answer],
  synchronize: false, 
};


