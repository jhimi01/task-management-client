import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../taskSlice";
// import { showNotification } from "@mantine/notifications";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (data) => {
    const { title, description, dueDate, userId } = data;
    try {
      const formattedDueDate = new Date(dueDate).toISOString();
      const taskData = {
        title,
        description,
        dueDate: formattedDueDate,
        userId,
      };

      const responsce = dispatch(addTask(taskData));
      reset();
      navigate('/my-tasks');
      console.log(responsce);
      toast.success("Task added successfully!", {});
    } catch (e) {
      toast.error('Failed adding task')
      console.log("error", e);
    }

    // Ensure dueDate is in ISO-8601 format (with time component)
  };

  return (
    <div className="bg-white py-5 md:py-10 px-5 md:px-12 shadow-md  mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Add Task</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-2 md:space-y-5">
          <div className=" space-y-3">
            {/* Task Name */}
            <div className="md:flex">
              <label
                htmlFor="title"
                className="block text-lg md:w-[30%] font-medium mb-1 md:mb-3"
              >
                Task Name:
              </label>
              <div className="w-full">
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title of the task"
                  {...register("title", { required: "Task name is required" })}
                  className="w-full border border-gray-300  p-2 focus:outline-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="md:flex">
              <label
                htmlFor="dueDate"
                className="block text-lg md:w-[30%] font-medium mb-1 md:mb-3"
              >
                Due Date:
              </label>
              <div className="w-full">
                <input
                  type="date"
                  id="dueDate"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="w-full border border-gray-300  p-2 focus:outline-none"
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            {/* <div className="md:flex">
              <label
                htmlFor="status"
                className="block text-lg md:w-[30%] font-medium mb-1 md:mb-3"
              >
                Status:
              </label>
              <div className="w-full">
                <select
                  id="status"
                  {...register("status", { required: "Status is required" })}
                  className="w-full p-2 focus:outline-none border border-gray-300"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div> */}

            {/* Description */}
            <div className="md:flex">
              <label
                htmlFor="description"
                className="block text-lg md:w-[30%] font-medium mb-1 md:mb-3"
              >
                Description:
              </label>
              <div className="w-full">
                <textarea
                  id="description"
                  placeholder="Detailed information about the task"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center md:w-1/2 mt-5 mx-auto flex items-center justify-center">
          <button
            type="submit"
            className="bg-primary w-full text-white font-medium py-2 shadow-md hover:bg-primary focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
