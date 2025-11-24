"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

 useEffect(() => {
  // Always start in dark mode
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark";
  setDarkMode(true);
}, []);

  return (
  <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
      <h1 className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent"
style={{ backgroundImage: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)' }}>
  Both Sides
</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2.5 sm:p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
    </div>
  </header>
);
}
