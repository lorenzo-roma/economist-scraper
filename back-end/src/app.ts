import express from "express";
import router from "./routes";
import CheckAuth from "./middleware/auth-middleware";

const app = express();

app.use(express.json());
app.use(CheckAuth)
app.use("/", router);

app.listen(3000, ()=>console.log("Listening on port 3000."));
