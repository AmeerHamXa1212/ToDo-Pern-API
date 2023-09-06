import express from "express";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const Port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(Port, () => console.info(`Server is running at Port ${Port}`));
