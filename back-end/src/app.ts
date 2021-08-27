import express from "express";
import router from "./routes";
import CheckAuth from "./middleware/auth-middleware";
import DisableCors from "./middleware/disable-cors-middleware";
import ErrorHandler from "./middleware/error-handler-middleware";

const app = express();

app.use(express.json());
app.use(CheckAuth);
app.use(DisableCors);
app.use("/", router);
app.use(ErrorHandler);

app.listen(3000, ()=>console.log("Listening on port 3000."));
