import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");
const listen = () => {
  console.log("server is listening to http://localhost:4000");
};

const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();

const home = (req, res) => res.send("home");
const edit = (req, res) => res.send("edit");
const watch = (req, res) => res.send("watch");

videoRouter.get("/watch", watch);
userRouter.get("/edit", edit);
globalRouter.get("/", home);

app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.listen(4000, listen);
