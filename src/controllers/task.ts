import express, { Request, Response, NextFunction } from "express";
import Joi, { CustomHelpers } from "joi";
import pool from "../models/db";
import { ETaskPriority, ETaskStatus } from "../constants/enums";
import { ITask } from "../constants/interfaces";

const validateStatus = (value: ETaskStatus, helpers: CustomHelpers) => {
  if (Object.values(ETaskStatus).includes(value)) {
    return value; // Value is valid
  } else {
    return helpers.error("any.invalid");
  }
};

const validatePriority = (value: ETaskPriority, helpers: CustomHelpers) => {
  if (Object.values(ETaskPriority).includes(value)) {
    return value; // Value is valid
  } else {
    return helpers.error("any.invalid");
  }
};

const CreateTaskSchema = Joi.object({
  tid: Joi.number().required(),
  user_id: Joi.number().required(),
  title: Joi.string().max(25).required(),
  task_description: Joi.string().max(500).required(),
  status: Joi.string().required().custom(validateStatus),
  priority: Joi.number().required().custom(validatePriority),
});

const UpdateTaskSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string().required(),
  task_description: Joi.string().required(),
  status: Joi.string().valid("PENDING", "INPROGRESS", "COMPLETED").required(),
  priority: Joi.number().valid(0, 1, 2).required(),
});

export const GetAllTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const query = `SELECT * FROM task Order by tid ASC`;
  const result = await pool.query(query);

  if (result.rows.length === 0) {
    res.status(400).json("No Task Found");
  } else {
    const tasks: ITask[] = result.rows; // Assign result.rows directly
    res.status(200).json(tasks);
    //console.log(tasks);
  }
};
export const CreateNewTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error, value } = CreateTaskSchema.validate(req.body);
  if (error) {
    res.status(400).json(`Error : ${error}`);
  }
  //console.log(value);
  const { tid, user_id, title, task_description, status, priority } = value;
  //const status = value.status;
  //const priority = value.priority;
  //console.log(`Status : ${status} , Priority : ${priority}`);
  //storing the user
  const query = `INSERT INTO task (tid, user_id, title, task_description, status, priority) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *`;
  const result = await pool.query(query, [
    tid,
    user_id,
    title,
    task_description,
    status,
    priority,
  ]);

  res.status(201).json(`New Task Created `);
};
export const DeleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const deleteId = parseInt(req.params.id);
  const query = "Delete from task where tid = $1";
  const result = await pool.query(query, [deleteId]);

  if (result.rowCount === 0) {
    res.status(404).json(`Task with ID ${deleteId} not found`);
  }
  res.status(200).json(`Task with id: ${deleteId} deleted successfully`);
};

export const GetTaskByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const Id = parseInt(req.params.id);

  const query = "Select * from task where tid = $1";
  const result = await pool.query(query, [Id]);
  if (result.rowCount === 0) {
    res.status(404).json(`Task with ID ${Id} not found`);
  }
  res.status(200).json(`Task with id: ${Id} retrieved successfully`);
};
export const UpdateTaskByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const UpdateId = parseInt(req.params.id);
  const { error, value } = UpdateTaskSchema.validate(req.body);
  if (error) {
    res.status(400).json(`Error : ${error}`);
  }
  const { user_id, title, task_description, status, priority } = value;
  const query = `
      UPDATE task 
      SET user_id = $1 ,title = $2, task_description = $3, status = $4, priority = $5
      WHERE tid = $6
    `;
  const result = await pool.query(query, [
    user_id,
    title,
    task_description,
    status,
    priority,
    UpdateId,
  ]);
  if (result.rowCount === 0) {
    res.status(404).json(`Task with ID ${UpdateId} not found`);
  }
  res.status(200).json(`Task with id: ${UpdateId} updated successfully`);
};
export const GetTaskForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const UserId = parseInt(req.params.uid);
  const query = "Select * from task where user_id = $1";
  const result = await pool.query(query, [UserId]);
  if (result.rowCount === 0) {
    res.status(404).json(`Task with User ID ${UserId} not found`);
  }
  const tasks = result.rows;
  res.status(200).json(tasks);
};
