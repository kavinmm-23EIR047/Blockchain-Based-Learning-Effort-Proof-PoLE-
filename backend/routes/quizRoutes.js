import express from "express";
import { getQuiz, submitQuiz, addQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:category", getQuiz);
router.post("/submit", submitQuiz);
router.post("/add", addQuiz);

export default router;
