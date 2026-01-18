// import express from "express";
// import multer from "multer";
// import StudentData from "../models/StudentData.js";
// import { uploadToPinata } from "../config/pinata.js";
// import { requireLogin } from "../middleware/sessionAuth.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post(
//   "/upload",
//   requireLogin("student"),
//   upload.single("file"),
//   async (req, res) => {
//     const ipfsHash = await uploadToPinata(req.file.path);

//     const data = new StudentData({
//       studentId: req.session.user.id,
//       name: req.body.name,
//       description: req.body.description,
//       fileIPFS: ipfsHash
//     });

//     await data.save();
//     res.json({ msg: "Data stored in MongoDB & IPFS, waiting for mentor approval" });
//   }
// );

// export default router;


// import express from "express";
// import multer from "multer";
// import StudentData from "../models/StudentData.js";
// import { uploadToPinata } from "../config/pinata.js";
// import { requireLogin } from "../middleware/sessionAuth.js";
// import { generateStudentCode } from "../config/StudentCode.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post(
//   "/upload",
//   requireLogin("student"),
//   upload.single("file"),
//   async (req, res) => {

//     const ipfsHash = await uploadToPinata(req.file.path);
//     const studentCode = await generateStudentCode();

//     const data = new StudentData({
//       studentId: req.session.user.id,
//       studentCode,
//       category: req.body.category,
//       title: req.body.title,
//       description: req.body.description,
//       fileIPFS: ipfsHash,
//       quizScore: Number(req.body.quizScore || 0)
//     });

//     await data.save();

//     res.json({
//       msg: "Uploaded successfully. Waiting for mentor verification.",
//       studentCode
//     });
//   }
// );

// export default router;


import express from "express";
import StudentData from "../models/StudentData.js";
import { requireLogin } from "../middleware/sessionAuth.js";

const router = express.Router();

/* Generate Student Code */
async function generateStudentCode() {
  const count = await StudentData.countDocuments();
  return "STU" + String(count + 1).padStart(3, "0");
}

/* Student Submit Route */
router.post("/submit", requireLogin("student"), async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      fileIPFS,
      quizScore
    } = req.body;

    if (!category || !title || !fileIPFS) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Apply category quiz rule
    let finalScore = 0;
    if (category === "domain" || category === "extracurricular") {
      finalScore = Number(quizScore || 0);
    }

    // Academic category → no quiz → score stays 0

    const studentCode = await generateStudentCode();

    const data = new StudentData({
      studentId: req.session.user.id,
      studentCode,
      category,
      title,
      description,
      fileIPFS,
      quizScore: finalScore
    });

    await data.save();

    res.json({
      msg: "Submission stored successfully",
      studentCode
    });

  } catch (err) {
    res.status(500).json({ msg: "Submission failed", error: err.message });
  }
});

/* Student: View own submissions */
router.get("/my-submissions", requireLogin("student"), async (req, res) => {
  const data = await StudentData.find({ studentId: req.session.user.id });
  res.json(data);
});

export default router;
