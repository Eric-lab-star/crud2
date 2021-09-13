import express from "express";
import { user } from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.get("/:id", user);

export default userRouter;
