import express from "express";
import {
  GetAllContacts,
  UpdateContacts,
  AddNewBanquetHall,
  GetAllBanquetHalls,
  GetAllCatering,
  AddCatering,
  UpdateCatering,
  DeleteCatering,
  GetAllBookings,
  UpsertBookingByAdmin,
} from "../controllers/adminController.js";
import { isAdmin, Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.get("/contacts", Protect, isAdmin, GetAllContacts);
router.put("/contacts/:Qid", Protect, isAdmin, UpdateContacts);

router.post(
  "/AddBanquetHall",
  Protect,
  isAdmin,
  upload.array("pictures", 5),
  AddNewBanquetHall
);

router.get("/banquetHalls", Protect, isAdmin, GetAllBanquetHalls);

// Admin: fetch all bookings
router.get("/bookings", Protect, isAdmin, GetAllBookings);

// Catering management
router.get("/catering", Protect, isAdmin, GetAllCatering);
router.post("/catering", Protect, isAdmin, upload.array("photos", 5), AddCatering);
router.put("/catering/:id", Protect, isAdmin, upload.array("photos", 5), UpdateCatering);
router.delete("/catering/:id", Protect, isAdmin, DeleteCatering);

// Admin: create or update bookings
router.post("/bookings", Protect, isAdmin, UpsertBookingByAdmin);

export default router;
