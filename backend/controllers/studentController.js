const StudentData = require("../models/StudentData");

exports.uploadData = async (req, res) => {
  try {
    const record = await StudentData.create({
      studentId: req.user.id,
      textData: req.body.textData,
      filePath: req.file.path
    });

    res.json({ message: "Data Stored in MongoDB", record });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
