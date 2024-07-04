"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import LeagueNavigation from "./leagueNavigation/LeagueNavigation";
import Table from "./table/Table";
import Todaymatches from "./leagueNavigation/todayMatches/Todaymatches";
import LatestScores from "./leagueNavigation/latestScores/LatestScores";
import ScheduledMatches from "./leagueNavigation/scheduledMatches/ScheduledMatches";
import { useSelector } from "react-redux";
import axios, { isAxiosError } from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "antd";

const CountryLeague = () => {
  const [activeMenu, setActiveMenu] = useState("SUMMARY");
  const sportId = useSelector((state: any) => state.navigationReducer.sportId);
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("tournamentId");
  const seasonStageId = searchParams.get("seasonStageId");

  const resultMatchesOption = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/results",
    params: {
      locale: "en_INT",
      tournament_stage_id: seasonStageId,
      page: "1",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["matchesResults", sportId, seasonStageId],
    async () => {
        try {
          const response = await axios.request(resultMatchesOption).catch(error => {
            if (isAxiosError(error)) {
              switch (error.response?.status) {
                case 404:
  
                  return { data: { DATA:[]}  };
  
                default:
                  break;
              }
            }
  
            throw error;
          });;
          return response.data;
        } catch (error) {
          console.error("Error fetching result events", error);
          throw new Error("Error fetching result events");
        }
    },{
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!seasonStageId,
    }
  );

  const scheduledMatchesOption = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures",
    params: {
      tournament_stage_id: seasonStageId,
      page: "1",
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const scheduledMatches = useQuery(
    ["scheduledMatches", sportId, seasonStageId],
    async () => {

      try {
        const response = await axios.request(scheduledMatchesOption).catch(error => {
          if (isAxiosError(error)) {
            switch (error.response?.status) {
              case 404:

                return { data: { DATA:[]}  };

              default:
                break;
            }
          }

          throw error;
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching scheduled events", error);
        throw new Error("Error fetching scheduled events");
      }
    }
    , {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!seasonStageId,
  }

  );



  if (isLoading || scheduledMatches.isLoading) {
    return (
      <div className="p-5 ">
        <Skeleton />
      </div>
    );
  }


  return (
    <section className={`${style.countryLeague}`}>
      <LeagueNavigation
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {activeMenu === "SUMMARY" && (
        <div>
          <Todaymatches />


          { data?.DATA.length !==0 &&<LatestScores
            resultData={data?.DATA}
            sliceLength={4}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />}

          {  scheduledMatches?.data?.DATA.length !==0 && <ScheduledMatches
            fixturesMatchData={scheduledMatches?.data?.DATA}
            sliceLength={10}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />}

          <Table leagueId={seasonStageId} seasonId={seasonId} />
        </div>
      )}

      {activeMenu === "RESULTS" &&   (
        <LatestScores
          resultData={data?.DATA}
          sliceLength={data?.DATA?.EVENTS?.length}
          activeMenu={activeMenu}
        />
      )}


      {activeMenu === "FIXTURES"  && (
        <ScheduledMatches
          fixturesMatchData={scheduledMatches?.data?.DATA}
          sliceLength={scheduledMatches?.data?.DATA?.EVENTS?.length}
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
