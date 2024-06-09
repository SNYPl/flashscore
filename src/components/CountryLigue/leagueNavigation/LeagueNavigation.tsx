import React from "react";
import style from "./style.module.css";
import LeagueTitle from "./leagueTitle/LeagueTitle";
import LeagueMenu from "./menu/LeagueMenu";
import Todaymatches from "./todayMatches/Todaymatches";
import ParamInfo from "@/components/paramInfo/ParamInfo";
import LatestScores from "./latestScores/LatestScores";
import ScheduledMatches from "./scheduledMatches/ScheduledMatches";

const LeagueNavigation = () => {
  return (
    <section className={`${style.leagueNavigaion} flex flex-col`}>
      <div className="bg-white rounded-lg  mb-7">
        <div className="p-4 pb-0">
          <ParamInfo />
          <LeagueTitle />
        </div>
        <LeagueMenu />
      </div>
      <Todaymatches />
      <LatestScores />
      <ScheduledMatches />
    </section>
  );
};

export default LeagueNavigation;
