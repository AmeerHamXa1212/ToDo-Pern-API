import * as usercontroller from "../controllers/user";
import asyncHandler from "express-async-handler";
import { Router } from "express";
import { ping, GetAllUser, CreateUser } from "../controllers/user";

const UserRouter = Router();

UserRouter.get("/ping", asyncHandler(ping));
UserRouter.get("/users", asyncHandler(GetAllUser));
UserRouter.post("/newusers", asyncHandler(CreateUser));

export default UserRouter;
