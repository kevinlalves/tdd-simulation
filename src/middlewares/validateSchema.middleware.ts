import { NextFunction, Response } from "express";
import { Schema } from "zod";
import sanitizeObject from "../utils/functions/sanitizeObject";
import formatErrorMessages from "../utils/functions/formatErrorMessages";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import errors from "../errors";

const validateSchemaMiddleware = (schema: Schema) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    res.locals = sanitizeObject({ ...req.params, ...req.body, ...req.query });
    const result = schema.safeParse(res.locals);

    if (result.success === false) {
      next(errors.unprocessableEntityError(formatErrorMessages(result.error.issues)));
    }

    next();
  };
};

export default validateSchemaMiddleware;
