import User from "../models/User.js";

export const signup = async (req, res) => {
  const { email, password, studentId, studentHash } = req.body;

  const exist = await User.findOne({ email });
  if (exist) 
    return res.status(400).json({ message: "User exists" });

  await User.create({ email, password, studentId, studentHash });

  res.json({ message: "Signup success" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid login" });
  }

  // 반드시 studentId 반환
  res.json({
    message: "Login success",
    studentId: user.studentId,
    studentHash: user.studentHash
  });
};

