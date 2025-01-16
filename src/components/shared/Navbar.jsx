import { CircleUserRound, Info, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const Navbar = () => {
  const { user } = useLoggedInUser();
  const check = user
  console.log(user)
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <nav
      className={`${
        pathname === "/" ? " absolute z-10 text-white" : "bg-white text-black"
      } w-full `}
    >
      {/* ads shows */}
      <div
        style={{ boxShadow: "20px 10px 15px rgba(0, 0, 0, 0.10)" }}
        className={`${pathname === "/" ? "block" : "hidden"} bg-white w-full`}
      >
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <Info className="text-blue-400" />
            <h3 className="capitalize text-slate-600">
              Flight operation update: Resumption flight to lebanon
            </h3>
          </div>
          <div>
            <X className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="wrapper shadow-inner">
        <div className="flex justify-between items-center ">
          {/* logo */}
          <div className="text-2xl font-bold">
            <Link to="/">
              <h1>logoooo</h1>
            </Link>
          </div>
          {/* main nav links */}
          <div className="flex items-center text-xl">
            <ul className="flex items-center gap-14">
              <li>
                <Link to="/">Explore</Link>
              </li>
              <li>
                <Link to="/">Book</Link>
              </li>
              <li>
                <Link to="/">Experience</Link>
              </li>
              <li>
                <Link to="/">Privilege Club</Link>
              </li>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
            </ul>
          </div>
          {/* extra service */}
          <div className="flex items-center gap-10 text-xl">
            <div className="flex items-center gap-5">
              <Link to="/">Help</Link>
              <Search />
            </div>
            {/* login/server */}
            <div className="flex gap-2 items-center">
              <CircleUserRound />
              <div className="flex gap-2">
                <Link to="/login">Log in</Link>
                <span>|</span>
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
