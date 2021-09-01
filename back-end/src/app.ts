import express from "express";
import router from "./routes";
import AppendUser from "./middleware/auth-middleware";
import DisableCors from "./middleware/disable-cors-middleware";
import ErrorHandler from "./middleware/error-handler-middleware";

const app = express();

app.use(express.json());
app.use(DisableCors);
app.use(AppendUser);
app.use("/", router);
app.use(ErrorHandler);

const port = (process.env.PORT|| 5000);
app.listen(port, ()=>console.log(`Listening on port ${port}.`));
