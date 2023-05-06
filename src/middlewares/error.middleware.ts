import { NextFunction, Request, Response } from 'express';

function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = errorStatusMap[err.name] || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  if (statusCode === 500) console.error(err);

  res.status(statusCode).send({ message });
}

export default errorMiddleware;

const errorStatusMap: Record<string, number> = {
  UnauthorizedError: 401,
  InvalidCredentialsError: 401,
  UnprocessableEntityError: 422,
  ConflictError: 409,
  NotFoundError: 404,
};
