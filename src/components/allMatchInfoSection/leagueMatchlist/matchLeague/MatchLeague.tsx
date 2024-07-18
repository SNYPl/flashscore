"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { EmptyFavouriteStarIcon, LeagueArrowIcon } from "@/common/svg/home";
import Image from "next/image";
import Match from "./match/Match";
import { countries } from "@/lib/countriesList";
import Flag from "react-world-flags";
import {
  useFavouriteLeagues,
  isFavoritedLeague,
} from "@/components/hooks/useFavouriteLeagues ";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

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
  ShowFullDate?: boolean;
}

const MatchLeague: React.FC<leagueProps> = ({
  NAME1,
  NAME2,
  countryId,
  events,
  tournamentStageId,
  ShowFullDate = false,
  tournamentId,
  countryName,
  url,
  showMatchesDefault = false,
}) => {
  const [showMatches, setShowMatches] = useState(showMatchesDefault);

  const currentCountryIcon = countries.filter((el) => el.name === countryName);
  const [countryObject] = currentCountryIcon;

  const { favouriteLeagues, addToFavourite } = useFavouriteLeagues();

  const sportIdCheck = useSportIdHandler();

  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();

  const isLeagueFavorited = isFavoritedLeague(tournamentId, favouriteLeagues);

  const newUrl = `${url}?seasonStageId=${tournamentStageId}&name=${NAME2}&tournamentId=${tournamentId}`;

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
                addToFavourite(
                  tournamentId,
                  events,
                  {
                    NAME1,
                    NAME2,
                    url,
                    countryId,
                    countryName,
                    sportHref: sportIdCheck?.href,
                  },
                  tournamentStageId,
                  undefined
                )
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
                ShowFullDate={ShowFullDate}
                time={match.START_TIME}
                id={match.EVENT_ID}
                addToFavourite={() =>
                  addToFavourite(
                    tournamentId,
                    events,
                    {
                      NAME1,
                      NAME2,
                      url,
                      countryId,
                      countryName,
                      sportHref: sportIdCheck?.href,
                    },
                    tournamentStageId,
                    match.EVENT_ID
                  )
                }
                sportId={sportIdCheck}
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
