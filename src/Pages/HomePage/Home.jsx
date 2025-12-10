import React from "react";
import Nav from "../../SharedComponents/Nav";
import { Outlet } from "react-router";
import Footer from "../../SharedComponents/Footer";

const Home = () => {
  return (
    <div>
      <Nav />

      <main className="w-full md:w-11/12 mx-auto mt-[60px]">
        <Outlet></Outlet>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
