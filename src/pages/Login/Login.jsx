import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookie } from "../../hooks/useCookie";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setCookie } = useCookie({ key: "Token", days: 7 });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/api/login", {
        email: data.email,
        password: data.password,
      });

      // Check if the response is successful
      if (response.status === 200) {
        // Store the JWT token in localStorage or cookies (optional)
        setLoading(false);
        const token = response.data.token;
        if (token) {
          setCookie(token); // Set the token in the cookie
          alert("loggged in successfully and token stored in cookie");
        } else {
          alert("Failed to retrieve token");
        }

        // Redirect the user to a protected route (for example, the dashboard)
        navigate("/"); // Replace with the actual route you want to redirect to
      }
    } catch (error) {
      // Handle any errors from the API
      if (error.response) {
        // Server responded with an error
        alert(error.response.data.error || "Login failed");
      } else {
        // Something else went wrong
        alert("Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <div className="bg-gray-100 h-screen">
      <div className="pt-20">
        <div className="bg-white w-11/12 md:w-[40%] mx-auto space-y-4 rounded-sm px-6 pt-10 pb-5">
          <h3 className="text-3xl">Log in to your account</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email Address"
                type="email"
                className="border-slate-400 rounded-md focus:outline-none border p-3 w-full"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPass ? "password" : "text"}
                  placeholder="Password"
                  className="border-slate-400 rounded-md focus:outline-none border p-3 w-full"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeClosed /> : <Eye />}
                </button>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <span className="font-semibold text-black underline">
                Forgot your password
              </span>
            </div>
            <button
              disabled={loading}
              className={`${
                loading && "bg-[#8e2f5d]"
              } bg-primary text-white font-semibold text-lg rounded-full w-full py-3 hover:bg-[#75244b]`}
            >
              Log In
            </button>
            <div className="flex items-center gap-1">
              <div className="h-[1px] w-full bg-slate-600"></div>
              or
              <div className="h-[1px] w-full bg-slate-600"></div>
            </div>
          </form>
          <div>
            <button className="text-center bg-slate-200 hover:bg-slate-300 w-full rounded-full">
              <img
                src="https://storage.googleapis.com/libraries-lib-production/images/GoogleLogo-canvas-404-300px.original.png"
                alt="google icon"
                className="h-14 w-14 mx-auto"
              />
            </button>
          </div>
          <div className="text-primary text-lg mt-5 text-center cursor-pointer">
            <Link to="/signup">
              Are you new here? <span className="underline">Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
