import axios from "axios";
import React, { useId, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";

const Login = (className, ...props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isError, setisError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = async (data) => {
    setisLoading(true);
    setisError('')
    console.log(data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        data
      );

      console.log(response.status);
      console.log("success", response.data);

      if (response.status == 200) {
        setisLogin(true);
      } else {
        setisLogin(false);
      }

      const access = response.data.access ?? response.data.access_token;
      const refresh = response.data.refresh ?? response.data.refresh_token;

      if (access){
        localStorage.setItem("access_token" , access)

        axios.defaults.headers.common["Authorization"] =   `Bearer ${access}`
      }
      if (refresh){
        localStorage.setItem("refresh_token" , refresh);
      }
      
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);


      console.log(localStorage)

      setisLogin(true); // temporary disable hunxa submit button.

      setTimeout(() => {
        setisLogin(false);
        reset();
      }, 1000);
    } catch (error) {
      setisError("Invalid Credentials ! Try again");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-5">
            <div>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message:
                      "Please enter username correctly (atleast 4 words) ",
                  },
                })}
                type="text"
                placeholder="Username"
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
              />
              {isSubmitted && errors.username && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Please enter password correctly",
                  },
                })}
                type="password"
                placeholder="Password"
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
              />
              {isSubmitted && errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {isLogin && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <p className="text-sm font-medium text-green-800">
                  Logged in Successfully!
                </p>
              </div>
            </div>
          )}

          {isError && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-center">
                <span className="text-red-600 mr-2"> {<ImCross />} </span>
                <p className="text-sm font-medium text-red-700">{isError}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
