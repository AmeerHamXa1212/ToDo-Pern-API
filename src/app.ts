import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());

export default app;

app.use("/todo", routes);
app.use(bodyParser.json());
