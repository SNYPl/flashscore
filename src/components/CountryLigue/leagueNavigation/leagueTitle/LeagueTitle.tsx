"use client";
import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { Mark } from "@/common/svg/mark";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import { useSearchParams } from "next/navigation";

const LeagueTitle = ({
  leagueName,
  leagueImage,
}: {
  leagueName: string;
  leagueImage: string;
}) => {
  const currentYear = new Date().getFullYear();
  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();
  const searchParams = useSearchParams();

  const tournamentId = searchParams.get("tournamentId") || "";

  const isActivePin = pinnedLeagueIds.includes(tournamentId);

  const imageUrl = leagueImage
    ? leagueImage
    : `/images/leagueMiddle/emptyLeagueLogo.gif`;

  return (
    <section className={`${style.leagueTitle} flex  items-center`}>
      <div className={style.img}>
        <Image src={imageUrl} alt="img" width={60} height={60} />
      </div>

      <div className={style.title}>
        <h3 className="flex items-center gap-x-4">
          {leagueName}{" "}
          <span
            className={`${isActivePin ? style.activePin : style.notActive}`}
            onClick={() => addLeagueToLocalStorage(tournamentId)}
          >
            <Mark />
          </span>
        </h3>
        <p>{currentYear}</p>
      </div>
    </section>
  );
};

export default LeagueTitle;
