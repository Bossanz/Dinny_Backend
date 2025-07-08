import { Request, Response } from "express";
import { pool } from "../config/db";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM BP_admin WHERE ad_email = ? AND ad_password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];

    const token = jwt.sign(
      {
        adminId: admin.ad_id,
        email: admin.ad_email,
        name: admin.ad_name || null,
      },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
