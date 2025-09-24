import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../Services/axios";
import axios from "axios";
import { getCategories } from "../Services/categoryService";
import { Link } from "react-router-dom";
import { getExpenses } from "../Services/expenseService";

const API_KEY = "http://127.0.0.1:8000/api/expenses/";

function Expenses() {
  const { user, isAuthenticated } = useAuth();
  const [category, setCategory] = useState([]);
  const [expense, setExpense] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log("username is ", user?.username);

  console.log("Monthly total chai", monthlyTotal);
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
      className="flex flex-col lg:flex-row gap-6 p-4 -z-20 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div id="left-content" className="w-full lg:w-1/4 xl:w-1/5">
        <div
          id="profile_details"
          className="mb-6 p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 p-0.5 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {" "}
                <img
                  className="w-12 h-12 object-center object-cover rounded-full"
                  src="https://imgs.search.brave.com/JgJvd14hp2A9TVwriGsLFc5m0YX-d7SsFDUumpKia-A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/NjE5NzczMC9waG90/by9wb3J0cmFpdC1v/Zi1hLXlvdW5nLWhh/bmRzb21lLWluZGlh/bi1tYW4uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUNuY05V/VGJ3Nm16R3Nib2pr/czJWdDBrVjg1Tl9w/UWFJM3phU2tCUUpG/VGM9"
                />
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                {isAuthenticated ? user?.username : "No user"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your account
              </p>
            </div>
          </div>
        </div>

        <div id="list_items" className="space-y-3">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl border border-white/40 dark:border-gray-700/40 shadow-md shadow-gray-200/40 dark:shadow-gray-900/40 overflow-hidden">
            <li className="list-none p-4 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-100">
                  Expenses
                </span>
              </div>
            </li>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl border border-white/40 dark:border-gray-700/40 shadow-md shadow-gray-200/40 dark:shadow-gray-900/40 overflow-hidden">
            <li className="list-none p-4 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-100">
                  Wallets
                </span>
              </div>
            </li>
          </div>
        </div>
      </div>

      <div id="right-content" className="w-full lg:w-3/4 xl:w-4/5">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 p-6 sm:p-8 h-full min-h-[500px]">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 bg-clip-text text-transparent mb-2">
              All Expense Details
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-gray-500 dark:from-blue-500 dark:to-gray-600 rounded-full"></div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <Link
              to={{
                pathname: "/expensedetail",
              }}
            >
              <div className="bg-gradient-to-r from-white/40 to-white/60 dark:from-gray-700/40 dark:to-gray-600/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        $
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        Recent Transactions
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        View your latest expenses
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      $ {monthlyTotal}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      This month
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="bg-gradient-to-r from-white/40 to-white/60 dark:from-gray-700/40 dark:to-gray-600/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Analytics & Reports
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Track your spending patterns
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    5
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Categories
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                navigate("/addexpenses");
              }}
              className="bg-gradient-to-r from-white/40 to-white/60 dark:from-gray-700/40 dark:to-gray-600/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-300 cursor-pointer"
            >
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Add New Expense
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
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
