import React from "react";
import Nav from "../../SharedComponents/Nav";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main className="w-full md:w-11/12 mx-auto mt-[60px]">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Home;
