import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/usersRouter";
import videoRouter from "./routers/videosRouters";

const app = express();
const logger = morgan("dev");
const listen = () => {
  console.log("listening to server http://localhost:4000");
};

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(4000, listen);
