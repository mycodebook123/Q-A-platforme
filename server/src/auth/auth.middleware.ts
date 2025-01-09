import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Authorization header missing or incorrect format');
      return res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Authentication invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
      console.log('Token:', token);  // Log the token being passed
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);  // Log the decoded token
      req.user = decoded;
      next();
    } catch (error) {
      console.log('Token Verification Error:', error);
      return res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Authentication invalid' });
    }
  }
}
