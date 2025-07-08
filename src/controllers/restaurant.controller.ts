import { Request, Response } from "express";
import { pool } from "../config/db";

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      "SELECT res_id, res_name, res_email, res_phone FROM BP_restaurant"
    );
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleBanRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  const restaurantId = req.params.id;

  try {
    const [rows]: any = await pool.query(
      "SELECT res_active_status FROM BP_restaurant WHERE res_id = ?",
      [restaurantId]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    const currentStatus = rows[0].res_active_status;
    const newStatus = currentStatus === 1 ? 0 : 1;

    await pool.query(
      "UPDATE BP_restaurant SET res_active_status = ? WHERE res_id = ?",
      [newStatus, restaurantId]
    );

    res.json({
      message: `Restaurant status updated to ${
        newStatus === 0 ? "banned" : "active"
      }`,
      newStatus,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
