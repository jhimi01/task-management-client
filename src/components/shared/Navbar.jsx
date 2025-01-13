// import { CircleUserRound } from "lucide";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-5 wrapper">
      {/* ads shows */}
      <div className="">
        {/* <div className="bg-white w-full py-4">Essential Heath</div> */}
        <div className="flex justify-between items-center ">
            {/* logo */}
          <div className="text-2xl font-bold">
            <h1>logoooo</h1>
          </div>
          {/* main nav links */}
          <div className="flex items-center gap-5">
            {/* logo */}
            {/* navlinks */}
            <div>
              <ul className="flex items-center gap-5">
                <li>
                  <Link to="/">Explore</Link>
                </li>
                <li>
                  <Link to="/">Book</Link>
                </li>
                <li>
                  <Link to="/">Privilege Club</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* extra service */}
          <div className="flex items-center gap-5">
            <h3>
              <Link to="/">Help</Link>
            </h3>
            {/* login/server */}
            <div className="flex gap-2">
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
