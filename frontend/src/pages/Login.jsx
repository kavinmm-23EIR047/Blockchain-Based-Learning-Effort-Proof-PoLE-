export default function Login(){

 async function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Using fetch instead of axios
  const res = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }
  );

  const data = await res.json();

  // Store both values correctly
  localStorage.setItem("studentId", data.studentId);
  localStorage.setItem("studentHash", data.studentHash);

  window.location = "/dashboard";
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
          Welcome back! Please login to continue
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
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
              placeholder="Enter your password"
            />
          </div>

          <button 
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-md transition-colors mt-6"
          >
            Login to Dashboard
          </button>
        </div>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a 
              href="/signup" 
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Sign up here
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