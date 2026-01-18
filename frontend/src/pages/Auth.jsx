import { useState } from "react";
import api from "../api";

export default function Auth({ setRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setUserRole] = useState("student");

  const handleSignup = async () => {
    await api.post("/auth/register", {
      name,
      email,
      password,
      role
    });
    alert("Signup successful. Now login.");
    setIsLogin(true);
  };

  const handleLogin = async () => {
    const res = await api.post("/auth/login", { email, password });
    setRole(res.data.role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isLogin 
                ? "Sign in to continue to your account" 
                : "Sign up to get started"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 hover:text-purple-700 font-semibold ml-2 cursor-pointer transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}