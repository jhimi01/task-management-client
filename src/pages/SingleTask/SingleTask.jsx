import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleTask } from "../../features/tasks/taskSlice";
import { Skeleton } from "@mantine/core";

const SingleTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { task, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(singleTask({ id }));
  }, [dispatch, id]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="flex justify-center items-center h-[80vh] p-6">
      {task ? (
        <div className="bg-white shadow-lg  max-w-2xl w-full">
          {/* Title & Status */}
          <div className="flex items-center bg-gray-300 p-4 justify-between">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {task?.title}
            </h1>
            <span
              className={`px-4 py-1 text-sm font-semibold rounded-full ${
                task?.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {task?.status}
            </span>
          </div>
          {/* 
          <hr /> */}

          {/* Task Details */}
          <div className="space-y-2 mt-2 text-gray-700 p-4">
            <p className="">
              <span className="font-semibold text-gray-900">User ID:</span>{" "}
              {task?.userId}
            </p>
            <p className="">
              <span className="font-semibold text-gray-900">End Date:</span>{" "}
              {new Date(task?.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="">
              <span className="font-semibold text-gray-900">Created:</span>{" "}
              {new Date(task?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {task?.createdAt !== task?.updatedAt ? (
              <p className="">
                <span className="font-semibold text-gray-900">Updated:</span>{" "}
                {new Date(task?.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            ) : (
              <p></p>
            )}

            <p className="">
              <span className="font-semibold text-gray-900">Description:</span>{" "}
              {task?.description}
            </p>
          </div>
        </div>
      ) : (
        <Skeleton
          height={300}
          width="70%"
          style={{ backgroundColor: "#34D399" }}
        />
      )}
    </div>
  );
};

export default SingleTask;
