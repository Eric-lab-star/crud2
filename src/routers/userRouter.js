import express from "express";
import { editProfile } from "../controllers/userContorller";
const userRouter = express.Router();

userRouter.get("/editProfile", editProfile);

export default userRouter;
