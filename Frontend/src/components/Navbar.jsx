import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_KEY = "http://127.0.0.1:8000/api/expenses/";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, loading, isAuthenticated } = useAuth();

  console.log("User", user?.username);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_KEY);
          console.log(response.data);
        } catch (error) {
          console.log("Error occured");
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    setIsOpen(false);
  };

  const profileOpen = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  return (
    <div className="flex px-4 sm:px-8 lg:px-16 justify-between w-full h-16 items-center bg-gradient-to-r from-slate-50/90 via-white/80 to-slate-50/90 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-200/50 font-medium">
      <h1 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
        Expense Tracker
      </h1>
      <div id="Login-drop-down" className="relative">
        <button
          onClick={profileOpen}
          className="p-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-out"
        >
          <CgProfile size={28} className="text-slate-700" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-44 sm:w-48 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl shadow-slate-300/30 flex flex-col overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {isAuthenticated ? (
              <>
                <button className="px-5 py-3 text-left text-sm font-medium text-slate-700 hover:bg-white/30 hover:text-slate-800 transition-all duration-150 backdrop-blur-sm">
                  {user?.username}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-3 text-left text-sm font-medium text-slate-700 hover:bg-white/30 hover:text-slate-800 transition-all duration-150 backdrop-blur-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="px-5 py-3 text-left text-sm font-medium text-slate-700 hover:bg-white/30 hover:text-slate-800 transition-all duration-150 backdrop-blur-sm">
                  No current User
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="px-5 py-3 text-left text-sm font-medium text-slate-700 hover:bg-white/30 hover:text-slate-800 transition-all duration-150 backdrop-blur-sm"
                >
                  Login
                </button>
              </>
            )}

            <button className="px-5 py-3 text-left text-sm font-medium text-slate-700 hover:bg-white/30 hover:text-slate-800 transition-all duration-150 backdrop-blur-sm">
              Documentation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;