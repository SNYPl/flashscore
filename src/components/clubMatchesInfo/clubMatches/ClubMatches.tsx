"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import FixturesMatches from "./fixutresClubMatches/FixturesMatches";
import ResultMatches from "./resultClubMatches/ResultMatches";

const ClubMatches = () => {
  const [active, setActive] = useState("FIXTURES");

  return (
    <article className={`${style.clubmatches} bg-white rounded-lg p-4`}>
      <div>
        <div className={`flex items-center mb-4 gap-x-3 ${style.nav}`}>
          <button
            className={`${active === "FIXTURES" ? style.active : ""}`}
            onClick={() => setActive("FIXTURES")}
          >
            FIXTURES
          </button>
          <button
            className={`${active === "RESULTS" ? style.active : ""}`}
            onClick={() => setActive("RESULTS")}
          >
            RESULTS
          </button>
        </div>
      </div>

      {active === "FIXTURES" && <FixturesMatches />}
      {active === "RESULTS" && <ResultMatches />}
    </article>
  );
};

export default ClubMatches;
