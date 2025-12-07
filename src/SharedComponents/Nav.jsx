import React, { useEffect, useRef, useState } from "react";
import NavLogo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import defaultUserImage from "../assets/default-user.png";
import UseAuth from "../Hoocks/UseAuth";
import { RxDropdownMenu } from "react-icons/rx";

const Nav = () => {
  const { user, logOut } = UseAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = (
    <>
      <NavLink to={"/"}>home</NavLink>
      <NavLink>home</NavLink>
      <NavLink>home</NavLink>
      <NavLink>home</NavLink>
    </>
  );
  return (
    <nav className="w-full mt-0 md:mt-8 md:w-11/12 md:rounded-xl mx-auto flex justify-around h-20 items-center z-50 bg-white shadow-sm">
      {showSidebar && <div className="fixed inset-0 z-10 bg-black/60 "></div>}
      <div
        ref={sidebarRef}
        className={`h-full absolute left-0 top-0 bg-white w-[200px] transition-all duration-200 ease-in-out z-20 ${
          showSidebar
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "opacity-0 pointer-events-none -translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3.5 items-center mt-8">{links}</div>
      </div>
      <div className="flex items-center">
        <img src={NavLogo} alt="" className="w-[120px] md:w-[150px] h-auto" />
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[150px] h-auto md:hidden ml-2.5 text-2xl"
        >
          {showSidebar ? "" : <RxDropdownMenu />}
        </button>
      </div>
      <div className="flex justify-between items-center gap-7">
        <div className="gap-3.5 hidden md:flex">{links}</div>
        <div className="">
          {user ? (
            <img
              src={user.photoUrl ? user.photoUrl : defaultUserImage}
              alt=""
              className="w-[50px] h-[50px]"
            />
          ) : (
            <Link to={"/auth/login"} className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
