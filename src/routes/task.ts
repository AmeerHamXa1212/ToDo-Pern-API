import * as taskcontroller from "../controllers/task";
import { Router } from "express";
const TaskRouter = Router();

TaskRouter.get("/todos", taskcontroller.GetAllTask);
TaskRouter.post("/newtodo", taskcontroller.CreateNewTask);
TaskRouter.delete("/todos/:id", taskcontroller.DeleteTask);
TaskRouter.get("/todos/:id", taskcontroller.GetTaskByID);
TaskRouter.patch("/todos/:id", taskcontroller.UpdateTaskByID);
TaskRouter.get("/usertodos/:uid", taskcontroller.GetTaskForUser);

export default TaskRouter;
