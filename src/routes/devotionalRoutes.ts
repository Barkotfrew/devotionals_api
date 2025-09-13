// src/routes/devotional.routes.ts
import { Router } from "express";
import {
  getAllDevotionals,
  getDevotionalsById,
  createDevotional,
  updateDevotional,
  deleteDevotional,
} from "../controllers/devotionalController.js";

const router = Router();

router.get("/", getAllDevotionals);
router.get("/:id", getDevotionalsById);
router.post("/", createDevotional);
router.patch("/:id", updateDevotional);
router.delete("/:id", deleteDevotional);

export default router;
