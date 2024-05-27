import  express from "express";
import { getUsersForSideBar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router()
router.get("/", protectRoute, getUsersForSideBar)
export default router