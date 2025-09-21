import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getPayment, createExpense } from "../Services/expenseService";
import { getCategories, getCategory } from "../Services/categoryService";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const [categories, setCategories] = useState([]);
  const [payment, setPayment] = useState([]);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Add Expenses
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 6,
                  message: "Please enter the title correctly",
                },
              })}
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {isSubmitted && errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
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
              step={5}
              placeholder="Amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isSubmitted && errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("date", {
                required: true,
                message: "Enter valid date",
              })}
              required
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isSubmitted && errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              {...register("category_id", {
                required: "Please select a category",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Choose category...</option>
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {isSubmitted && errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Method
            </label>
            <select
              {...register("payment_method", {
                required: "Please select a payment method",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Choose payment method...</option>
              {payment.map((pay, index) => (
                <option value={pay.value} key={index}>
                  {pay.label}
                </option>
              ))}
            </select>
            {isSubmitted && errors.payment && (
              <p className="text-red-500 text-sm mt-1">
                {errors.payment.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
