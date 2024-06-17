"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { EmptyFavouriteStarIcon } from "@/common/svg/home";
import Image from "next/image";

interface props {
  showMoreBtn: boolean;
}

const LeagueMatch: React.FC<props> = ({ showMoreBtn }) => {
  const [showMatches, setShowMatches] = useState(false);

  return (
    <section className={` items-center ${style.match}`}>
      <article className={`flex  p-2 items-center`}>
        <div
          className={`flex items-center justify-center mr-7 ${style.starIcon}`}
        >
          <EmptyFavouriteStarIcon />
        </div>
        <div className="mr-7">
          <h4>15:00</h4>
        </div>
        <div className={`flex items-center flex-col ${style.matchesItems}`}>
          <div className="flex  flex-row mb-1">
            <p className="mr-2">
              <Image src="/images/club.svg" alt="club" width={16} height={16} />
            </p>
            <p>Arsenal</p>
          </div>
          <div className="flex  flex-row mb-1">
            <p className="mr-2">
              <Image src="/images/club.svg" alt="club" width={16} height={16} />
            </p>
            <p>Everton</p>
          </div>
        </div>
      </article>
      <div className={`flex ${style.scores} flex flex-col`}>
        <p>2</p>
        <p>1</p>
      </div>

      <div
        className={`flex ${
          showMoreBtn ? style.moreBtn : ""
        } px-2 py-1 items-center justify-center`}
      >
        {showMoreBtn && (
          <Link href={"/match/Arsenal"} target="_blank">
            MORE INFO
          </Link>
        )}
      </div>
    </section>
  );
};

export default LeagueMatch;
