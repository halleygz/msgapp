import express from "express";
import { getMessage, sendMessage } from "../controllers/sendmessage.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
