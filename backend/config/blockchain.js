// import { ethers } from "ethers";

// export const getContract = () => {
//   const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);

//   // Validate private key format before using
//   const pk = process.env.WALLET_PRIVATE_KEY;

//   if (!pk || !pk.startsWith("0x") || pk.length !== 66) {
//     throw new Error("Invalid or missing WALLET_PRIVATE_KEY in .env");
//   }

//   const wallet = new ethers.Wallet(pk, provider);

//   const abi = [
//     "function storeStudentData(string name,string ipfsHash) external"
//   ];

//   return new ethers.Contract(
//     process.env.SMART_CONTRACT_ADDRESS,
//     abi,
//     wallet
//   );
// };


// import { ethers } from "ethers";

// export const getContract = () => {
//   const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);

//   const pk = process.env.WALLET_PRIVATE_KEY;
//   if (!pk || !pk.startsWith("0x") || pk.length !== 66) {
//     throw new Error("Invalid WALLET_PRIVATE_KEY");
//   }

//   const wallet = new ethers.Wallet(pk, provider);

//   const abi = [
//     "function storeStudentData(string name,string ipfsHash) external"
//   ];

//   return new ethers.Contract(
//     process.env.SMART_CONTRACT_ADDRESS,
//     abi,
//     wallet
//   );
// };

import { ethers } from "ethers";

export const getContract = () => {
  const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);

  const pk = process.env.WALLET_PRIVATE_KEY;

  if (!pk || !pk.startsWith("0x") || pk.length !== 66) {
    throw new Error("Invalid WALLET_PRIVATE_KEY");
  }

  const wallet = new ethers.Wallet(pk, provider);

  // ABI for updated smart contract
  const abi = [
    "function storeStudentData(string studentCode,string category,string title,string description,string ipfsHash,uint256 quizScore) external",
    "function getAllRecords() view returns(tuple(string studentCode,string category,string title,string description,string ipfsHash,uint256 quizScore)[])"
  ];

  return new ethers.Contract(
    process.env.SMART_CONTRACT_ADDRESS,
    abi,
    wallet
  );
};
