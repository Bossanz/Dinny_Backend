import { Request, Response } from "express";
import { pool } from "../config/db";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [customerRows] = await pool.query('SELECT COUNT(*) AS total FROM BP_customer');
    const [restaurantRows] = await pool.query('SELECT COUNT(*) AS total FROM BP_restaurant');
    const [riderRows] = await pool.query('SELECT COUNT(*) AS total FROM BP_rider');

    const customers = (customerRows as any)[0].total;
    const restaurants = (restaurantRows as any)[0].total;
    const riders = (riderRows as any)[0].total;

    res.json({ customers, restaurants, riders });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
