import StudentData from "../models/StudentData.js";

export const generateStudentCode = async () => {
  const count = await StudentData.countDocuments();
  const next = count + 1;
  return "STU" + String(next).padStart(3, "0");
};
