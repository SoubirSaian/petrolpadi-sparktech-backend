// src/app/interfaces/authRequest.ts
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    profileId: string;
    role: string;
    email: string;
  };
}
