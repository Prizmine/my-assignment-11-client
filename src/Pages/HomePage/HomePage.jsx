import React, { useState } from "react";
import Hero from "./Hero/Hero";

const HomePage = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div>
      <Hero setSearch={setSearch}></Hero>
    </div>
  );
};

export default HomePage;
