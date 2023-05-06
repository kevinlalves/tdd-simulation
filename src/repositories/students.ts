import { z } from "zod";
import prisma from "../config/database";
import { createStudentSchema } from "schemas";

function findAll() {
  return prisma.student.findMany();
}

function findFirstOrThrow() {
  return prisma.student.findFirstOrThrow();
}

function findByName(name: string) {
  return prisma.student.findFirst({
    where: { name },
  });
}

function create({ name }: z.infer<typeof createStudentSchema>) {
  return prisma.student.create({
    data: { name },
  });
}

export default { findAll, findFirstOrThrow, findByName, create };
