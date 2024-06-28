"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import LeagueNavigation from "./leagueNavigation/LeagueNavigation";
import Table from "./matches/Matches";
import Todaymatches from "./leagueNavigation/todayMatches/Todaymatches";
import LatestScores from "./leagueNavigation/latestScores/LatestScores";
import ScheduledMatches from "./leagueNavigation/scheduledMatches/ScheduledMatches";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";

const CountryLeague = () => {
  const [activeMenu, setActiveMenu] = useState("SUMMARY");
  const sportId = useSelector((state: any) => state.navigationReducer.sportId);
  const searchParams = useSearchParams();
  const leagueID = searchParams.get("leagueId");

  const resultMatchesOption = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/results",
    params: {
      locale: "en_INT",
      tournament_stage_id: leagueID,
      page: "1",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["matchesResults", sportId],
    async () => {
      try {
        const response = await axios.request(resultMatchesOption);
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    }
  );

  const scheduledMatchesOption = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures",
    params: {
      tournament_stage_id: leagueID,
      page: "1",
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const scheduledMatches = useQuery(["scheduledMatches", sportId], async () => {
    try {
      const response = await axios.request(scheduledMatchesOption);
      return response.data;
    } catch (error) {
      console.error("Error fetching scheduled events", error);
      throw new Error("Error fetching scheduled events");
    }
  });

  return (
    <section className={`${style.countryLeague}`}>
      <LeagueNavigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === "SUMMARY" && (
        <div>
          <Todaymatches />
          <LatestScores
            resultData={data?.DATA}
            sliceLength={4}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />
          <ScheduledMatches
            fixturesMatchData={scheduledMatches?.data?.DATA}
            sliceLength={10}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />
          <Table />
        </div>
      )}

      {activeMenu === "RESULTS" && (
        <LatestScores
          resultData={data?.DATA}
          sliceLength={data?.DATA.length}
          activeMenu={activeMenu}
        />
      )}
      {activeMenu === "FIXTURES" && (
        <ScheduledMatches
          fixturesMatchData={scheduledMatches.data.DATA}
          sliceLength={scheduledMatches?.data?.DATA.length}
          activeMenu={activeMenu}
        />
      )}
      {activeMenu === "STANDINGS" && <Table />}
    </section>
  );
};

export default CountryLeague;
