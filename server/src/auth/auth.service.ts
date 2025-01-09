import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', { expiresIn: '3d' });
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
