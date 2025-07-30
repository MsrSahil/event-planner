import express from "express";
import { GetAllContacts } from "../controllers/adminController.js";
import { isAdmin, Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/contacts", Protect, isAdmin, GetAllContacts);

export default router;