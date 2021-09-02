import express from "express";
import { edit } from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.get("/editUser", edit);
export default userRouter;
