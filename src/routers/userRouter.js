import express from "express";
import { edit } from "../controllers/userControllers";
const userRouter = express.Router();
userRouter.get("/edit", edit);
export default userRouter;
