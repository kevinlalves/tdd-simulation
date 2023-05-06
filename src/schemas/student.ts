import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string(),
});
