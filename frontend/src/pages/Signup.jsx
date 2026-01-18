import { ethers } from "ethers";

function generateStudentId(){
  return "STU" + Math.floor(100000 + Math.random()*900000);
}

export default function Signup(){

 async function signup(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const studentId = generateStudentId();
  const studentHash = ethers.keccak256(
    ethers.toUtf8Bytes(studentId)
  );

  // Using fetch instead of axios
  await fetch(
    import.meta.env.VITE_BACKEND_URL+"/api/auth/signup",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, studentId, studentHash })
    }
  );

  alert("Signup Successful!\nYour Student ID: "+studentId);
  window.location="/login";
 }

 return(
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div className="w-full max-w-md">
      
      {/* Logo/Brand Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg mb-4">
          <span className="text-4xl">🎓</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Student Portal
        </h1>
        <p className="text-gray-600 text-sm">
          Create your account to get started
        </p>
      </div>

      {/* Signup Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign Up
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input 
              id="email"
              type="email"
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input 
              id="password" 
              type="password"
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="Create a strong password"
            />
          </div>

          <button 
            onClick={signup}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-md transition-colors mt-6"
          >
            Create Account
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl">ℹ️</span>
            <div>
              <p className="text-gray-900 text-sm font-semibold mb-1">
                Your Student ID
              </p>
              <p className="text-gray-600 text-xs">
                A unique Student ID will be automatically generated for you upon successful registration. Please save it for future access.
              </p>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Login here
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        <p>Secured by blockchain technology</p>
      </div>

    </div>
  </div>
 );
}