import { Request, Response } from "express";
import { pool } from "../config/db";

export const getReports = async (req: Request, res: Response) => {
    try {
    const [rows] = await pool.query(
      "SELECT * FROM BP_report"
    );
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

}