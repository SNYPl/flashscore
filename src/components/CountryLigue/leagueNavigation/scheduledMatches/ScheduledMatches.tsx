import React from "react";
import style from "./style.module.css";
import CountryLeagueEvents from "../../countryLeagueEvents/CountryLeagueEvents";
import { Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { IoFootballOutline } from "react-icons/io5";

const ScheduledMatches = ({
  setActiveMenu,
  activeMenu,
  pages,
}: {
  setActiveMenu?: any;
  activeMenu: string;
  pages: number;
}) => {
  const sportId = useSelector((state: any) => state.navigationReducer.sportId);
  const searchParams = useSearchParams();
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

  const { data, isLoading, isError, isFetched } = useQuery(
    ["scheduledMatches", sportId, seasonStageId],
    async () => {
      try {
        // Array to hold successful responses
        const successfulResponses: any[] = [];

        // List of request promises
        const requests = Array.from({ length: pages }, (_, index) =>
          (async () => {
            try {
              const response = await axios.request(
                shcheduledMatches(index + 1)
              );
              if (response.data?.DATA) {
                successfulResponses.push(response.data.DATA);
              }
            } catch (error) {
              console.error(
                `Error fetching data for page ${index + 1}:`,
                error
              );
              // Continue to the next request
            }
          })()
        );

        // Wait for all requests to complete
        await Promise.all(requests);

        // Ensure there is data to process
        if (successfulResponses.length === 0) {
          throw new Error("No data received from any requests");
        }

        // Combine the successful data
        const combinedData = successfulResponses.flat();

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

  if (isLoading) {
    return (
      <div className="p-5 ">
        <Skeleton />
      </div>
    );
  }

  if (activeMenu === "FIXTURES" && data?.EVENTS?.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col">
        <IoFootballOutline
          style={{ fontSize: "80px", color: "var(--match-league-title-color)" }}
        />
        <p
          style={{ color: "var(--black-color)", fontSize: "13px" }}
          className="mt-3"
        >
          No matches found
        </p>
      </div>
    );
  }

  const extractRoundNumber = (roundString: any) => {
    return parseInt(roundString.split(" ")[1]);
  };

  // Sort the array based on the round number
  const sortedRoundsArray = data?.EVENTS?.sort((a: any, b: any) => {
    return extractRoundNumber(a.round) - extractRoundNumber(b.round);
  });

  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Scheduled</h2>

      <CountryLeagueEvents
        tournamentStageId={data?.TOURNAMENT_STAGE_ID}
        NAME1={data?.NAME_PART_1}
        NAME2={data?.NAME_PART_2}
        url={data?.URL}
        events={sortedRoundsArray || []}
        countryId={data?.COUNTRY_ID}
        tournamentId={data?.TOURNAMENT_ID}
        key={data?.TOURNAMENT_STAGE_ID}
        countryName={data?.COUNTRY_NAME}
        showMatchesDefault={true}
        ShowFullDate={true}
        ShowFullDateHour={true}
        setActiveMenu={setActiveMenu}
      />

      {activeMenu !== "FIXTURES" && (
        <div
          className={style.moreMatches}
          onClick={() => setActiveMenu("FIXTURES")}
        >
          <button>Show More Matches</button>
        </div>
      )}
    </section>
  );
};

export default ScheduledMatches;
