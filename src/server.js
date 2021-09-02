import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const server = express();
const logger = morgan("dev");

server.set("view engine", "pug");
server.set("views", process.cwd() + "/src/views");
server.use(logger);

server.use(express.urlencoded({ extended: true }));
server.use("/", globalRouter);
server.use("/users", userRouter);
server.use("/videos", videoRouter);

export default server;
