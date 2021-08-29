import express from "express";

const userRouter = express.Router();

const edit = (req, res) => res.send("edit");
userRouter.get("/edit", edit);
export default userRouter;
