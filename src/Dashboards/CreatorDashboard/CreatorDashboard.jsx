import React from "react";
import { Link, Outlet } from "react-router";

const CreatorDashboard = () => {
  return (
    <div>
      <h2 className="">Creator Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_4fr]">
        <div className="bg-white rounded-2xl flex flex-col p-10">
          <nav>
            <Link
              to={"/creator-dashboard/create-contest"}
              className="btn btn-primary"
            >
              Create contest
            </Link>
          </nav>
        </div>
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
