import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// using the react hook form in here. useForm returns object not the array
const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isData, setisData] = useState({});

  const {
    register,
    handleSubmit,
    getValues,
    reset, // yesle chai form field ko value lai chai reset garna lai
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = async (data) => {
    setisSubmitting(true);
    console.log(data);
    setIsRegister(false);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/' , data)
      console.log("success" , response.data)

      setIsRegister(true);

      setTimeout(() => {
        setIsRegister(false);
        reset();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    finally{
      setisSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Form
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
        >
          <div className="space-y-4">
            {/* Username */}
            <div>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Valid username required",
                  },
                })}
                type="text"
                placeholder="Username"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {isSubmitted && errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password", {
                  required: "Password Required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                type="password"
                placeholder="Password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {isSubmitted && errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password2", {
                  required: "Please confirm your password",
                  validate: (value) => {
                    const password = getValues("password");
                    if (value != password) {
                      return "Password do not match";
                    } else {
                      return true;
                    }
                  },
                  minLength: {
                    value: 8,
                    message:
                      "Password confirmation must be at least 8 characters",
                  },
                })}
                type="password"
                placeholder="Confirm Password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {isSubmitted && errors.password2 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password2.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                placeholder="Email address"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {isSubmitted && errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isSubmitting} // false huda kaam garxa else fails
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out 
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {isSubmitting ? "Registering ... " : "Register"}
            </button>
          </div>

          {isRegister && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Registered Successfully!
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
