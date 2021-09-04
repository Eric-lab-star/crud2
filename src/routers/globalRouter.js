import express from "express";
import { home, searchVideos } from "../controllers/videoControllers";
const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/search", searchVideos);
export default globalRouter;
