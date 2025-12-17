import React, { useState } from "react";
import Hero from "./Hero/Hero";
import PopularContest from "./PopularContest/PopularContest";
import Winners from "./Winners/Winners";
import ExtraSection from "./Extra/ExtraSection";

const HomePage = () => {
  const [search, setSearch] = useState("");
  // console.log(search);
  return (
    <div>
      <Hero setSearch={setSearch}></Hero>
      <PopularContest search={search}></PopularContest>
      <Winners></Winners>
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default HomePage;
