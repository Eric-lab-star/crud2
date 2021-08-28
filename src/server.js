import express from "express";
const app = express();
const PORT = 4000;

const handleListen = () => console.log(`Listening to http://localhost:${PORT}`);
const handleHome = (req, res) => {
  return res.send("Home");
};

app.get("/", handleHome);

app.listen(PORT, handleListen);
