import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

import server from "./server";
server.listen("4000", () => console.log("http://localhost:4000"));
