
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // You may need to create this service if not already present

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtAuthService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false; // Authentication failed
    }

    const token = authHeader.split(' ')[1];
    try {
      const user = this.jwtAuthService.validateToken(token);
      request.user = user; // Attach user information to the request object
      return true; // Authentication successful
    } catch (error) {
      return false; // Authentication failed
    }
  }
}
