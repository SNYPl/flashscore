"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import MatchesMenu from "./matchesMenu/MatchesMenu";
import StandingTable from "./standingTable/StandingTable";
import FormTable from "./formTable/FormTable";
import TopScoresTable from "./topScoresTable/TopScores";
import DrawTable from "./drawTable/DrawTable";
import axios from "axios";
import { useQuery } from "react-query";

const Matches = ({
  leagueId,
  seasonId,
}: {
  leagueId: string | null;
  seasonId: string | null;
}) => {
  const [apiMenuRequest, setApiMenuRequest] = useState("overall");
  const [activeMenu, setActiveMenu] = useState("STANDINGS");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/data",
    params: {
      tournament_season_id: seasonId,
      standing_type: "draw",
      locale: "en_INT",
      tournament_stage_id: leagueId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["drawInfo", leagueId, seasonId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching draw table", error);
        throw new Error("Error fetching draw table");
      }
    },
    {
      retry: false,
    }
  );

  console.log(data);

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
      {activeMenu === "DRAW" && <DrawTable />}
      {/* <DrawTable /> */}
    </section>
  );
};

export default Matches;
