import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  studentId: String,
  studentHash: String
});

export default mongoose.model("User", userSchema);
