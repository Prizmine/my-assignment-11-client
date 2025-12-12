import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col">
      <h1 className="text-center text-6xl font-black">
        <span className="text-red-500">404</span> <br /> Page Not Found
      </h1>

      <p className="text-center font-semibold mt-5">Go Back to Home</p>
      <Link
        to={"/"}
        className="btn bg-blue-600 text-white px-9 flex justify-self-center mt-5"
      >
        Home
      </Link>
    </div>
  );
};

export default Error;
