import { useEffect, useState } from "react";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const sid = localStorage.getItem("studentId");
    const shash = localStorage.getItem("studentHash");

    if (sid && shash) {
      setIsLoggedIn(true);
      setStudentId(sid);
    }
  }, []);

  function logout() {
    localStorage.clear();
    window.location = "/";
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-xl">⛓️</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              PoLE
            </span>
          </a>

          {/* Navigation */}
          <div className="flex items-center gap-3">

            {/* Home always visible */}
            <a
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-all"
            >
              Home
            </a>

            {/* Verify visible ONLY when not logged in (HR/Public) */}
            {!isLoggedIn && (
              <a
                href="/verify"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-all"
              >
                Verify
              </a>
            )}

            {/* If NOT logged in */}
            {!isLoggedIn && (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-all"
                >
                  Login
                </a>

                <a
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition-colors"
                >
                  Signup
                </a>
              </>
            )}

            {/* If logged in (Student) */}
            {isLoggedIn && (
              <>
                <a
                  href="/dashboard"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-all"
                >
                  Dashboard
                </a>

                {/* Student ID Badge */}
                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                  {studentId}
                </span>

                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-sm transition-colors"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}
