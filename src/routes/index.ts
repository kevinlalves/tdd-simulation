import { Router } from "express";
import studentRoutes from "./student";

const routes = Router();

routes.use("/students", studentRoutes);

export default routes;
