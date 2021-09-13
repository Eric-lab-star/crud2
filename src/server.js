import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const server = express();

server.set("views", process.cwd() + "/src/views");
server.set("view engine", "pug");
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use("/", globalRouter);
server.use("/users", userRouter);
server.use("/videos", videoRouter);

export default server;
