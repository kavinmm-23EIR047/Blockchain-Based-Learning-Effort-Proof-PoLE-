import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  category: String,         // "domain" or "extracurricular"
  question: String,
  options: [String],
  correctAnswer: String
});

export default mongoose.model("QuizQuestion", quizSchema);
