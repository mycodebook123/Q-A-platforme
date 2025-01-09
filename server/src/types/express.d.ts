import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Or define a specific type for the user
  }
}
