import { z } from "zod";
import errors from "../errors";
import studentsRepository from "../repositories/students";
import { createStudentSchema } from "schemas";

async function getAll() {
  const students = await studentsRepository.findAll();
  if (students.length === 0) throw errors.notFoundError("No students in the database");

  return students;
}

async function create({ name }: z.infer<typeof createStudentSchema>) {
  const student = await studentsRepository.findByName(name);
  if (student) throw errors.conflictError("A student with the same name already exists");

  await studentsRepository.create({ name });
}

export default { getAll, create };
