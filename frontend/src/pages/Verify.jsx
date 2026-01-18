import { ethers } from "ethers";
import { getContract } from "../blockchain/config";
import QrScanner from "qr-scanner";

export default function Verify(){

 async function handleQRUpload(e){
   const file = e.target.files[0];
   if(!file) return;
   const result = await QrScanner.scanImage(file);
   document.getElementById("sid").value = result;
 }

 async function verify(){
  const studentId = document.getElementById("sid").value.trim();
  if(!studentId){
    alert("Enter Student ID or upload QR");
    return;
  }

  const studentHash = ethers.keccak256(
    ethers.toUtf8Bytes(studentId)
  );

  const contract = await getContract();
  const ids = await contract.getStudentAchievements(studentHash);

  if(ids.length === 0){
    alert("No Records Found");
    return;
  }

  let rows = "";

  for(let id of ids){
    const data = await contract.getAchievement(id);

    const ipfsURL = `https://gateway.pinata.cloud/ipfs/${data.ipfsCertHash}`;
    const kavaURL = `https://explorer.testnet.kava.io/address/${import.meta.env.VITE_CONTRACT_ADDRESS}`;

    rows += `
      <tr class="border-b border-gray-200">
        <td class="px-4 py-3 text-gray-900">${data.category}</td>
        <td class="px-4 py-3 font-semibold text-gray-900">${data.title}</td>
        <td class="px-4 py-3 text-gray-700">${data.description}</td>
        <td class="px-4 py-3 text-green-600 font-bold">${data.quizScore}</td>
        <td class="px-4 py-3">
          <a href="${ipfsURL}" target="_blank"
             class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded inline-block transition-colors">
             View File
          </a>
        </td>
        <td class="px-4 py-3">
          <a href="${kavaURL}" target="_blank"
             class="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded inline-block transition-colors">
             Kava Proof
          </a>
        </td>
      </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = rows;
 }

 return(
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">HR / Public Verification Portal</h2>
        <p className="text-gray-600">Verify student achievements on blockchain</p>
      </div>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Student ID
          </label>
          <input
            id="sid"
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter Student ID"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Or Upload QR Code
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleQRUpload}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 file:cursor-pointer cursor-pointer focus:outline-none focus:border-blue-600"
          />
        </div>

        <button
          onClick={verify}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-colors"
        >
          Verify on Blockchain
        </button>
      </div>

      {/* Result Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-gray-900 font-bold">Category</th>
                <th className="px-4 py-3 text-left text-gray-900 font-bold">Title</th>
                <th className="px-4 py-3 text-left text-gray-900 font-bold">Description</th>
                <th className="px-4 py-3 text-left text-gray-900 font-bold">Score</th>
                <th className="px-4 py-3 text-left text-gray-900 font-bold">IPFS File</th>
                <th className="px-4 py-3 text-left text-gray-900 font-bold">Blockchain Proof</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table>
        </div>

        {/* Empty State */}
        <div id="emptyState" className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-lg font-semibold text-gray-700">No verification results yet</p>
          <p className="text-sm mt-2">Enter a Student ID or upload a QR code to verify</p>
        </div>
      </div>

    </div>
  </div>
 );
}