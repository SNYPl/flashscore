import React from "react";
import League from "./matchLeague/MatchLeague";
import { useSelector } from "react-redux";

interface matchProps {
  selectedMatchNav: string;
  data: any;
}

const MatchLists: React.FC<matchProps> = ({ selectedMatchNav, data }) => {
  // if (!allMatch?.DATA || !Array.isArray(allMatch.DATA)) {
  //   return <div>No matches available</div>;
  // }

  const filterEvents = (events: any[]) => {
    switch (selectedMatchNav) {
      case "LIVE":
        return events.filter((event) => event.STAGE === "LIVE");
      case "ODDS":
        return events.filter((event) => event.STAGE === "ODDS");
      case "FINISHED":
        return events.filter(
          (event) => event.STAGE === "FINISHED" || event.STAGE === "AWARDED"
        );
      case "SCHEDULED":
        return events.filter((event) => event.STAGE === "SCHEDULED");
      case "ALL":
      default:
        return events;
    }
  };

  const filteredMatchData = data?.DATA?.map((matchData: any) => {
    const filteredEvents = filterEvents(matchData.EVENTS);
    return { ...matchData, EVENTS: filteredEvents };
  }).filter((matchData: any) => matchData.EVENTS.length > 0);

  return (
    <section className={` mt-5`}>
      {filteredMatchData?.map((eventMatch: any) => {
        if (eventMatch.CATEGORY_NAME === "Africa") {
          console.log(eventMatch);
        }
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
          />
        );
      })}
    </section>
  );
};

export default MatchLists;
