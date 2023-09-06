//import * as taskcontroller from "../controllers/task";
import {
  GetAllTask,
  CreateNewTask,
  DeleteTask,
  GetTaskByID,
  UpdateTaskByID,
  GetTaskForUser,
} from "../controllers/task";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import checkValidId from "../middlewares/validateID";

const TaskRouter = Router();

TaskRouter.get("/todos", asyncHandler(GetAllTask));
TaskRouter.post("/newtodo", asyncHandler(CreateNewTask));
TaskRouter.delete(
  "/todos/:id",
  checkValidId("id", "tid", "task"),
  asyncHandler(DeleteTask)
);
TaskRouter.get(
  "/todos/:id",
  checkValidId("id", "tid", "task"),
  asyncHandler(GetTaskByID)
);
TaskRouter.patch(
  "/todos/:id",
  checkValidId("id", "tid", "task"),
  asyncHandler(UpdateTaskByID)
);
TaskRouter.get(
  "/usertodos/:uid",
  checkValidId("uid", "id", "user"),
  asyncHandler(GetTaskForUser)
);

export default TaskRouter;
