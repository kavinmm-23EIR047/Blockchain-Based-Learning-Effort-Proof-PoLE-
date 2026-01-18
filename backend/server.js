import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.listen(process.env.PORT, ()=> 
 console.log("Backend running on "+process.env.PORT));
