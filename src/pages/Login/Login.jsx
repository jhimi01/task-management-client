import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="bg-gray-100 h-screen">
      <div className="pt-20">
        <div className="bg-white w-11/12 md:w-[40%] mx-auto space-y-4 rounded-sm px-6 py-10">
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
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                className="border-slate-400 rounded-md focus:outline-none border p-3 w-full"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <span className="font-semibold text-black underline">
                Forgot your password
              </span>
            </div>
            <button className="bg-primary text-white font-semibold text-lg rounded-full w-full py-3 hover:bg-[#75244b]">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
