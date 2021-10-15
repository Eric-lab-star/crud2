import express from "express";
import {
  user,
  startGithubLogin,
  finishGithubLogin,
  logout,
  getEdit,
  postEdit,
  getChangePassword,
  see,
  postChangePassword,
} from "../controllers/userControllers";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middleware";
const userRouter = express.Router();

userRouter.get("/github/startLogin", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);

userRouter.get("/:id([0-9a-f]{24})", see);
export default userRouter;
