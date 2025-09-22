import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../Services/axios";
import axios from "axios";
import { getCategories } from "../Services/categoryService";
import { getExpenses } from "../Services/expenseService";

const API_KEY = "http://127.0.0.1:8000/api/expenses/";

function Expenses() {
  const { user, isAuthenticated } = useAuth();
  const [category, setCategory] = useState([]);
  const [expense, setExpense] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log("username is ", user?.username);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const response = await getExpenses();
        setExpense(response);

        const total = response.reduce((sum, e) => sum + Number(e.amount), 0);
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthly = response
          .filter((e) => {
            const date = new Date(e.date);
            return (
              date.getMonth() === currentMonth &&
              date.getFullYear() === currentYear
            );
          })
          .reduce((sum, e) => sum + Number(e.amount), 0);

        setMonthlyTotal(monthly);
        setTotalAmount(total);

        console.log("Monthly total:", monthly);
        console.log("Total all time:", total);
      };

      fetchData();

      const fetchCategories = async () => {
        const response = await getCategories();
        setCategory(response);
        console.log("Categories:", response);
      };

      fetchCategories();
    }
  }, [isAuthenticated]);

  return (
    <div
      id="container"
      className="flex flex-col lg:flex-row gap-6 p-4 -z-20 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      <div id="left-content" className="w-full lg:w-1/4 xl:w-1/5">
        <div
          id="profile_details"
          className="mb-6 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:bg-white/70 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 p-0.5 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {" "}
                <img
                  className="w-12 h-12 object-center object-cover rounded-full"
                  src="https://imgs.search.brave.com/JgJvd14hp2A9TVwriGsLFc5m0YX-d7SsFDUumpKia-A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/NjE5NzczMC9waG90/by9wb3J0cmFpdC1v/Zi1hLXlvdW5nLWhh/bmRzb21lLWluZGlh/bi1tYW4uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUNuY05V/VGJ3Nm16R3Nib2pr/czJWdDBrVjg1Tl9w/UWFJM3phU2tCUUpG/VGM9"
                />
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">
                {isAuthenticated ? user?.username : "No user"}
              </h3>
              <p className="text-slate-600 text-sm">Manage your account</p>
            </div>
          </div>
        </div>

        <div id="list_items" className="space-y-3">
          <div className="bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-md shadow-slate-200/40 overflow-hidden">
            <li className="list-none p-4 hover:bg-white/40 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="text-slate-700 font-medium group-hover:text-slate-800">
                  Expenses
                </span>
              </div>
            </li>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-md shadow-slate-200/40 overflow-hidden">
            <li className="list-none p-4 hover:bg-white/40 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="text-slate-700 font-medium group-hover:text-slate-800">
                  Wallets
                </span>
              </div>
            </li>
          </div>
        </div>
      </div>

      <div id="right-content" className="w-full lg:w-3/4 xl:w-4/5">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg shadow-slate-200/50 p-6 sm:p-8 h-full min-h-[500px]">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent mb-2">
              All Expense Details
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {/* Placeholder content cards */}
            <div className="bg-gradient-to-r from-white/40 to-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">$</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Recent Transactions
                    </h3>
                    <p className="text-slate-600 text-sm">
                      View your latest expenses
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">
                    $ {monthlyTotal}
                  </div>
                  <div className="text-sm text-slate-600">This month</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/40 to-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Analytics & Reports
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Track your spending patterns
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">5</div>
                  <div className="text-sm text-slate-600">Categories</div>
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                navigate("/addexpenses");
              }}
              className="bg-gradient-to-r from-white/40 to-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Add New Expense
                </h3>
                <p className="text-slate-600 text-sm">
                  Start tracking your expenses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
