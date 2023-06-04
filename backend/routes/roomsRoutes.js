import express from "express";
const router = express.Router();
import { getRooms } from "../controllers/roomController.js";

router.route("/").get(getRooms);
export default router;
