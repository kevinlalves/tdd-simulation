import { NextFunction, Request, Response } from "express";
import studentServices from "../services/student";
import studentsRepository from "../repositories/students";
import { createStudentSchema } from "schemas";
import { z } from "zod";

export async function indexStudentsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const students = await studentServices.getAll();

    res.send(students);
  } catch (err) {
    next(err);
  }
}

export async function showStudentHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const student = await studentsRepository.findFirstOrThrow();

    res.send(student);
  } catch (err) {
    next(err);
  }
}

export async function createStudentHandler(req: Request, res: Response, next: NextFunction) {
  const { name }: z.infer<typeof createStudentSchema> = req.body;

  try {
    await studentServices.create({ name });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}
