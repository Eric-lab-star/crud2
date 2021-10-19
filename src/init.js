import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
const PORT = process.env.PORT || 4000;
import server from "./server";
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
