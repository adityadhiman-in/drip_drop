import express from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import { updateCoinsAfterGame } from "../controllers/gamesController.js";

const router = express.Router();

// Route for updating aquacoins based on game completion
router.post(
  "/complete-memory-match",
  ensureAuthenticated,
  updateCoinsAfterGame
);

export default router;
