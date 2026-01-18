import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check localStorage or default to true (dark mode)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark mode
  });

  // Save to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}