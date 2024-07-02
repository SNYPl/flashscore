"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import MatchesMenu from "./matchesMenu/MatchesMenu";
import StandingTable from "./standingTable/StandingTable";
import FormTable from "./formTable/FormTable";
import TopScoresTable from "./topScoresTable/TopScores";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const Matches = ({
  leagueId,
  seasonId,
}: {
  leagueId: string;
  seasonId: string | null;
}) => {
  const [apiMenuRequest, setApiMenuRequest] = useState("overall");
  const [activeMenu, setActiveMenu] = useState("STANDINGS");

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
