// import { CircleUserRound } from "lucide";
import { CircleUserRound, Info, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute z-10 w-full">
      {/* ads shows */}
      <div className="bg-white w-full">
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <Info />
            <h3 className="capitalize text-slate-600">Flight operation update: Resumption flight to lebanon</h3>
          </div>
          <div>
            <X className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="wrapper text-white">
        {/* <div className="bg-white w-full py-4">Essential Heath</div> */}
        <div className="flex justify-between items-center ">
          {/* logo */}
          <div className="text-2xl font-bold">
            <h1>logoooo</h1>
          </div>
          {/* main nav links */}
          <div className="flex items-center text-xl">
            {/* logo */}
            {/* navlinks */}

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
              <Link to="/login">Log in</Link>
              <span>|</span>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
