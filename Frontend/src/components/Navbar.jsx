import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ToggleMenu from "./ToggleDark";
import { Link } from "react-router-dom";
const API_KEY = "http://127.0.0.1:8000/api/expenses/";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, loading, isAuthenticated } = useAuth();

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_KEY);
        } catch (error) {
          console.log("Error occurred");
        }
      };
      fetchData();
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAuthenticated, isOpen]);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    setIsOpen(false);
  };

  const profileOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const toLoginPage = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const navigateToAddExpense = () => {
    setIsOpen(false);
    navigate("/addexpenses");
  };

  const reloadPage = () => {

  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 h-16 sm:h-18 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm dark:shadow-gray-900/20">
        <div className="flex items-center">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent tracking-tight">
            <Link to="/"> Expense Tracker </Link>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="hidden sm:flex">
            <ToggleMenu />
          </div>

          {isAuthenticated && (
            <button
              onClick={navigateToAddExpense}
              className="hidden hover:cursor-pointer sm:inline-flex items-center px-3 py-2 lg:px-4 lg:py-2.5 text-sm  sm:text-sm font-serif text-white bg-blue-600 dark:bg-black hover:bg-blue-700 dark:hover:bg-blue-600 lg:rounded-sm transition-all duration-200 shadow-sm hover:shadow-lg "
            >
              Add Expense
            </button>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={profileOpen}
              className="flex items-center p-2 sm:p-2.5 lg:p-3 rounded-full bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              aria-label="User menu"
            >
              <CgProfile
                size={20}
                className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 sm:w-72 lg:w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl lg:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl dark:shadow-gray-900/50 overflow-hidden z-[9999] animate-in slide-in-from-top-2 duration-200">
                <div className="sm:hidden px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Dark Mode
                    </span>
                    <ToggleMenu />
                  </div>
                </div>

                {isAuthenticated ? (
                  <>
                    <div className="px-4 lg:px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-gray-50/50 dark:from-blue-900/20 dark:to-gray-800/20">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Signed in as
                      </p>
                      <p className="text-sm lg:text-base text-blue-600 dark:text-blue-400 font-semibold truncate">
                        {user?.username}
                      </p>
                    </div>

                    <button
                      onClick={navigateToAddExpense}
                      className="sm:hidden w-full px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
                    >
                      Add Expense
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50/80 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 lg:px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-700/50">
                      <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400">
                        Not signed in
                      </p>
                    </div>

                    <button
                      onClick={toLoginPage}
                      className="w-full px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
                    >
                      Sign in
                    </button>
                  </>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 lg:px-6 py-3 lg:py-4 text-left text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                >
                  Documentation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
