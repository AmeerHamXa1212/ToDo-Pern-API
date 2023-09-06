import * as usercontroller from "../controllers/user";
import { Router } from "express";
const UserRouter = Router();

UserRouter.get("/ping", usercontroller.ping);
UserRouter.get("/users", usercontroller.GetAllUser);
UserRouter.post("/newusers", usercontroller.CreateUser);

export default UserRouter;
