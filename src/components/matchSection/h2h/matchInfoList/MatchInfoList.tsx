import React from "react";
import style from "./style.module.css";
import Link from "next/link";
import { EmptyFavouriteStarIcon } from "@/common/svg/home";

interface matchProps {
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
  addToFavourite: any;
  isFavouritedEvent: any;
  tournamentId: string;
}

const MatchInfoList = () => {
  return (
    <section className={``}>
      <div className={`${style.title}`}>Title</div>
      <div className={`flex ${style.matchContainer} p-2`}>
        <div
          // className={`flex items-center justify-center mr-7  ${style.starIcon} ${
          //   favoriteId === id ? style.favorited : ""
          // }`}
          className={`flex items-center justify-center mr-4 ${style.starIcon}`}
        >
          <EmptyFavouriteStarIcon />
        </div>
        <Link
          href={`/match/event?id=${"id"}`}
          target="_blank"
          className="w-full"
        >
          <section className={` items-center ${style.match}`}>
            <article className={`flex   items-center `}>
              <div className={`mr-7 ${style.dateTitle}`}>
                <h4>04.07.2024</h4>
              </div>
              <div className="mr-7 font-bold ">
                <h4>Premier League(Ehiopia)</h4>
              </div>
              <div className={`flex  flex-col ${style.matchesItems}`}>
                <div className="flex  flex-row mb-1">
                  <p className="mr-2">
                    {/* <Image
                    src={
                      homeImage && homeImage !== null
                        ? homeImage[0]
                        : "/images/userSection/Flag.svg"
                    }
                    alt="club"
                    width={16}
                    height={16}
                    priority
                  /> */}
                  </p>
                  <p>{"homeTeam"}</p>
                </div>

                <div className="flex  flex-row mb-1">
                  <p className="mr-2">
                    {/* <Image
                    src={
                      awayImage && awayImage !== null
                        ? awayImage[0]
                        : "/images/userSection/Flag.svg"
                    }
                    alt="club"
                    width={16}
                    height={16}
                    priority
                  /> */}
                  </p>
                  <p>away</p>
                </div>
              </div>
            </article>
            <div className={`flex  flex-col ${style.scoreInfo}`}>
              <p className="text-xs font-semibold mb-2 ">2</p>
              <p className="text-xs font-semibold ">3</p>
            </div>

            <div
              className={`flex ${style.moreBtn} px-2 py-1 items-center justify-center`}
            >
              <p>MORE INFO</p>
            </div>
          </section>
        </Link>
      </div>
    </section>
  );
};

export default MatchInfoList;
