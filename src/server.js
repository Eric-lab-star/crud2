import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 40000;
const handleListen = () =>
  console.log(`✅ Listening to http://localhost:${PORT} 🚀`);
const home = (req, res) => res.send("Home");
const logger = morgan("dev");
app.use(logger);
app.get("/", home);
app.listen(PORT, handleListen);
