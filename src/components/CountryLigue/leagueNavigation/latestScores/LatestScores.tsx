import React from "react";
import style from "./style.module.css";

import League from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";

const LatestScores = ({
  resultData,
  sliceLength,
  setActiveMenu,
  activeMenu,
}: {
  resultData: any[];
  sliceLength: number;
  setActiveMenu?: any;
  activeMenu: string;
}) => {
  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Latest Scores</h2>

      {resultData?.slice(0, sliceLength).map((eventMatch: any) => {
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

      {activeMenu !== "RESULTS" && (
        <div
          className={style.moreMatches}
          onClick={() => setActiveMenu("RESULTS")}
        >
          <button>Show More Matches</button>
        </div>
      )}
    </section>
  );
};

export default LatestScores;
