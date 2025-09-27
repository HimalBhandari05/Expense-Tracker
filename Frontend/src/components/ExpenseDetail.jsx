import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useExpense } from "../context/expenseContext";
import { Link } from "react-router-dom";
import { useCategory } from "../context/categoryContext";

function ExpenseDetail() {
  const { totalExpenseList, expenses, totalExpense, getExpenseTotal } =
    useExpense();

  const { category } = useCategory();
  console.log("category is", category);
  const [dateRange, setDateRange] = useState(30);
  const [categorySelected, setCategorySelected] = useState('');

  const handleDateRange = (e) => {
    console.log("Data is: ", e.target.value);
    setDateRange(e.target.value);
  };

  const handleCategoryRange = (e) => {
    setCategorySelected(e.target.value)
  };

  const sevenDayTotal = getExpenseTotal(7);
  const thirtyDayTotal = getExpenseTotal(30);
  const ninetyDayTotal = getExpenseTotal(90);

  let dateArray = [
    { id: 1, value: 7, label: "Last 7 days" },
    { id: 2, value: 30, label: "Last 30 days" },
    { id: 3, value: 90, label: "Last 90 days" },
    { id: 4, value: "custom", label: "Custom range" },
  ];

  let categoryArray = [
    { id: 1, value: "all", label: "All Categories" },
    { id: 2, value: "food", label: "Food & Dining" },
    { id: 3, value: "transport", label: "Transportation" },
    { id: 4, value: "shopping", label: "Shopping" },
    { id: 5, value: "entertainment", label: "Entertainment" },
  ];

  //   console.log("Data is given: ", dateRange)
  //   console.log("total expense: ", totalExpenseList);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Expenses
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage and track your spending
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600">
                  Import
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600">
                  Export
                </button>
                <Link to="/addexpenses">
                  <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 border border-blue-600 dark:border-blue-500">
                    Add Expense
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">
                Filter Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Date Range
                  </label>
                  <select
                    onChange={handleDateRange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {dateArray.map((opt) => (
                      <option key={opt.id} value={opt.value}>
                        {" "}
                        {opt.label}{" "}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Category
                  </label>
                  <select
                    onChange={handleCategoryRange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categoryArray.map((cat) => {
                      <option key={cat.id} value={cat.value}>
                        {" "}
                        {cat.label}{" "}
                      </option>;
                    })}

                    {/* <option>All categories</option>
                    <option>Food & Dining</option>
                    <option>Transportation</option>
                    <option>Shopping</option>
                    <option>Entertainment</option> */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <h1 className="text-gray-900 dark:text-gray-100"> Result </h1>
                {dateRange === "7" ? (
                  <h1 className="text-gray-900 dark:text-gray-100">
                    {" "}
                    {sevenDayTotal}{" "}
                  </h1>
                ) : dateRange === "30" ? (
                  <h1 className="text-gray-900 dark:text-gray-100">
                    {" "}
                    {thirtyDayTotal}{" "}
                  </h1>
                ) : (
                  <h1 className="text-gray-900 dark:text-gray-100">
                    {" "}
                    {ninetyDayTotal}{" "}
                  </h1>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      Total Expenses
                    </p>
                    <p className="text-3xl font-semibold mt-1">
                      {totalExpenseList}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
                    <span className="text-xl">📊</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      This Month
                    </p>
                    <p className="text-3xl font-semibold mt-1">
                      $ {thirtyDayTotal}{" "}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
                    <span className="text-xl">📅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      Total Amount
                    </p>
                    <p className="text-3xl font-semibold mt-1">
                      {" "}
                      ${totalExpense}{" "}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
                    <span className="text-xl">💰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-6 lg:px-8 lg:py-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  Recent Transactions
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Last updated 2 min ago
                </span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Transaction ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                    {/* yesma aba dynamic banaunu paryo */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        #TXN001
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        Sep 22, 2024
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                        Downtown Bistro Lunch
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-600">
                          Food
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        $45.50
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        #TXN002
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        Sep 21, 2024
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                        Ride to Airport
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-600">
                          Transport
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        $32.80
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        #TXN003
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        Sep 20, 2024
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                        Office Supplies Bundle
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-600">
                          Business
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        $89.99
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        #TXN004
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        Sep 19, 2024
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                        Monthly Gym Membership
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-600">
                          Health
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        $75.00
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden p-4 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-200">
                      #TXN001
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Downtown Bistro Lunch
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Sep 22, 2024
                    </p>
                  </div>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    $45.50
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-500">
                    Food
                  </span>
                  <div className="flex space-x-4">
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-200">
                      #TXN002
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Ride to Airport
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Sep 21, 2024
                    </p>
                  </div>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    $32.80
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-500">
                    Transport
                  </span>
                  <div className="flex space-x-4">
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-200">
                      #TXN003
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Office Supplies Bundle
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Sep 20, 2024
                    </p>
                  </div>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    $89.99
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-500">
                    Business
                  </span>
                  <div className="flex space-x-4">
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpenseDetail;
