import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Loader } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../../features/auth/authSlice";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const [showPass, setShowPass] = useState(true);

  function onChange(value) {
    setRecaptchaToken(value || "");
  }

  console.log("recaptchaToken", recaptchaToken)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const resultAction = await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
          recaptchaToken,
        })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        setIsLoading(false)
        toast.success("Login successful!");
        navigate("/");
      } else {
        console.log(resultAction)
        setIsLoading(false)
        toast.error(resultAction?.payload?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("Failed to login");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="pt-10">
        <div className="bg-white w-11/12 md:w-[40%] mx-auto space-y-4 rounded-sm px-6 pt-10 pb-5">
          <h3 className="text-3xl">Log in to your account</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                })}
                placeholder="Email Address"
                type="email"
                className="border-slate-400 rounded-md focus:outline-none border p-3 w-full"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

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

            <ReCAPTCHA
              sitekey="6LdqceUqAAAAAFzkEhr1pcFw2mhZZK67SizdJyax"
              onChange={onChange}
            />

            <Link to="/send-email">
              <h4 className="text-xl underline text-primary cursor-pointer">
                Forget Password
              </h4>
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary flex items-center justify-center gap-2 text-white font-semibold text-lg rounded-full w-full py-3 hover:bg-[#75244b]"
            >
              Log In {isLoading && <Loader className={isLoading && "animate-spin"} />}
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
