import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { Live } from "@/common/svg/match";
import {
  isFavoriteEvent,
  useFavouriteLeagues,
} from "@/components/hooks/useFavouriteLeagues ";
import { EmptyFavouriteStarIcon } from "@/common/svg/home";
import { countries } from "@/lib/countriesList";

interface props {
  data: any;
  tournamentData: any;
}

const TeamInfo: React.FC<props> = ({ data, tournamentData }) => {
  const START_TIME = data?.START_TIME;
  const sportIdCheck = useSportIdHandler();
  const date = new Date(START_TIME * 1000);
  const { favouriteLeagues, addToFavourite } = useFavouriteLeagues();

  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  const [homeTeamId] = data?.HOME_PARTICIPANT_IDS;
  const [awayTeamId] = data?.AWAY_PARTICIPANT_IDS;

  const currentLeagueStageIds = favouriteLeagues.find(
    (el) => el.tournamentStageId === tournamentData.TOURNAMENT_STAGE_ID
  )?.stageIds;

  const currentCountryIcon = countries.filter(
    (el) => el.name === tournamentData.COUNTRY_NAME
  );
  const [countryObject] = currentCountryIcon;

  const isEventFavourited = isFavoriteEvent(
    data?.EVENT_ID,
    currentLeagueStageIds
  );

  return (
    <section className={`${style.teamInfo}  w-full px-3`}>
      <article className="flex justify-around">
        <div className={`${style.infoItem} flex flex-col`}>
          <div
            className={`flex items-center justify-center mr-4
          ${style.starIcon} ${isEventFavourited ? style.favorited : ""}
           `}
            onClick={() =>
              addToFavourite(
                tournamentData?.TOURNAMENT_ID,
                data,
                {
                  NAME1: tournamentData?.NAME_PART_1,
                  NAME2: tournamentData?.NAME_PART_2,
                  url: tournamentData?.URL,
                  countryId: tournamentData.COUNTRY_ID,
                  countryName: tournamentData.COUNTRY_NAME,
                  sportHref: sportIdCheck?.href,
                  img: countryObject?.countryCode,
                },
                tournamentData.TOURNAMENT_STAGE_ID,
                data?.EVENT_ID
              )
            }
          >
            <EmptyFavouriteStarIcon />
          </div>

          <div className={`${style.infoImage}`}>
            <Image
              src={
                data?.HOME_IMAGES
                  ? data?.HOME_IMAGES[0]
                  : "/images/default/club.gif"
              }
              alt="club"
              width={55}
              height={55}
            />
          </div>
          <Link
            href={`/team/${data?.SHORTNAME_HOME}?id=${homeTeamId}&sportId=${sportIdCheck?.id}`}
          >
            <h3 className="text-center font-bold">
              {data?.HOME_NAME.replace("*", "").trim()}
            </h3>
          </Link>
        </div>

        <div className={`${style.infoTime} flex flex-col items-center`}>
          <p className={`${data.STAGE_TYPE === "LIVE" ? "mb-1" : "mb-5"} `}>
            {formattedDateTime}
          </p>
          {data.STAGE_TYPE === "LIVE" && (
            <div className={`w-6 h-6`}>
              <Live />
            </div>
          )}
          <div
            className={`flex items-center gap-x-2 ${
              data.STAGE_TYPE == "LIVE" ? style.live : ""
            }`}
          >
            <h3 className={`text-4xl `}>
              {data?.AWAY_SCORE_CURRENT && data?.AWAY_SCORE_CURRENT}
            </h3>
            <h4>
              <svg
                width="13"
                height="5"
                viewBox="0 0 13 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5581 -0.00142133V4.81818H0.438743V-0.00142133H12.5581Z"
                  fill="#00141E"
                />
              </svg>
            </h4>
            <h3 className="text-4xl">
              {data?.HOME_SCORE_CURRENT && data?.HOME_SCORE_CURRENT}
            </h3>
          </div>

          {data.STAGE_TYPE === "LIVE" && (
            <p className={style.live}>
              {" "}
              {`${data?.STAGE.slice(0, 1)}${data?.STAGE.slice(1)
                .toLowerCase()
                .replace("_", " ")}`}
            </p>
          )}
          {data?.STAGE === "FINISHED" && (
            <p className={style.stageTitle}>{data?.STAGE}</p>
          )}
        </div>

        <div className={`${style.infoItem} flex flex-col`}>
          <div
            className={`flex items-center justify-center mr-4
          ${style.starIcon} ${isEventFavourited ? style.favorited : ""}
           ${style.starIconRight}`}
            onClick={() =>
              addToFavourite(
                tournamentData?.TOURNAMENT_ID,
                data,
                {
                  NAME1: tournamentData?.NAME_PART_1,
                  NAME2: tournamentData?.NAME_PART_2,
                  url: tournamentData?.URL,
                  countryId: tournamentData.COUNTRY_ID,
                  countryName: tournamentData.COUNTRY_NAME,
                  sportHref: sportIdCheck?.href,
                  img: countryObject?.countryCode,
                },
                tournamentData.TOURNAMENT_STAGE_ID,
                data?.EVENT_ID
              )
            }
          >
            <EmptyFavouriteStarIcon />
          </div>
          <div className={`${style.infoImage}`}>
            <Image
              src={
                data?.AWAY_IMAGES
                  ? data?.AWAY_IMAGES[0]
                  : "/images/default/club.gif"
              }
              alt="club"
              width={55}
              height={55}
            />
          </div>
          <Link
            href={`/team/${data?.SHORTNAME_AWAY}?id=${awayTeamId}&sportId=${sportIdCheck?.id}`}
          >
            <h3 className="text-center font-bold">
              {data?.AWAY_NAME.replace("*", "").trim()}
            </h3>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default TeamInfo;
