import express from "express";
import { home, searchVideos } from "../controllers/videoControllers";
import { getJoin, postJoin } from "../controllers/userControllers";
const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/search", searchVideos);
export default globalRouter;
