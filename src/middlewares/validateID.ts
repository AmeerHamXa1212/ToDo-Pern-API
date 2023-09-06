// middleware/checkValidId.ts

import { Request, Response, NextFunction } from "express";
import pool from "../models/db"; // Import your database connection pool here

const checkValidId = (
  paramName: string,
  primaryKeyField: string,
  tableName: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params[paramName]);
    if (isNaN(id)) {
      return res.status(400).json(`Bad Request: Invalid ${paramName}`);
    }

    try {
      // Use your database connection pool to query for existence if needed
      // Example: Check if the ID exists in the specified table
      const query = `SELECT 1 FROM ${tableName} WHERE ${primaryKeyField} = $1`; // Modify this query accordingly
      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json(`${paramName} not found`);
      }

      // Attach the parsed ID to the request object for later use
      (req as any).parsedId = id;
      next();
    } catch (error) {
      console.error(`Database error: ${error}`);
      return res.status(500).json("Internal Server Error");
    }
  };
};

export default checkValidId;
