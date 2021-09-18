import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./localsMiddleware";
const server = express();

server.set("views", process.cwd() + "/src/views");
server.set("view engine", "pug");
server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(morgan("dev"));

server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "hello",
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/recap4" }),
  })
);

server.use(localsMiddleware);

server.use("/", globalRouter);
server.use("/users", userRouter);
server.use("/videos", videoRouter);

export default server;
