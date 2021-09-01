import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
const app = express();
const logger = morgan("dev");
const listen = () => {
  console.log("Listening to http://localhost:4000");
};
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: "true" }));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.listen(4000, listen);
