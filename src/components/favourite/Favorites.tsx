"use client";
import React from "react";
import style from "./style.module.css";

import { useFavouriteLeagues } from "@/components/hooks/useFavouriteLeagues ";

import FavLeagues from "./favLeagues/FavLeagues";

const Favorites = () => {
  const { favouriteLeagues } = useFavouriteLeagues();

  return (
    <section
      className={`${style.favorites}    w-full`}
      suppressHydrationWarning
    >
      <article
        className={`bg-white rounded-lg  p-3 w-full `}
        suppressHydrationWarning
      >
        {favouriteLeagues?.map((eventMatch: any) => {
          const eventIds =
            eventMatch.stageIds.length !== 0 ? eventMatch.stageIds : [];

          return (
            <FavLeagues
              tournamentStageId={eventMatch.mainLeagueID}
              NAME1={eventMatch.leagueInfo.NAME1}
              NAME2={eventMatch.leagueInfo.NAME2}
              url={eventMatch.leagueInfo.url}
              events={eventIds}
              countryId={eventMatch.leagueInfo.countryId}
              tournamentId={eventMatch.tournamentStageId}
              key={eventMatch.mainLeagueID}
              sportHref={eventMatch.leagueInfo.sportHref}
              countryName={eventMatch.COUNTRY_NAME}
              ShowFullDate={true}
              showMatchesDefault={true}
            />
          );
        })}
      </article>
    </section>
  );
};

export default Favorites;
