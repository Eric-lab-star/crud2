import express from "express";

import morgan from "morgan";

const logger = morgan("dev");
const app = express();

const listen = () => {
  console.log("listening to http://localhost:4000");
};
const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();

const home = (req, res) => res.send("home");
const edit = (req, res) => res.send("edit");
const watch = (req, res) => res.send("watch");
globalRouter.get("/", home);
userRouter.get("/edit", edit);
videoRouter.get("/watch", watch);

app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.listen(4000, listen);
