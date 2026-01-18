import { useState, useEffect } from "react";
import { uploadToIPFS } from "../ipfs/upload";
import { getContract } from "../blockchain/config";
import QRGenerator from "../components/QRGenerator";
import Quiz from "./Quiz";

export default function Dashboard(){

 const [step,setStep] = useState(1);
 const [title,setTitle] = useState("");
 const [description,setDescription] = useState("");
 const [category,setCategory] = useState("domain");
 const [file,setFile] = useState(null);
 const [score,setScore] = useState(null);
 const [txDone,setTxDone] = useState(false);
 const [studentId,setStudentId] = useState("");

 useEffect(()=>{
   const sid = localStorage.getItem("studentId");
   const shash = localStorage.getItem("studentHash");

   if(!sid || !shash){
     alert("Session expired. Please login again.");
     window.location="/login";
   } else {
     setStudentId(sid);
   }
 },[]);

 function startQuiz(){
   if(!title || !description || !file || !category){ 
     alert("Fill all fields"); 
     return;
   }
   setStep(2);
 }

 function finishQuiz(marks){
   setScore(marks);
   setStep(3);
 }

 async function storeBlockchain(){
   try{
     const studentHash = localStorage.getItem("studentHash");
     const ipfsHash = await uploadToIPFS(file);
     const contract = await getContract();

     const tx = await contract.storeAchievement(
       studentHash,
       category,
       title,
       description,
       ipfsHash,
       score
     );

     await tx.wait();
     setTxDone(true);
   }
   catch(err){
     console.error(err);
     alert("Blockchain storage failed.");
   }
 }

 return(
  <div className="min-h-screen bg-gray-50 p-8">
   <div className="max-w-2xl mx-auto">

   {/* STEP 1 */}
   {step===1 && (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Create Achievement
      </h2>
      
      <div className="space-y-5">

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Select Category
          </label>
          <select
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                       text-gray-900 bg-white
                       focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          >
            <option value="domain">Domain / Course</option>
            <option value="knowledge">Workshop / Hackathon / Event</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Achievement Title
          </label>
          <input
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                       text-gray-900 placeholder-gray-400 bg-white
                       focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Enter achievement title"
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                       text-gray-900 placeholder-gray-400 bg-white resize-none
                       focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Briefly describe your activity"
            rows="3"
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>

        {/* File */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Upload Certificate
          </label>
          <input 
            type="file" 
            onChange={(e)=>setFile(e.target.files[0])}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                       text-gray-900 bg-white
                       file:mr-4 file:py-2 file:px-4 file:border-0
                       file:bg-blue-600 file:text-white file:rounded-lg file:font-semibold
                       hover:file:bg-blue-700 file:cursor-pointer cursor-pointer
                       focus:outline-none focus:border-blue-600 transition-all"
          />
        </div>

        <button 
          onClick={startQuiz}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-sm transition-colors"
        >
          Start Quiz →
        </button>
      </div>
    </div>
   )}

   {/* STEP 2 */}
   {step===2 && (
     <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
       <Quiz category={category} onFinish={finishQuiz}/>
     </div>
   )}

   {/* STEP 3 */}
   {step===3 && (
     <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
       <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
         Confirm Details
       </h2>

       <div className="bg-gray-50 rounded-lg p-6 space-y-3 border border-gray-200 mb-6">
         <div className="flex justify-between items-center pb-3 border-b border-gray-200">
           <span className="text-gray-600 font-semibold">Category:</span>
           <span className="text-gray-900 font-bold">{category}</span>
         </div>
         <div className="flex justify-between items-center pb-3 border-b border-gray-200">
           <span className="text-gray-600 font-semibold">Title:</span>
           <span className="text-gray-900 font-bold">{title}</span>
         </div>
         <div className="flex justify-between items-center pb-3 border-b border-gray-200">
           <span className="text-gray-600 font-semibold">Description:</span>
           <span className="text-gray-900">{description}</span>
         </div>
         <div className="flex justify-between items-center pt-3">
           <span className="text-gray-600 font-semibold">Score:</span>
           <span className="text-blue-600 font-bold text-xl">{score}%</span>
         </div>
       </div>

       <button 
         onClick={storeBlockchain}
         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-sm transition-colors"
       >
         Store on Blockchain ⛓️
       </button>
     </div>
   )}

   {/* FINAL */}
   {txDone && (
     <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
       <div className="mb-6">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
           <span className="text-4xl">✓</span>
         </div>
         <h3 className="text-3xl font-bold text-green-600 mb-2">
           Stored Successfully!
         </h3>
       </div>

       <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
         <p className="text-gray-700 font-semibold mb-2">Your Student ID</p>
         <p className="text-gray-600 text-sm mb-3">(Share with HR)</p>
         <div className="bg-white px-4 py-3 rounded-lg border border-gray-300">
           <b className="text-blue-600 text-lg font-mono">{studentId}</b>
         </div>
       </div>

       <div className="flex justify-center mb-6">
         <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-300">
           <QRGenerator value={studentId}/>
         </div>
       </div>

       <button
         onClick={()=>{
           const canvas = document.querySelector("canvas");
           if(!canvas){
             alert("QR not generated yet");
             return;
           }
           const link = document.createElement("a");
           link.download = "StudentQR.png";
           link.href = canvas.toDataURL();
           link.click();
         }}
         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-sm transition-colors"
       >
         📥 Download QR Code
       </button>
     </div>
   )}

  </div>
  </div>
 );
}