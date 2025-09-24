import React, { useState, useEffect } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function ToggleMenu() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("Theme-mode");

    if (isDark) {
      if (isDark === "true") {
        setToggle(true);
        document.documentElement.classList.add("dark");
      } else {
        setToggle(false);
        document.documentElement.classList.remove("dark");
      }
    } else {
      const defaultMachinePreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setToggle(defaultMachinePreference);

      if (defaultMachinePreference) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("Theme-mode", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("Theme-mode", "false");
      }
    }
  }, []);

  const toggleButton = () => {
    setToggle((prev) => {
      const newToggle = !prev;

      if (newToggle) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("Theme-mode", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("Theme-mode", "false");
      }

      return newToggle;
    });
  };

  return (
    <button
      onClick={toggleButton}
      className="relative group p-0.5 sm:p-3 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 focus:outline-none transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
      aria-label={toggle ? "Switch to light mode" : "Switch to dark mode"}
      title={toggle ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
        <IoSunnyOutline
          className={`absolute inset-0 w-full h-full text-amber-500 dark:text-amber-400 transition-all duration-500 ease-in-out transform ${
            toggle
              ? "opacity-100 rotate-0"
              : "opacity-0 rotate-90 "
          }`}
        />
        <IoMoonOutline
          className={`absolute inset-0 w-full h-full dark:text-slate-300 transition-all duration-500 ease-in-out transform ${
            !toggle
              ? "opacity-100 rotate-0"
              : "opacity-0 -rotate-90 "
          }`}
        />
      </div>
    </button>
  );
}
