import meetinging1 from "../../assets/meeting1.png";
import time from "../../assets/time.png";
import pending from "../../assets/pending.webp";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyTasks } from "../../features/tasks/taskSlice";
import { Link } from "react-router";
import { fetchUserData } from "../../features/auth/authSlice";
import { Skeleton } from "@mantine/core";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error, token } = useSelector(
    (state) => state.tasks
  );

  const { user, authToken } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, authToken]);

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch, token]);

  const pendingTask = tasks?.filter((pending) => pending.status === "pending");
  const completedTask = tasks?.filter(
    (pending) => pending.status === "completed"
  );
  if (isLoading) return <div>
    <Skeleton height={140} width="100%" color="blue" style={{ backgroundColor: "#34D399" }}  />
    <div className="grid my-7 md:grid-cols-3 grid-cols-2 gap-2 md:gap-5">
    <Skeleton height={140} color="blue" style={{ backgroundColor: "#34D399" }}  />
    <Skeleton height={140} color="blue" style={{ backgroundColor: "#34D399" }}  />
    <Skeleton height={140} color="blue" style={{ backgroundColor: "#34D399" }}  />
    </div>
   <div className="space-y-3 mt-10">
   <Skeleton height={40} color="blue" style={{ backgroundColor: "#34D399" }}  />
   <Skeleton height={40} color="blue" style={{ backgroundColor: "#34D399" }}  />
   </div>
</div>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <div className="bg-gradient-to-r from-[#5c0931] to-[#ac2365] text-white md:px-10 px-5 md:py-0 py-4 items-center md:flex justify-between">
        <div className="space-y-3">
          <h2 className="text-5xl capitalize font-serif">
            Hi, <span>{user?.userData?.name}</span>
          </h2>
          <p className="text-sm text-gray-200">
            Checkout any completed project and recent project below
          </p>
        </div>
        <img src={meetinging1} className="w-56 h-auto" />
      </div>

      <div className="grid mt-7 md:grid-cols-3 grid-cols-2 gap-2 md:gap-5">
        <div className="md:flex items-center justify-between py-2 md:py-5 px-5 md:px-10 bg-white shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{tasks?.length}</h2>
            <p className="text-sm text-gray-500 mt-1">Total tasks</p>
          </div>
          <img
            src={pending}
            alt="tasks"
            className="md:w-24 md:h-20 object-cover"
          />
        </div>
        <div className="md:flex items-center py-2 md:py-5 px-5 md:px-10 justify-between bg-white shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{pendingTask?.length}</h2>
            <p className="text-sm text-gray-500 mt-1">Pending</p>
          </div>
          <img
            src={meetinging1}
            alt="tasks"
            className="md:w-24 md:h-20 object-cover"
          />
        </div>
        <div className="md:flex items-center py-2 md:py-5 px-5 md:px-10 justify-between bg-white shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{completedTask?.length}</h2>
            <p className="text-sm text-gray-500 mt-1">Completed Tasks</p>
          </div>
          <img
            src={time}
            alt="tasks"
            className="md:w-24 md:h-20 object-cover"
          />
        </div>
      </div>

      <div className="mt-10 group w-fit cursor-pointer">
        <Link className="flex items-center gap-2" to="/my-tasks">
          <h2 className="text-lg group-hover:text-xl duration-300">
            Total Task
          </h2>
          <p className="text-sm flex group-hover:text-base duration-300 items-center">
            view all <ChevronRight />
          </p>
        </Link>
      </div>

      <div className="group my-5 cursor-pointer w-fit">
        <Link className="flex items-center gap-2" to="/add-task">
          <h2 className="text-lg group-hover:text-xl duration-300">Add Task</h2>
          <p className="text-sm flex items-center group-hover:text-base duration-300">
            view form <ChevronRight />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
