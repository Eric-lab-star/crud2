import "./db";
import "./models/Video";
import server from "./server";
server.listen(4000, () => console.log("listening to http://localhost:4000"));
