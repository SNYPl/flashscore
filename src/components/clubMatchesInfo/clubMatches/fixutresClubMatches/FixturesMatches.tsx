"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { Select, Skeleton, Space } from "antd";
import League from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";
import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";

const FixturesMatches = () => {
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
      league.EVENTS.sort((a: any, b: any) => a.START_TIME - b.START_TIME);
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

  const fixturesEvents = (page: any) => ({
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/teams/fixtures",
    params: {
      team_id: teamId,
      locale: "en_INT",
      sport_id: sportIdCheck,
      page: page.toString(),
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  });

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["clubFixturesEvents", teamId, sportIdCheck],
    async () => {
      try {
        const responses = await Promise.all([
          axios.request(fixturesEvents(1)),
          axios.request(fixturesEvents(2)),
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
    if (el.NAME === competitionsFilter) {
      return el;
    }
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
        {filteredLeagues?.map((eventMatch: any) => {
          return (
            <League
              tournamentStageId={eventMatch.TOURNAMENT_STAGE_ID}
              NAME1={eventMatch.NAME_PART_1}
              NAME2={eventMatch.NAME_PART_2}
              url={eventMatch.URL}
              events={eventMatch.EVENTS}
              countryId={eventMatch.COUNTRY_ID}
              tournamentId={eventMatch.TOURNAMENT_ID}
              key={eventMatch.TOURNAMENT_STAGE_ID}
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

export default FixturesMatches;
