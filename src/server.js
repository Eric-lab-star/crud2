import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middleware";
import apiRouter from "./routers/apiRouter";
import flash from "express-flash";
const server = express();

server.set("views", process.cwd() + "/src/views");
server.set("view engine", "pug");
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.use(express.json());
server.use(morgan("dev"));

server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

server.use(flash());
server.use(localsMiddleware);
server.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");

  next();
});

server.use("/node_modules", express.static("node_modules"));
server.use("/assets", express.static("assets"));
server.use("/uploads", express.static("uploads"));
server.use("/", globalRouter);
server.use("/users", userRouter);
server.use("/videos", videoRouter);
server.use("/api", apiRouter);

export default server;
