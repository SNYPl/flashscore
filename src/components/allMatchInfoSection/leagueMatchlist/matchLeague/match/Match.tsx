import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";

import {
  EmptyFavouriteStarIcon,
  FavouriteStartIcon,
  LeagueArrowIcon,
} from "@/common/svg/home";

const Match = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  showMatches,
  awayImage,
  homeImage,
  time,
  id,
}: {
  homeTeam: any;
  awayTeam: any;
  homeScore: any;
  awayScore: any;
  status: any;
  awayImage: [string];
  homeImage: [string];
  showMatches: boolean;
  time: number;
  id: string;
}) => {
  const timeStamp = time * 1000;
  const date = new Date(timeStamp);

  const hour = date.getHours();
  const minute = date.getMinutes();

  return (
    <section className={` items-center ${style.match}`}>
      <article className={`flex  p-2 items-center `}>
        <div
          className={`flex items-center justify-center mr-7 ${style.starIcon}`}
        >
          <EmptyFavouriteStarIcon />
        </div>
        <div className="mr-7 w-16">
          <h4>
            {status == "SCHEDULED" ||
            status == "SECOND_HALF" ||
            status == "FIRST_HALF" ||
            status == "HALF_TIME" ? (
              <span>
                {hour}:{minute === 0 ? "00" : minute}
              </span>
            ) : (
              <span className="font-xs font-medium text-prediction-team-title">
                {status}
              </span>
            )}
          </h4>
        </div>
        <div className={`flex  flex-col ${style.matchesItems}`}>
          <div className="flex  flex-row mb-1">
            <p className="mr-2">
              <Image
                src={
                  awayImage && awayImage !== null
                    ? awayImage[0]
                    : "/images/userSection/Flag.svg"
                }
                alt="club"
                width={16}
                height={16}
                priority
              />
            </p>
            <p>{awayTeam}</p>
          </div>
          <div className="flex  flex-row mb-1">
            <p className="mr-2">
              <Image
                src={
                  homeImage && homeImage !== null
                    ? homeImage[0]
                    : "/images/userSection/Flag.svg"
                }
                alt="club"
                width={16}
                height={16}
                priority
              />
            </p>
            <p>{homeTeam}</p>
          </div>
        </div>
      </article>
      <div className={`flex  flex-col ${style.scoreInfo}`}>
        <p className="text-xs font-semibold mb-2">
          {awayScore ? awayScore : "-"}
        </p>
        <p className="text-xs font-semibold ">{homeScore ? homeScore : "-"}</p>
      </div>
      <div
        className={`flex ${style.moreBtn} px-2 py-1 items-center justify-center`}
      >
        <Link href={"/match/Villarreal"} target="_blank">
          MORE INFO
        </Link>
      </div>
    </section>
  );
};

export default Match;
