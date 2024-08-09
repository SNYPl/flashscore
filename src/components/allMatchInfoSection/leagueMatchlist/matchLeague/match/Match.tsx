import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";

import { EmptyFavouriteStarIcon } from "@/common/svg/home";
import { Live } from "@/common/svg/match";
import {
  useFavouriteLeagues,
  isFavoriteEvent,
} from "@/components/hooks/useFavouriteLeagues ";
import { usePathname, useSearchParams } from "next/navigation";

interface matchProps {
  homeTeam: any;
  awayTeam: any;
  homeScore: any;
  awayScore: any;
  status: any;
  awayImage: [string];
  homeImage: [string];
  ShowFullDate?: boolean;
  time: number;
  id: string;
  addToFavourite: any;
  tournamentId: string;
  sportId: any;
  stageType: string;
  ShowFullDateHour?: boolean;
  winner?: string | any;
}

const Match: React.FC<matchProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  ShowFullDate = false,
  awayImage,
  homeImage,
  time,
  id,
  addToFavourite,
  tournamentId,
  sportId,
  stageType,
  ShowFullDateHour,
  winner,
}) => {
  const timeStamp = time * 1000;
  const date = new Date(timeStamp);
  const path = usePathname();

  const { favouriteLeagues } = useFavouriteLeagues();

  const currentLeagueStageIds = favouriteLeagues.find(
    (el) => el.tournamentStageId === tournamentId
  )?.stageIds;

  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const isEventFavourited = isFavoriteEvent(id, currentLeagueStageIds);

  const isLeagueRoute = path.includes("/team");

  const isHomePath = path === "/";

  return (
    <div className={`flex ${style.matchContainer} p-2`}>
      <div
        className={`flex items-center justify-center mr-4
          ${style.starIcon} ${isEventFavourited ? style.favorited : ""}`}
        onClick={addToFavourite}
      >
        <EmptyFavouriteStarIcon />
      </div>
      <Link
        href={`${sportId.alt}/match/event?id=${id}`}
        target="_blank"
        className="w-full"
      >
        <div
          className={` items-center ${style.match} ${
            stageType == "LIVE" ? style.matchLive : ""
          } 
          ${winner && isLeagueRoute ? style.winnerWidth : ""}
          `}
        >
          <div className={`flex   items-center `}>
            <div
              className={`mr-7 w-16 mobileNone ${
                ShowFullDateHour ? "w-24" : ""
              }`}
            >
              {!ShowFullDate && (
                <>
                  {status == "SCHEDULED" && (
                    <h4>
                      <span>
                        {hour}:{minute === 0 ? "00" : minute}
                      </span>
                    </h4>
                  )}

                  {stageType == "LIVE" && (
                    <h4 className={style.liveText}>
                      <span
                        className={`font-xs font-medium ${style.predictionTitleColor}`}
                      >
                        {`${status.slice(0, 1)}${status
                          .slice(1)
                          .toLowerCase()
                          .replace("_", " ")}`}
                      </span>
                    </h4>
                  )}

                  {stageType == "FINISHED" && (
                    <h4>
                      <span
                        className={`font-xs font-medium ${style.predictionTitleColor}`}
                      >
                        {`${status.slice(0, 1)}${status
                          .slice(1)
                          .toLowerCase()
                          .replace("_", " ")}`}
                      </span>
                    </h4>
                  )}
                </>
              )}
              {ShowFullDate && (
                <h4 className={ShowFullDateHour ? "mr-4" : ""}>
                  {formattedDate}
                  {ShowFullDateHour && (
                    <span className="ml-1 ">
                      {hour}:{minute === 0 ? "00" : minute}
                    </span>
                  )}
                </h4>
              )}
            </div>
            <div className={`flex  flex-col ${style.matchesItems}`}>
              <div className="flex  flex-row mb-1">
                <p className="mr-2">
                  <Image
                    src={
                      homeImage && homeImage !== null
                        ? homeImage[0]
                        : "/images/default/club.gif"
                    }
                    alt="club"
                    width={16}
                    height={16}
                    priority
                    className="object-contain"
                  />
                </p>
                <p>{homeTeam}</p>
              </div>

              <div className="flex  flex-row mb-1">
                <p className="mr-2">
                  <Image
                    src={
                      awayImage && awayImage !== null
                        ? awayImage[0]
                        : "/images/default/club.gif"
                    }
                    alt="club"
                    width={16}
                    height={16}
                    priority
                    className="object-contain"
                  />
                </p>
                <p>{awayTeam}</p>
              </div>
            </div>
          </div>
          <div className={`flex  flex-col ${style.scoreInfo}`}>
            <p className="text-xs font-semibold mb-2 ">
              {homeScore ? homeScore : "-"}
            </p>
            <p className="text-xs font-semibold ">
              {awayScore ? awayScore : "-"}
            </p>
          </div>

          {stageType == "LIVE" ? (
            <div className="w-full flex items-center justify-center">
              <div className={style.live}>
                <Live />
              </div>
            </div>
          ) : (
            <>
              {isLeagueRoute && (
                <div
                  className={`${style.mobileDateInfo} desktopNo  items-center  flex-col`}
                >
                  {/* {!winner ? (
                    formattedDate
                  ) : (
                    <div className={`${style[winner]} ${style.tableWord}`}>
                      {winner}
                    </div>
                  )} */}
                  {formattedDate}
                  <span
                    className={`ml-1 mr-2.5 ${style.mobileResponsiveHour} flex items-center`}
                  >
                    - {hour}:{minute === 0 ? "00" : minute}
                  </span>
                  {winner && (
                    <div className={`${style[winner]} ${style.tableWord}`}>
                      {winner}
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-x-2 mobileNone">
                <div
                  className={`flex ${style.moreBtn} px-2 py-1 items-center justify-center mobileNone`}
                >
                  <p>MORE INFO</p>
                </div>
                {winner && isLeagueRoute && (
                  <p className={`${style[winner]} ${style.tableWord}`}>
                    {winner}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </Link>
      {isHomePath && (
        <span
          className={`flex items-center  text-xs desktopNo ${style.homeHour}`}
        >
          {hour}:{minute === 0 ? "00" : minute}
        </span>
      )}
    </div>
  );
};

export default Match;
