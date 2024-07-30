import React from "react";
import style from "./style.module.css";
import CountryLeagueEvents from "../../countryLeagueEvents/CountryLeagueEvents";

const ScheduledMatches = ({
  fixturesMatchData,
  sliceLength,
  setActiveMenu,
  activeMenu,
}: {
  fixturesMatchData: any;
  sliceLength: number | undefined;
  setActiveMenu?: any;
  activeMenu: string;
}) => {
  if (activeMenu === "FIXTURES" && fixturesMatchData?.EVENTS?.length === 0) {
    return (
      <div>
        <p>ინფორმაცია არ არის</p>
      </div>
    );
  }

  if (!fixturesMatchData) {
    return <div></div>;
  }

  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Scheduled</h2>

      <CountryLeagueEvents
        tournamentStageId={fixturesMatchData.TOURNAMENT_STAGE_ID}
        NAME1={fixturesMatchData.NAME_PART_1}
        NAME2={fixturesMatchData.NAME_PART_2}
        url={fixturesMatchData.URL}
        events={fixturesMatchData.EVENTS.slice(0, sliceLength)}
        countryId={fixturesMatchData.COUNTRY_ID}
        tournamentId={fixturesMatchData.TOURNAMENT_ID}
        key={fixturesMatchData.TOURNAMENT_STAGE_ID}
        countryName={fixturesMatchData.COUNTRY_NAME}
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
