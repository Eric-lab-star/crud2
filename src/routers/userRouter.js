import express from "express";
import {
  user,
  startGithubLogin,
  finishGithubLogin,
  logout,
  getEdit,
  postEdit,
} from "../controllers/userControllers";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";
const userRouter = express.Router();

userRouter.get("/github/startLogin", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id([0-9a-f]{24})", user);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
export default userRouter;
