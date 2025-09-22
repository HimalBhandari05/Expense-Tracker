import axios from "axios";
import React, { useId, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Login = (className, ...props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isError, setisError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  const { login } = useAuth();

  const onSubmit = async (data) => {
    setisLoading(true);
    setisError("");
    console.log(data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        data
      );

      if (response.status == 200) {
        const access = response.data.access ?? response.data.access_token;
        const refresh = response.data.refresh ?? response.data.refresh_token;

        login({ access, refresh });

        setisLogin(true);

        setTimeout(() => {
          setisLogin(false);
          reset();
        }, 1000);
      }

      const access = response.data.access ?? response.data.access_token;
      const refresh = response.data.refresh ?? response.data.refresh_token;

      if (access) {
        localStorage.setItem("access_token", access);

        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      }
      if (refresh) {
        localStorage.setItem("refresh_token", refresh);
      }

      console.log(localStorage);

      setisLogin(true); // temporary disable hunxa submit button.

      navigate("/");

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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-6 px-4 sm:py-8 lg:py-12">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium max-w-md mx-auto">
              Sign in to continue your expense tracking journey
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-6 bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
          >
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="group relative">
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
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 text-sm sm:text-base md:text-lg border-2 border-gray-200 rounded-xl sm:rounded-2xl placeholder-gray-400 text-gray-900 bg-gray-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-md"
                />
                {isSubmitted && errors.username && (
                  <p className="mt-2 text-xs sm:text-sm md:text-base text-red-600 flex items-center font-medium animate-fade-in">
                    <span className="mr-2 text-sm sm:text-base">⚠️</span>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="group relative">
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
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 text-sm sm:text-base md:text-lg border-2 border-gray-200 rounded-xl sm:rounded-2xl placeholder-gray-400 text-gray-900 bg-gray-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-md"
                />
                {isSubmitted && errors.password && (
                  <p className="mt-2 text-xs sm:text-sm md:text-base text-red-600 flex items-center font-medium animate-fade-in">
                    <span className="mr-2 text-sm sm:text-base">⚠️</span>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full flex justify-center items-center py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg font-bold rounded-xl sm:rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-500 transform ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed scale-95 shadow-md"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 active:shadow-lg"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center space-x-3">
                  <svg
                    className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white"
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
                  <span className="text-sm sm:text-base md:text-lg">
                    Logging in...
                  </span>
                </span>
              ) : (
                <span className="text-sm sm:text-base md:text-lg font-bold">
                  Sign In
                </span>
              )}
            </button>

            <div className="text-center pt-4 sm:pt-6">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-800 font-bold underline decoration-2 decoration-indigo-600 underline-offset-4 hover:decoration-indigo-800 transition-all duration-300 hover:scale-105 inline-block"
                >
                  Register here
                </Link>
              </p>
            </div>

            {isLogin && (
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-5 md:p-6 border-2 border-green-200 shadow-lg animate-fade-in">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-green-500 text-xl sm:text-2xl">✅</span>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-green-800">
                    Logged in Successfully!
                  </p>
                </div>
              </div>
            )}

            {isError && (
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 p-4 sm:p-5 md:p-6 border-2 border-red-200 shadow-lg animate-fade-in">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-red-600 text-lg sm:text-xl">
                    <ImCross />
                  </span>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-red-700">
                    {isError}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
