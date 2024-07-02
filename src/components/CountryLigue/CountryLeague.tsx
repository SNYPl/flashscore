"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import LeagueNavigation from "./leagueNavigation/LeagueNavigation";
import Table from "./table/Table";
import Todaymatches from "./leagueNavigation/todayMatches/Todaymatches";
import LatestScores from "./leagueNavigation/latestScores/LatestScores";
import ScheduledMatches from "./leagueNavigation/scheduledMatches/ScheduledMatches";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "antd";

const CountryLeague = () => {
  const [activeMenu, setActiveMenu] = useState("SUMMARY");
  const sportId = useSelector((state: any) => state.navigationReducer.sportId);
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("tournamentId");
  const [leagueId, setLeagueId] = useState("");

  const resultMatchesOption = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/results",
    params: {
      locale: "en_INT",
      tournament_stage_id: leagueId,
      page: "1",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["matchesResults", sportId, leagueId],
    async () => {
      if (leagueId) {
        try {
          const response = await axios.request(resultMatchesOption);
          return response.data;
        } catch (error) {
          console.error("Error fetching result events", error);
          throw new Error("Error fetching result events");
        }
      }
    }
  );

  const scheduledMatchesOption = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures",
    params: {
      tournament_stage_id: leagueId,
      page: "1",
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const scheduledMatches = useQuery(
    ["scheduledMatches", sportId, leagueId],
    async () => {
      if (leagueId) {
        try {
          const response = await axios.request(scheduledMatchesOption);
          return response.data;
        } catch (error) {
          console.error("Error fetching scheduled events", error);
          throw new Error("Error fetching scheduled events");
        }
      }
    }
  );

  if (isLoading) {
    <div className="p-5 w-full">
      <Skeleton />
    </div>;
  }

  return (
    <section className={`${style.countryLeague}`}>
      <LeagueNavigation
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setLeagueId={setLeagueId}
      />

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
          <Table leagueId={leagueId} seasonId={seasonId} />
        </div>
      )}

      {activeMenu === "RESULTS" && (
        <LatestScores
          resultData={data?.DATA}
          sliceLength={data?.DATA?.EVENTS?.length}
          activeMenu={activeMenu}
        />
      )}
      {activeMenu === "FIXTURES" && (
        <ScheduledMatches
          fixturesMatchData={scheduledMatches.data.DATA}
          sliceLength={scheduledMatches?.data?.DATA?.EVENTS?.length}
          activeMenu={activeMenu}
        />
      )}
      {activeMenu === "STANDINGS" && (
        <Table leagueId={leagueId} seasonId={seasonId} />
      )}
    </section>
  );
};

export default CountryLeague;
