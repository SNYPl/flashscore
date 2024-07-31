"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { Select, Skeleton, Space } from "antd";
import League from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";
import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";

const ResultMatches = () => {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const sportIdCheck = searchParams.get("sportId");

  function mergeLeagues(leagues: any[]) {
    const mergedLeagues: any = [];

    leagues.forEach((league) => {
      const existingLeague = mergedLeagues.find(
        (l: any) => l.NAME === league.NAME
      );

      if (existingLeague) {
        existingLeague.EVENTS = existingLeague.EVENTS.concat(league.EVENTS);
      } else {
        mergedLeagues.push({ ...league });
      }
    });

    // Sort the EVENTS array within each league by START_TIME
    mergedLeagues.forEach((league: any) => {
      league.EVENTS.sort((a: any, b: any) => b.START_TIME - a.START_TIME);
    });

    return mergedLeagues;
  }

  const allCompetentiosnObjects = {
    value: "All Competitions",
    label: "All Competitions",
  };

  const [competitionsFilter, setCompetitionsFilter] = useState(
    allCompetentiosnObjects.value
  );

  const resultEvents = (page: any) => ({
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/teams/results",
    params: {
      sport_id: sportIdCheck,
      team_id: teamId,
      page: page.toString(),
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  });

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["clubResultEvents", teamId, sportIdCheck],
    async () => {
      try {
        const responses = await Promise.all([
          axios.request(resultEvents(1)),
          axios.request(resultEvents(2)),
          axios.request(resultEvents(3)),
        ]);
        const data = responses.map((response) => response.data);
        const combinedData = data.flat();

        const mergedObject = combinedData.reduce(
          (acc, current) => {
            acc.DATA = [...acc.DATA, ...current.DATA];

            return acc;
          },
          { DATA: [] }
        );

        return mergedObject;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    }
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton />
      </div>
    );
  }

  const mergedLeagues = mergeLeagues(data?.DATA);

  const leagueNameOptions = mergedLeagues.map((el: any) => {
    return {
      value: el.NAME,
      label: el.NAME,
    };
  });

  const handleChange = (value: string) => {
    setCompetitionsFilter(() => value);
  };

  const filteredLeagues = mergedLeagues.filter((el: any) => {
    if (competitionsFilter === "All Competitions") return el;
    return el.NAME === competitionsFilter;
  });

  return (
    <article className={`${style.clubmatches} bg-white rounded-lg py-4`}>
      <div className="w-full mb-4">
        <Space wrap className={style.selector} style={{ width: "100%" }}>
          <Select
            defaultValue="All Competitions"
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[allCompetentiosnObjects, ...leagueNameOptions]}
            className={style.selector}
          />
        </Space>
      </div>

      <div className="mt-5">
        {filteredLeagues?.map((eventMatch: any, id: number) => {
          return (
            <League
              tournamentStageId={eventMatch.TOURNAMENT_STAGE_ID}
              NAME1={eventMatch.NAME_PART_1}
              NAME2={eventMatch.NAME_PART_2}
              url={eventMatch.URL}
              events={eventMatch.EVENTS}
              countryId={eventMatch.COUNTRY_ID}
              tournamentId={eventMatch.TOURNAMENT_ID}
              key={id}
              countryName={eventMatch.COUNTRY_NAME}
              showMatchesDefault={true}
              ShowFullDate={true}
            />
          );
        })}
      </div>
    </article>
  );
};

export default ResultMatches;
