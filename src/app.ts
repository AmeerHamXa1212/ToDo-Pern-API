import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(errorHandler);
export default app;

app.use("/todo", routes);
app.use(bodyParser.json());
