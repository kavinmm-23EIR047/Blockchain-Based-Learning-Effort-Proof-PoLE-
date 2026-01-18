const StudentData = require("../models/StudentData");

exports.getVerifiedStudents = async (req, res) => {
  const data = await StudentData.find(
    { status: "approved" },
    { studentId: 1, ipfsHash: 1 }
  );
  res.json(data);
};
