const StudentData = require("../models/StudentData");
const contract = require("../config/blockchain");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

exports.getPending = async (req, res) => {
  const data = await StudentData.find({ status: "pending" });
  res.json(data);
};

exports.approveData = async (req, res) => {
  try {
    const record = await StudentData.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record Not Found" });

    // Upload file to Pinata IPFS
    const data = new FormData();
    data.append("file", fs.createReadStream(record.filePath));

    const pinataRes = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        headers: {
          ...data.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET
        }
      }
    );

    const ipfsHash = pinataRes.data.IpfsHash;

    // Store hash on blockchain
    await contract.storeStudentRecord(record.studentId, ipfsHash);

    record.status = "approved";
    record.ipfsHash = ipfsHash;
    await record.save();

    res.json({ message: "Approved & Stored on Blockchain" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
