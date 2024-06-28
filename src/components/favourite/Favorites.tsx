"use client";
import React from "react";
import style from "./style.module.css";

import { usePathname } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { useFavouriteLeagues } from "@/components/hooks/useFavouriteLeagues ";

import League from "../allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";

interface FavouriteLeague {
  mainLeagueID: string;
  eventsId: string[];
}

const Favorites = () => {
  const { favouriteLeagues, addToFavourite } = useFavouriteLeagues();

  const transformEventArray = (events: any) => {
    return events.map((event: any) => {
      let transformedEvent = {
        EVENT_ID: event.eventId,
        AWAY_IMAGES: event.eventInfo.awayImage,
        AWAY_SCORE_CURRENT: event.eventInfo.awayScore,
        AWAY_NAME: event.eventInfo.awayTeam,
        HOME_IMAGES: event.eventInfo.homeImage,
        HOME_SCORE_CURRENT: event.eventInfo.homeScore,
        HOME_NAME: event.eventInfo.homeTeam,
        STAGE: event.eventInfo.status,
        START_TIME: event.eventInfo.time,
      };

      return transformedEvent;
    });
  };

  return (
    <section className={`${style.favorites}    w-full`}>
      <div className={`bg-white rounded-lg  p-3 w-full `}>
        {favouriteLeagues?.map((eventMatch: any) => {
          const transformedEvents = transformEventArray(eventMatch.events);
          console.log(transformedEvents);
          return (
            <League
              tournamentStageId={eventMatch.mainLeagueID}
              NAME1={eventMatch.leagueInfo.NAME1}
              NAME2={eventMatch.leagueInfo.NAME2}
              url={eventMatch.leagueInfo.url}
              events={transformedEvents}
              countryId={eventMatch.leagueInfo.countryId}
              tournamentId={eventMatch.mainLeagueID}
              key={eventMatch.mainLeagueID}
              countryName={eventMatch.COUNTRY_NAME}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Favorites;
