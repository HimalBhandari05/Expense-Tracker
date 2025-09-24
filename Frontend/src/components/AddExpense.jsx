import React, { useEffect, useState, useId } from "react";
import { useForm } from "react-hook-form";
import { getPayment, createExpense } from "../Services/expenseService";
import { getCategories, getCategory } from "../Services/categoryService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AddExpense() {
  const [categories, setCategories] = useState([]);
  const [payment, setPayment] = useState([]);
  const navigate = useNavigate();

  const textAreaId = useId();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitted },
  } = useForm();

  const selectedPayment = watch("payment");
  const selectedCategory = watch("category");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log("Error while fetching category data", error);
      }
    }

    async function fetchPayments() {
      try {
        const data = await getPayment();
        console.log("Payment fetched successfully", data);
        setPayment(data);
      } catch (error) {
        console.log("Error in fetching the payments", error);
      }
    }
    fetchCategories();
    fetchPayments();
  }, []);

  console.log("Expenses ", payment);
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await createExpense(data);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      console.log("data is ", response);
    } catch (error) {
      console.log("Data not created", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md sm:max-w-lg mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              Add Expense
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2 text-sm">
              Track your spending with ease
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 6,
                    message: "Please enter the title correctly",
                  },
                })}
                type="text"
                placeholder="Enter expense title"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              {isSubmitted && errors.title && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount
              </label>
              <input
                {...register("amount", {
                  required: true,
                  min: {
                    value: 0,
                    message: "Enter valid amount",
                  },
                })}
                required
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              {isSubmitted && errors.amount && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                {...register("date", {
                  required: true,
                  message: "Enter valid date",
                })}
                required
                type="date"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
              />
              {isSubmitted && errors.date && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Category
              </label>
              <select
                {...register("category_id", {
                  required: "Please select a category",
                })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
              >
                <option value="" className="text-gray-500 dark:text-gray-400">
                  Choose category...
                </option>
                {categories.map((cat) => (
                  <option
                    value={cat.id}
                    key={cat.id}
                    className="text-gray-900 dark:text-white"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              {isSubmitted && errors.category_id && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Payment Method
              </label>
              <select
                {...register("payment_method", {
                  required: "Please select a payment method",
                })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
              >
                <option value="" className="text-gray-500 dark:text-gray-400">
                  Choose payment method...
                </option>
                {payment.map((pay, index) => (
                  <option
                    value={pay.value}
                    key={index}
                    className="text-gray-900 dark:text-white"
                  >
                    {pay.label}
                  </option>
                ))}
              </select>
              {isSubmitted && errors.payment_method && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.payment_method.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={textAreaId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id={textAreaId}
                {...register("description", {
                  required: "This field is required",
                })}
                placeholder="Enter expense description..."
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              />
              {isSubmitted && errors.description && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddExpense;
