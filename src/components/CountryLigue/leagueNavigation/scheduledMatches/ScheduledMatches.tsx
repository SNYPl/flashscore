import React from "react";
import style from "./style.module.css";

import League from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";

const ScheduledMatches = ({
  fixturesMatchData,
  sliceLength,
  setActiveMenu,
  activeMenu,
}: {
  fixturesMatchData: any[];
  sliceLength: number;
  setActiveMenu?: any;
  activeMenu: string;
}) => {

  
  
  if(activeMenu==="FIXTURES" && fixturesMatchData?.length ===0) {
    return <div><p>ინფორმაცია არ არის</p></div>
  }  


  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Scheduled</h2>

      {fixturesMatchData?.map((eventMatch: any) => {
        return (
          <League
            tournamentStageId={eventMatch.TOURNAMENT_STAGE_ID}
            NAME1={eventMatch.NAME_PART_1}
            NAME2={eventMatch.NAME_PART_2}
            url={eventMatch.URL}
            events={eventMatch.EVENTS.slice(0, sliceLength)}
            countryId={eventMatch.COUNTRY_ID}
            tournamentId={eventMatch.TOURNAMENT_ID}
            key={eventMatch.TOURNAMENT_STAGE_ID}
            countryName={eventMatch.COUNTRY_NAME}
            showMatchesDefault={true}
          />
        );
      })}

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
