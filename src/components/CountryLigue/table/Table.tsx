"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import MatchesMenu from "./matchesMenu/MatchesMenu";
import StandingTable from "./standingTable/StandingTable";
import FormTable from "./formTable/FormTable";
import TopScoresTable from "./topScoresTable/TopScores";

const Matches = ({
  leagueId,
  seasonId,
}: {
  leagueId: string | null;
  seasonId: string | null;
}) => {
  const [apiMenuRequest, setApiMenuRequest] = useState("overall");
  const [activeMenu, setActiveMenu] = useState("STANDINGS");

  // console.log(leagueId);
  // console.log(seasonId);

  //DRAW COMPONENT

  return (
    <section className={`${style.matches} bg-white p-4 rounded-xl`}>
      <MatchesMenu
        setApiMenuRequest={setApiMenuRequest}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {activeMenu === "STANDINGS" && (
        <StandingTable
          setApiMenuRequest={setApiMenuRequest}
          apiMenuRequest={apiMenuRequest}
          seasonId={seasonId}
          leagueId={leagueId}
        />
      )}

      {activeMenu === "FORM" && (
        <FormTable
          setApiMenuRequest={setApiMenuRequest}
          apiMenuRequest={apiMenuRequest}
          seasonId={seasonId}
          leagueId={leagueId}
        />
      )}

      {activeMenu === "TOP SCORES" && (
        <TopScoresTable
          setApiMenuRequest={setApiMenuRequest}
          apiMenuRequest={apiMenuRequest}
          seasonId={seasonId}
          leagueId={leagueId}
        />
      )}
    </section>
  );
};

export default Matches;
