"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import {
  EmptyFavouriteStarIcon,
  FavouriteStartIcon,
  LeagueArrowIcon,
} from "@/common/svg/home";
import Image from "next/image";
import Match from "./match/Match";
import { countries } from "@/lib/countriesList";
import Flag from "react-world-flags";
import { useFavouriteLeagues } from "@/components/hooks/useFavouriteLeagues ";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";

interface leagueProps {
  tournamentStageId: string;
  NAME1: string;
  NAME2: string;
  url: string;
  events: any[];
  countryId: number;
  tournamentId: string;
  countryName: string;
  showMatchesDefault?: boolean;
}

const MatchLeague: React.FC<leagueProps> = ({
  NAME1,
  NAME2,
  countryId,
  events,
  tournamentStageId,
  tournamentId,
  countryName,
  url,
  showMatchesDefault = false,
}) => {
  const [showMatches, setShowMatches] = useState(showMatchesDefault);

  const currentCountryIcon = countries.filter((el) => el.name === countryName);
  const [countryObject] = currentCountryIcon;

  const { favouriteLeagues, addToFavourite } = useFavouriteLeagues();

  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();

  //     // Handle adding/removing a single event
  //     const existingLeague = favouriteEvents.find(
  //       (fav) => fav.mainLeagueID === tournamentId
  //     );

  //     if (existingLeague) {
  //       // Update the existing league with the new event
  //       const updatedEvents = existingLeague.eventsId.includes(eventId)
  //         ? existingLeague.eventsId.filter((id) => id !== eventId) // Remove event if it exists
  //         : [...existingLeague.eventsId, eventId]; // Add event if it doesn't exist

  //       // If updatedEvents is empty, remove the league from favourites
  //       if (updatedEvents.length === 0) {
  //         setFavouriteEvents(
  //           favouriteEvents.filter((fav) => fav.mainLeagueID !== tournamentId)
  //         );
  //       } else {
  //         setFavouriteEvents(
  //           favouriteEvents.map((fav) =>
  //             fav.mainLeagueID === tournamentId
  //               ? { ...fav, eventsId: updatedEvents }
  //               : fav
  //           )
  //         );
  //       }
  //     } else {
  //       // Add a new league with the single event
  //       setFavouriteEvents([
  //         ...favouriteEvents,
  //         { mainLeagueID: tournamentId, eventsId: [eventId] },
  //       ]);
  //     }
  //   } else {
  //     // Handle adding/removing all events
  //     const eventIds = events.map((event) => event.EVENT_ID);
  //     const existingLeague = favouriteEvents.find(
  //       (fav) => fav.mainLeagueID === tournamentId
  //     );

  //     if (existingLeague) {
  //       // If all events are already in the list, remove them; otherwise, add all events
  //       const allEventsIncluded = eventIds.every((id) =>
  //         existingLeague.eventsId.includes(id)
  //       );

  //       if (allEventsIncluded) {
  //         // Remove all events from the existing league
  //         setFavouriteEvents(
  //           favouriteEvents.filter((fav) => fav.mainLeagueID !== tournamentId)
  //         );
  //       } else {
  //         // Add all events to the existing league
  //         setFavouriteEvents(
  //           favouriteEvents.map((fav) =>
  //             fav.mainLeagueID === tournamentId
  //               ? { ...fav, eventsId: eventIds }
  //               : fav
  //           )
  //         );
  //       }
  //     } else {
  //       // Add a new league with all events
  //       setFavouriteEvents([
  //         ...favouriteEvents,
  //         { mainLeagueID: tournamentId, eventsId: eventIds },
  //       ]);
  //     }
  //   }
  // };

  const isFavorited = (tournamentId: string, eventIds?: string[]): boolean => {
    const favoriteLeague = favouriteLeagues.find(
      (el) => el.mainLeagueID === tournamentId
    );

    if (favoriteLeague) {
      return true;
    }

    return false;
  };

  const isLeagueFavorited = isFavorited(tournamentId);

  const newUrl = `${url}?name=${NAME2}&tournamentId=${tournamentId}&countryId=${countryId}`;

  return (
    <section className={``}>
      <article className="mb-1">
        <div className={`flex justify-between ${style.premierTitle} p-2`}>
          <div className={`flex items-center `}>
            <div
              className={`mr-3 cursor-pointer ${style.starIcon} ${
                isLeagueFavorited ? style.favorited : ""
              }`}
              onClick={() =>
                addToFavourite(tournamentId, events, {
                  NAME1,
                  NAME2,
                  url,
                  countryId,
                  countryName,
                })
              }
            >
              <EmptyFavouriteStarIcon />
            </div>

            {countryObject ? (
              <Flag
                code={countryObject?.countryCode}
                style={{ width: "18px", height: "13px" }}
              />
            ) : (
              <Image
                src="/images/match/world.png"
                alt="flag"
                width={18}
                height={13}
                className="max-w-none max-h-none h-3"
              />
            )}
            <h2 className="ml-2">{NAME1}:</h2>
            <Link href={newUrl} className="mr-2">
              {NAME2}
            </Link>
            <div
              className={`${style.pinImage} ${
                pinnedLeagueIds.includes(tournamentId) ? style.pinActive : ""
              }`}
              onClick={() => addLeagueToLocalStorage(tournamentId)}
            >
              <Image
                src={`/images/match/${
                  !pinnedLeagueIds.includes(tournamentId) ? "pin" : "pinActive"
                }.svg`}
                alt="pin"
                width={14}
                height={18}
              />
            </div>
          </div>
          <button
            onClick={() => setShowMatches(!showMatches)}
            className={`flex items-center gap-x-2 ${style.showMatchesBtn}`}
          >
            {!showMatches ? (
              <span className={`${style.displayText}`}>
                Display Matches ({events.length})
              </span>
            ) : (
              <span className={`${style.standings}`}>Standings</span>
            )}
            <span
              className={`${style.arrowIconBtn} ${
                showMatches ? style.arrowIconRotate : ""
              }`}
            >
              <LeagueArrowIcon />
            </span>
          </button>
        </div>
        <article
          className={`${showMatches ? style.showMatcher : "hidden"} mb-5`}
        >
          {events?.map((match, index) => {
            const eventInfo = {
              awayTeam: match.AWAY_NAME,
              awayImage: match.AWAY_IMAGES,
              homeImage: match.HOME_IMAGES,
              homeTeam: match.HOME_NAME,
              homeScore: match.HOME_SCORE_CURRENT,
              awayScore: match.AWAY_SCORE_CURRENT,
              status: match.STAGE,
              time: match.START_TIME,
            };

            return (
              <Match
                key={match.EVENT_ID}
                awayTeam={match.AWAY_NAME}
                awayImage={match.AWAY_IMAGES}
                homeImage={match.HOME_IMAGES}
                homeTeam={match.HOME_NAME}
                homeScore={match.HOME_SCORE_CURRENT}
                awayScore={match.AWAY_SCORE_CURRENT}
                status={match.STAGE}
                showMatches={showMatches}
                time={match.START_TIME}
                id={match.EVENT_ID}
                addToFavourite={() =>
                  addToFavourite(
                    tournamentId,
                    events,
                    { NAME1, NAME2, url, countryId, countryName },
                    match.EVENT_ID,
                    eventInfo
                  )
                }
                isFavouritedEvent={favouriteLeagues}
                tournamentId={tournamentId}
              />
            );
          })}
        </article>
      </article>
    </section>
  );
};

export default MatchLeague;
