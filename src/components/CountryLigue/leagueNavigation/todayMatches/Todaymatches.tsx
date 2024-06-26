import React from "react";
import style from "./style.module.css";
import { LeagueMatch } from "@/components/matchLeague/LeagueMatch";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import League from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";
import { useSearchParams } from "next/navigation";

const Todaymatches: React.FC = ({}) => {
  const sportId = useSelector((state: any) => state.navigationReducer.sportId);
  const searchParams = useSearchParams();

  const tournamentId = searchParams.get("tournamentId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/list",
    params: {
      sport_id: sportId,
      indent_days: "1",
      locale: "en_INT",
      timezone: "4",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["todayMatches", sportId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  const currentLeague = data?.DATA.filter(
    (el: any) => el.TOURNAMENT_ID === tournamentId
  );

  if (currentLeague.length === 0 && !isLoading) {
    return <div></div>;
  }

  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Todays Matches</h2>

      {currentLeague?.map((eventMatch: any) => {
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
          />
        );
      })}
    </section>
  );
};

export default Todaymatches;
