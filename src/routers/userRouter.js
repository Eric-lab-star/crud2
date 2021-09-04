import express from "express";
import { getLogin, postLogin } from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.route("/login").get(getLogin).post(postLogin);

export default userRouter;
