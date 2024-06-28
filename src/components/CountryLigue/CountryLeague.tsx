"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import LeagueNavigation from "./leagueNavigation/LeagueNavigation";
import Table from "./matches/Matches";
import Todaymatches from "./leagueNavigation/todayMatches/Todaymatches";
import LatestScores from "./leagueNavigation/latestScores/LatestScores";
import ScheduledMatches from "./leagueNavigation/scheduledMatches/ScheduledMatches";

const CountryLeague = () => {
  const [activeMenu, setActiveMenu] = useState("SUMMARY");
  return (
    <section className={`${style.countryLeague}`}>
      <LeagueNavigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === "SUMMARY" && (
        <div>
          <Todaymatches />
          <LatestScores />
          <ScheduledMatches />
          <Table />
        </div>
      )}

      {activeMenu === "RESULTS" && <LatestScores />}
      {activeMenu === "FIXTURES" && <ScheduledMatches />}
      {activeMenu === "STANDINGS" && <Table />}
    </section>
  );
};

export default CountryLeague;
