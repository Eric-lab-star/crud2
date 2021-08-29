import express from "express";

const videoRouter = express.Router();
const watch = (req, res) => res.send("watch");
videoRouter.get("/watch", watch);

export default videoRouter;
