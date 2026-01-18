// import axios from "axios";
// import FormData from "form-data";
// import fs from "fs";

// export const uploadToPinata = async (filePath) => {
//   const data = new FormData();
//   data.append("file", fs.createReadStream(filePath));

//   const res = await axios.post(
//     "https://api.pinata.cloud/pinning/pinFileToIPFS",
//     data,
//     {
//       headers: {
//         pinata_api_key: process.env.PINATA_API_KEY,
//         pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
//         ...data.getHeaders()
//       }
//     }
//   );
//   return res.data.IpfsHash;
// };


import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const uploadToPinata = async (filePath) => {
  const data = new FormData();
  data.append("file", fs.createReadStream(filePath));

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data,
    {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
        ...data.getHeaders()
      }
    }
  );
  return res.data.IpfsHash;
};

