import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

interface props {
  data: any;
  h2hData: any;
}

const TeamInfo: React.FC<props> = ({ data, h2hData }) => {
  const START_TIME = data?.START_TIME;
  const sportIdCheck = useSportIdHandler();
  const date = new Date(START_TIME * 1000);

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

  return (
    <section className={`${style.teamInfo}  w-full px-3`}>
      <article className="flex justify-around">
        <div className={`${style.infoItem} flex flex-col`}>
          <div className={`${style.infoImage}`}>
            <Image
              src={data?.HOME_IMAGES[0]}
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
          <p className="mb-5">{formattedDateTime}</p>
          <div className="flex items-center gap-x-2">
            <h3 className="text-4xl">
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
          {data?.STAGE === "FINISHED" && (
            <p className={style.stageTitle}>{data?.STAGE}</p>
          )}
        </div>

        <div className={`${style.infoItem} flex flex-col`}>
          <div className={`${style.infoImage}`}>
            <Image
              src={data?.AWAY_IMAGES[0]}
              alt="club"
              width={55}
              height={55}
            />
          </div>
          <Link href={`/team/${data?.SHORTNAME_AWAY}?id=${awayTeamId}`}>
            <h3 className="text-center font-bold">
              {data?.AWAY_NAME.replace("*", "").trim()}
            </h3>
          </Link>
        </div>
      </article>
      {/* <div className={`flex justify-center items-center ${style.infoText}`}>
        <p className="">
          <span className="mr-1">
            <Icon />
          </span>
          Neutral location - Wembley Stadium.
        </p>
      </div> */}
    </section>
  );
};

export default TeamInfo;
