import { Request, Response } from "express";
import { pool } from "../config/db";

export const getCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await pool.query(
      "SELECT cus_id, cus_name, cus_email, cus_phone FROM BP_customer"
    );
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleBanCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const customerId = req.params.id;

  try {
    const [rows]: any = await pool.query(
      "SELECT cus_active_status FROM BP_customer WHERE cus_id = ?",
      [customerId]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    const currentStatus = rows[0].cus_active_status;
    const newStatus = currentStatus === 1 ? 0 : 1;

    await pool.query(
      "UPDATE BP_customer SET cus_active_status = ? WHERE cus_id = ?",
      [newStatus, customerId]
    );

    res.json({
      message: `Customer status updated to ${
        newStatus === 0 ? "banned" : "active"
      }`,
      newStatus,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
