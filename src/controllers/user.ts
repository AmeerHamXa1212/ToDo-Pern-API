import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import pool from "../models/db";

import { IUser } from "../constants/interfaces";

//JOI Validation Schema
const CreateUserSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

export const ping = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: `Server is up and running
Welcome to TODO application`,
  });
};
export const GetAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = `SELECT * FROM "user" Order by id ASC`;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      res.status(400).json("No User Found");
    } else {
      const users: IUser[] = result.rows; // Assign result.rows directly
      res.status(200).json(users);
    }
  } catch (error) {
    console.warn(`Error Occurred : ${error}`);
    res.status(500).json("Error Occurred");
  }
};

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = CreateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json(`Error : ${error}`);
    }
    const { id, name } = value;
    //storing the user
    const query = `INSERT INTO "user" (id, name) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(query, [id, name]);

    res.status(201).json(`New User Created `);
  } catch (error) {
    console.warn(`Error Ocurred : ${error}`);
  }
};
