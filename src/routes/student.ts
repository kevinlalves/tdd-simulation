import { createStudentHandler, indexStudentsHandler, showStudentHandler } from "../controllers";
import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { createStudentSchema } from "../schemas";

const studentRoutes = Router();

studentRoutes.get("/", indexStudentsHandler);
studentRoutes.get("/pick", showStudentHandler);
studentRoutes.post("/", validateSchemaMiddleware(createStudentSchema), createStudentHandler);

export default studentRoutes;
