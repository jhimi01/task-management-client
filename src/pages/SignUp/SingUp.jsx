import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookie } from "../../hooks/useCookie";
// import { useEffect } from "react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setCookie } = useCookie({ key: "Token", days: 7 });

  const onSubmit = async (data) => {
    if (data.password !== data.retypePassword) {
      alert("privide correct password");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        data
      );
      const token = response.data.token;
      navigate(from, { replace: true }); // Extract the token from the response
      if (token) {
        setCookie(token); // Set the token in the cookie
        alert("User registered successfully and token stored in cookie");
      } else {
        alert("Failed to retrieve token");
      }
      console.log(response.data);
    } catch (e) {
      console.error("Error:", e);
      return;
    }
    console.log(data);
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/users");
  //       console.log("These are all users:", response.data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <div className="bg-gray-100">
      <div className="wrapper">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary my-8">
          It only takes a minute to register for your account
        </h1>
        <div className="bg-white my-10 p-6 shadow rounded-sm">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* First Section */}
            <div className="lg:flex">
              <div>
                <h2 className="text-lg font-medium text-primary">
                  {" Let's create your credentials"}
                </h2>
              </div>
              <div className="md:w-[70%] ml-auto">
                <h1 className="text-primary text-lg">
                  Create an account using
                </h1>
                <button className="hover:bg-gray-300 rounded-md p-1">
                  <img
                    src="https://storage.googleapis.com/libraries-lib-production/images/GoogleLogo-canvas-404-300px.original.png"
                    alt="google icon"
                    className="h-14 w-14"
                  />
                </button>
                <h1 className="text-primary text-lg mb-3">
                  or join by filling up the form below
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

                  <div className="flex w-full gap-5">
                    <div className="w-full">
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        placeholder="Password"
                        className="border-slate-400 focus:outline-none border p-2 w-full"
                      />
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

                  <div className="flex gap-5">
                    <div className="w-full">
                      <input
                        {...register("countryCode", {
                          required: "Country code is required",
                        })}
                        placeholder="Country Code"
                        type="number"
                        className="border-slate-400 focus:outline-none border p-2 w-full"
                      />
                      {errors.countryCode && (
                        <p className="text-red-500">
                          {errors.countryCode.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        {...register("mobileNumber", {
                          required: "Mobile number is required",
                        })}
                        placeholder="Mobile Number"
                        type="number"
                        className="border-slate-400 focus:outline-none border p-2 w-full"
                      />
                      {errors.mobileNumber && (
                        <p className="text-red-500">
                          {errors.mobileNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-5 border border-slate-300" />

            {/* Second Section */}
            <div className="lg:flex">
              <div>
                <h2 className="text-lg lg:mb-0 mb-3 font-medium text-primary">
                  Your personal details
                </h2>
              </div>
              <div className="md:w-[70%] ml-auto">
                <div className="space-y-2">
                  <input
                    {...register("title", { required: "Title is required" })}
                    placeholder="Mr. , Ms."
                    className="border-slate-400 focus:outline-none border p-2 w-full"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}

                  <div className="flex gap-5">
                    <div className="w-full">
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        placeholder="First Name"
                        className="border-slate-400 focus:outline-none border p-2 w-full"
                      />
                      {errors.firstName && (
                        <p className="text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        placeholder="Last Name"
                        className="border-slate-400 focus:outline-none border p-2 w-full"
                      />
                      {errors.lastName && (
                        <p className="text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <input
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                      })}
                      type="date"
                      className="border-slate-400 focus:outline-none border p-2 w-full"
                    />
                    <div className="w-1/2">
                      <label className="text-sm font-medium mb-2">
                        Gender (optional)
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            {...register("gender")}
                            type="radio"
                            value="male"
                            className="border-slate-400 focus:ring focus:ring-slate-300"
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            {...register("gender")}
                            type="radio"
                            value="female"
                            className="border-slate-400 focus:ring focus:ring-slate-300"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-5 border border-slate-300" />

            {/* Third Section */}
            <div className="lg:flex">
              <div>
                <h2 className="text-lg lg:mb-0 mb-3 text-primary font-medium">
                  Where do you live?
                </h2>
              </div>
              <div className="md:w-[70%] ml-auto">
                <div className="space-y-2">
                  <input
                    {...register("country", {
                      required: "Country is required",
                    })}
                    placeholder="Country/region of residence"
                    className="border-slate-400 focus:outline-none border p-2 w-full"
                  />
                  {errors.country && (
                    <p className="text-red-500">{errors.country.message}</p>
                  )}
                </div>
                <div className="mt-6">
                  <button className="bg-primary text-white px-6 py-2 rounded-sm shadow hover:bg-[#722246]">
                    Create an account
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="text-primary text-lg mt-5 text-center cursor-pointer"><Link to="/login">Already have an account? <span className="underline">Login</span></Link></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
