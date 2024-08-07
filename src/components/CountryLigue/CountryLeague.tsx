"use client";
import React, { useState } from "react";
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
  const seasonStageId = searchParams.get("seasonStageId");

  const shcheduledMatches = (page: any) => ({
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures",
    params: {
      tournament_stage_id: seasonStageId,
      page: page.toString(),
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  });

  // const scheduledMatchesOption = {
  //   method: "GET",
  //   url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures",
  //   params: {
  //     tournament_stage_id: seasonStageId,
  //     page: "1",
  //     locale: "en_INT",
  //   },
  //   headers: {
  //     "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
  //     "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
  //   },
  // };

  const scheduledMatches = useQuery(
    ["scheduledMatches", sportId, seasonStageId],
    async () => {
      try {
        // Array to hold successful responses
        const successfulResponses: any[] = [];

        // List of request promises
        const requests = [1, 2, 3].map(async (id) => {
          try {
            const response = await axios.request(shcheduledMatches(id));
            if (response.data?.DATA) {
              successfulResponses.push(response.data.DATA);
            }
          } catch (error) {
            console.error(`Error fetching data for id ${id}:`, error);
            // Continue to the next request
          }
        });

        // Wait for all requests to complete
        await Promise.all(requests);

        // Combine the successful data
        const combinedData = successfulResponses.flat();

        if (combinedData.length === 0) {
          throw new Error("No data received from any requests");
        }

        // Assuming the first item has the common league information
        const leagueInfo = {
          CATEGORY_NAME: combinedData[0].CATEGORY_NAME,
          COUNTRY_ID: combinedData[0].COUNTRY_ID,
          COUNTRY_NAME: combinedData[0].COUNTRY_NAME,
          NAME: combinedData[0].NAME,
          NAME_PART_1: combinedData[0].NAME_PART_1,
          NAME_PART_2: combinedData[0].NAME_PART_2,
          TOURNAMENT_ID: combinedData[0].TOURNAMENT_ID,
          TOURNAMENT_IMAGE: combinedData[0].TOURNAMENT_IMAGE,
          TOURNAMENT_SEASON_ID: combinedData[0].TOURNAMENT_SEASON_ID,
          TOURNAMENT_STAGE_ID: combinedData[0].TOURNAMENT_STAGE_ID,
          TOURNAMENT_STAGE_TYPE: combinedData[0].TOURNAMENT_STAGE_TYPE,
          URL: combinedData[0].URL,
        };

        // Combine and group events by their round
        const eventsByRoundObject = combinedData
          .flatMap((dataItem) => dataItem.EVENTS)
          .reduce((acc, event) => {
            const round = event.ROUND || "Unknown Round";
            if (!acc[round]) {
              acc[round] = [];
            }
            acc[round].push(event);
            return acc;
          }, {});

        // Transform the eventsByRoundObject into an array of objects
        const eventsByRound = Object.keys(eventsByRoundObject).map((round) => ({
          round,
          events: eventsByRoundObject[round],
        }));

        // Create the final combined object
        const finalData = {
          ...leagueInfo,
          EVENTS: eventsByRound,
        };

        return finalData;
      } catch (error) {
        console.error("Error fetching scheduled events:", error);
        throw new Error("Error fetching scheduled events");
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!seasonStageId,
    }
  );

  if (scheduledMatches.isLoading) {
    return (
      <div className="p-5 ">
        <Skeleton />
      </div>
    );
  }

  return (
    <section className={`${style.countryLeague}`}>
      <LeagueNavigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === "SUMMARY" && (
        <div>
          <Todaymatches />

          <LatestScores
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
            pages={1}
          />

          <ScheduledMatches
            fixturesMatchData={scheduledMatches?.data}
            sliceLength={2}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />

          <Table leagueId={seasonStageId} seasonId={seasonId} />
        </div>
      )}

      {activeMenu === "RESULTS" && (
        <LatestScores activeMenu={activeMenu} pages={4} />
      )}

      {activeMenu === "FIXTURES" && (
        <ScheduledMatches
          fixturesMatchData={scheduledMatches?.data}
          sliceLength={scheduledMatches?.data?.EVENTS?.length}
          activeMenu={activeMenu}
        />
      )}

      {activeMenu === "STANDINGS" && (
        <Table leagueId={seasonStageId} seasonId={seasonId} />
      )}
    </section>
  );
};

export default CountryLeague;
