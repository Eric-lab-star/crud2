import express from "express";

const app = express();

const PORT = 4000;
const handleListen = () =>
  console.log(`✅ Server listening to http://localhost:${PORT} 🚀 `);
const handleHome = (req, res) => {
  res.send("this is home");
};
app.get("/", handleHome);
app.listen(PORT, handleListen);
