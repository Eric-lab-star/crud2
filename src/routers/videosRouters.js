import express from "express";
import { getEdit, watch, postEdit } from "../controllers/videoControllers";
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;
