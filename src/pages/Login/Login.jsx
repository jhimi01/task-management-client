import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Loader } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Bounce, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  verifyOTP,
  clearError,
} from "../../features/auth/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const { isLoading, error, otpSent, user, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && token) {
      navigate("/");
      toast.success("🦄 Logged in successfully!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
    if (otpSent) {
      setShowOTP(true);
      toast.success("OTP sent to your email", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } else{
      setShowOTP(false);
    }
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      dispatch(clearError());
    }
  }, [user, token, otpSent, error, navigate, dispatch]);

  function onChange(value) {
    setRecaptchaToken(value || "");
  }

  // Handle Login
  const onSubmit = (data) => {
    console.log("Login form data:", data);
    console.log("reCAPTCHA token:", recaptchaToken);
    setEmail(data.email);
    dispatch(
      loginUser({ email: data.email, password: data.password, recaptchaToken })
    );
  };

  // Handle OTP Verification
  const handleVerifyOTP = () => {
    dispatch(verifyOTP({ email, otp }));
  };

  console.log("show otp", showOTP);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="pt-10">
        <div className="bg-white w-11/12 md:w-[40%] mx-auto space-y-4 rounded-sm px-6 pt-10 pb-5">
          <h3 className="text-3xl">Log in to your account</h3>
          {!showOTP ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                sitekey="6LchN7gqAAAAAN1x37YAX0nhMkvuta3w_0ZiRElH"
                onChange={onChange}
              />

              <Link to="/send-email">
                <h4 className="text-xl underline text-primary cursor-pointer">
                  Forget Password
                </h4>
              </Link>

              <button
                disabled={isLoading}
                type="submit"
                className={`${
                  isLoading && "bg-[#8e2f5d]"
                } bg-primary flex items-center justify-center gap-2 text-white font-semibold text-lg rounded-full w-full py-3 hover:bg-[#75244b]`}
              >
                Log In
                {isLoading && <Loader className="animate-spin" />}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleVerifyOTP)}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-full">
                <h2 className="text-xl text-primary">Enter OTP</h2>
                <input
                  {...register("otp", { required: "OTP is required" })}
                  type="text"
                  className="border-slate-400 focus:outline-none border p-3 w-full mb-5"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {errors.otp && (
                  <p className="text-red-500">{errors.otp.message}</p>
                )}
              </div>

              <div className="w-full">
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`px-5 w-full py-3 ${
                    isLoading && "bg-[#8e2f5d]"
                  } bg-primary flex items-center gap-2 rounded-sm text-white`}
                >
                  Verify OTP
                  {isLoading && <Loader className="animate-spin" />}
                </button>
              </div>
            </form>
          )}

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
