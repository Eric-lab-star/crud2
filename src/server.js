import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 40000;
const handleListen = () => {
  console.log(`✅ Listening to http://localhost:${PORT} 🚀`);
};

const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();

const home = (req, res) => res.send("home");
globalRouter.get("/", home);

const userRouter = express.Router();

const edit = (req, res) => res.send("edit");
userRouter.get("/edit", edit);

const videoRouter = express.Router();

const watch = (req, res) => res.send("watch");
videoRouter.get("/watch", watch);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, handleListen);
