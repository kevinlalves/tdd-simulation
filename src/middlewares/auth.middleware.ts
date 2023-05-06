import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import errors from '@/errors';
import { jwtSecret } from '@/utils/constants/jwt';

function authMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const tweeteroSessionCookie = req.cookies.tweetero_session;

  if (!tweeteroSessionCookie) next(errors.unauthorizedError());

  try {
    const { userId } = jwt.verify(tweeteroSessionCookie, jwtSecret) as JwtPayload;
    req.userId = userId;
  } catch {
    next(errors.unauthorizedError());
  }

  next();
}

export default authMiddleware;

export type AuthenticatedRequest = Request & JwtPayload;

export type JwtPayload = { userId: string };
