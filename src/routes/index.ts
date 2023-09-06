import { Router } from "express";
import UserRoutes from "./user";
import TaskRouter from "./task";

const router = Router();

router.use(UserRoutes, TaskRouter);
export default router;
