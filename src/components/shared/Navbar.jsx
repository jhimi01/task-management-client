import { CircleUserRound, Info, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import { useCookie } from "../../hooks/useCookie";
// import { useEffect, useState } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  // const { getCookie, removeCookie } = useCookie({ key: "Token", days: 7 });
  // const token = getCookie();
  // const handleLogout = () => {
  //   removeCookie(); 
  //   // setCookie(" ")
  //   console.log("Token removed");
  // };

  return (
    <nav
      className={`${
        pathname === "/" ? " absolute z-10 text-white" : "bg-white text-black"
      } w-full `}
    >
      {/* <nav className="absolute z-10 w-full"> */}
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
        {/* <div className="bg-white w-full py-4">Essential Heath</div> */}
        <div className="flex justify-between items-center ">
          {/* logo */}
          <div className="text-2xl font-bold">
            <Link to="/">
              <h1>logoooo</h1>
            </Link>
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
              {/* {token ? (
                <div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    Logout <LogOut />
                  </button>
                </div> */}
              {/* // ) : ( */}
                <div className="flex gap-2">
                  <Link to="/login">Log in</Link>
                  <span>|</span>
                  <Link to="/signup">Sign up</Link>
                </div>
              {/* // )} */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
