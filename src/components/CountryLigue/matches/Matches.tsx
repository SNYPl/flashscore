"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import MatchesMenu from "./matchesMenu/MatchesMenu";
import MatchesInfo from "./matchesInfo/MatchesInfo";
import MatchesInfoTips from "./matchesInfo/matchesInfoTip/MatchesInfoTips";
import { useQuery } from "react-query";
import axios from "axios";

const Matches = ({
  leagueId,
  seasonId,
}: {
  leagueId: string;
  seasonId: string | null;
}) => {
  const [activeMenu, setActiveMenu] = useState("STANDINGS");
  const [tableMenu, setTableMenu] = useState("OVERALL");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings",
    params: {
      tournament_season_id: seasonId,
      standing_type: tableMenu.toLowerCase(),
      locale: "en_INT",
      tournament_stage_id: leagueId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["matchTable", seasonId, leagueId, tableMenu],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching table data ", error);
        throw new Error("Error fetching table data");
      }
    }
  );

  console.log(data);

  return (
    <section className={`${style.matches} bg-white p-4 rounded-xl`}>
      <MatchesMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <MatchesInfo
        tableMenu={tableMenu}
        setTableMenu={setTableMenu}
        data={data?.DATA}
      />
      <MatchesInfoTips />
      <p className={style.infoText}>
        If teams finish on equal points at the end of the season, score
        difference will be the tie-breaker.
      </p>
    </section>
  );
};

export default Matches;
