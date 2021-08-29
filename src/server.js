import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const logger = morgan("dev");
const app = express();
const listen = () => {
  console.log("Listening to http://localhost:4000");
};

app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.listen(4000, listen);
