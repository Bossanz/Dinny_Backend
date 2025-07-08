import { Router } from "express";
import { getCustomers, toggleBanCustomer } from "../controllers/customer.controller";
import { getRestaurants, toggleBanRestaurant } from "../controllers/restaurant.controller";
import { getRiders, toggleBanRider } from "../controllers/rider.controller";
import { verifyToken } from "../middleware/verifyToken";

export const userRouter = Router();

userRouter.get("/customers", verifyToken, getCustomers);
userRouter.put("/customers/:id/ban", verifyToken, toggleBanCustomer);

userRouter.get("/restaurants", verifyToken, getRestaurants);
userRouter.put("/restaurants/:id/ban", verifyToken, toggleBanRestaurant);

userRouter.get("/riders", verifyToken, getRiders);
userRouter.put("/riders/:id/ban", verifyToken, toggleBanRider);
