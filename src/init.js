import "./db";
import "./models/Video";
import app from "./server";
const handleListen = () => {
  console.log("✅ sever listening to http://localhost:4000");
};
app.listen(4000, handleListen);
