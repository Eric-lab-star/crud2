import express from "express";
import {
  user,
  startGithubLogin,
  finishGithubLogin,
  logout,
} from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.get("/github/startLogin", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);
userRouter.get("/:id([0-9a-f]{24})", user);
export default userRouter;
