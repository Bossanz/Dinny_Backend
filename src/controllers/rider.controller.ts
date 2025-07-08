import { Request, Response } from "express";
import { pool } from "../config/db";

export const getRiders = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      "SELECT rid_id, rid_name, rid_email, rid_phone, rid_active_status FROM BP_rider"
    );
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleBanRider = async (
  req: Request,
  res: Response
): Promise<void> => {
  const riderId = req.params.id;

  try {
    const [rows]: any = await pool.query(
      "SELECT rid_active_status FROM BP_rider WHERE rid_id = ?",
      [riderId]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: "Rider not found" });
      return;
    }

    const currentStatus = rows[0].rid_active_status;
    const newStatus = currentStatus === 1 ? 0 : 1;

    await pool.query(
      "UPDATE BP_rider SET rid_active_status = ? WHERE rid_id = ?",
      [newStatus, riderId]
    );

    res.json({
      message: `Rider status updated to ${
        newStatus === 0 ? "banned" : "active"
      }`,
      newStatus,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
