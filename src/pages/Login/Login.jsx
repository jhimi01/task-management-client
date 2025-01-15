import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useCookie } from "../../hooks/useCookie";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const { setCookie } = useCookie({ key: "Token", days: 7 });

  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setRecaptchaToken(value || ""); // Set token to send to backend
  }

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: data.email,
          password: data.password,
          recaptchaToken,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        const token = response.data.token;
        if (token) {
          alert("Logged in successfully");
          setCookie(token);
          navigate("/");
        } else {
          alert("Failed to retrieve token");
        }
      }
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="pt-20">
        <div className="bg-white w-11/12 md:w-[40%] mx-auto space-y-4 rounded-sm px-6 pt-10 pb-5">
          <h3 className="text-3xl">Log in to your account</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
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
            <ReCAPTCHA
              sitekey="6LchN7gqAAAAAN1x37YAX0nhMkvuta3w_0ZiRElH"
              onChange={onChange}
            />
            <button
              disabled={loading}
              type="submit"
              className={`${
                loading && "bg-[#8e2f5d]"
              } bg-primary text-white font-semibold text-lg rounded-full w-full py-3 hover:bg-[#75244b]`}
            >
              Log In
            </button>
          </form>
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
