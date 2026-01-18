import axios from "axios";

export async function uploadToIPFS(file){
  const data = new FormData();
  data.append("file", file);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data,
    {
      headers:{
        pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
        pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET
      }
    }
  );
  return res.data.IpfsHash;
}
