import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  clearError,
  registerUser,
  verifyOTP,
} from "../../features/auth/authSlice";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.retypePassword) {
      toast.error("Passwords do not match");
      return;
    }

    const newUser = {
      email: data.email,
      password: data.password,
      name: data.name,
      userName: data.userName,
    };

    setLoading(true);
    dispatch(clearError());

    try {
      await dispatch(registerUser(newUser)).unwrap();
      setLoading(false);
      setEmail(data.email);
      setShowOTP(true);

      toast.success("OTP sent to your email");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Failed to register user");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(clearError());

    try {
      await dispatch(verifyOTP({ email, otp })).unwrap();
      setLoading(false);

      toast.success("User verified successfully");

      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Invalid or expired OTP");
    }
  };

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   const newUser = {
  //     email: data.email,
  //     password: data.password,
  //     name: data.name,
  //     userName: data.userName,
  //   };
  //   if (data.password !== data.retypePassword) {
  //     setLoading(false);
  //     alert("Provide correct password");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5001/auth/register",
  //       newUser
  //     );
  //     if (response.status === 200) {
  //       setLoading(false);
  //       toast.success("OTP sent to your email", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //       setShowOTP(true);
  //     }
  //     setEmail(data.email);

  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("An error User email already exists", error.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //     });
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  // const handleVerifyOTP = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5001/auth/verify-otp",
  //       { email, otp }
  //     );
  //     if (response.status === 200) {
  //       setLoading(false);
  //       toast.success("User verified successfully", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     alert("Invalid or expired OTP");
  //   }
  // };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="wrapper">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mt-14 mb-8">
          It only takes a minute to register for your account
        </h1>
        <div className="bg-white my-10 p-6 shadow rounded-sm">
          {!showOTP ? (
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              {/* First Section */}
              <div className="lg:flex">
                <div>
                  <h2 className="text-lg font-medium text-primary">
                    {" Let's create your credentials"}
                  </h2>
                </div>
                <div className="md:w-[70%] ml-auto">
                  <h1 className="text-primary text-lg mb-3">
                    join by filling up the form below
                  </h1>
                  <div className="space-y-2">
                    <div>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="Email Address"
                        type="email"
                        className="border-slate-400 focus:outline-none border p-2 w-full"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="flex gap-5">
                      <div className="w-full">
                        <input
                          {...register("name", {
                            required: "Name is required",
                          })}
                          placeholder="Your Name"
                          className="border-slate-400 focus:outline-none border p-2 w-full"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="w-full">
                        <input
                          {...register("userName", {})}
                          placeholder="Your username"
                          className="border-slate-400 focus:outline-none border p-2 w-full"
                        />
                        {errors.userName && (
                          <p className="text-red-500">
                            {errors.userName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex w-full gap-5">
                      <div className="w-full">
                        <div className="relative">
                          <input
                            {...register("password", {
                              required: "Password is required",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must be at least 6 characters",
                              },
                            })}
                            type={showPass ? "password" : "text"}
                            placeholder="Password"
                            className="border-slate-400 focus:outline-none border p-2 w-full"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2"
                            onClick={() => setShowPass(!showPass)}
                          >
                            {showPass ? <EyeClosed /> : <Eye />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <input
                          {...register("retypePassword", {
                            required: "Please confirm your password",
                          })}
                          type="password"
                          placeholder="Re-type password"
                          className="border-slate-400 focus:outline-none border p-2 w-full"
                        />
                        {errors.retypePassword && (
                          <p className="text-red-500">
                            {errors.retypePassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5 border border-slate-300" />
              <div className="mt-6 flex items-center justify-center">
                <button
                  disabled={loading}
                  className="bg-primary flex items-center gap-2 text-white px-10 py-2 rounded-sm shadow hover:bg-[#722246]"
                >
                  {loading && <Loader className="animate-spin" />}
                  <span>Create an account</span>{" "}
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleVerifyOTP}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-full">
                <h2 className="text-xl text-primary">Enter OTP</h2>
                <input
                  type="text"
                  className="border-slate-400 focus:outline-none border p-3 w-full mb-5"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <button
                  disabled={loading}
                  type="submit"
                  className={`px-5 w-full py-3 ${
                    loading && "bg-[#8e2f5d]"
                  }  bg-primary rounded-sm flex items-center gap-2 text-white`}
                >
                  Verify OTP {loading && <Loader className="animate-spin" />}
                </button>
              </div>
            </form>
          )}

          <div className="text-primary text-lg mt-5 text-center cursor-pointer">
            <Link to="/login">
              Already have an account? <span className="underline">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
