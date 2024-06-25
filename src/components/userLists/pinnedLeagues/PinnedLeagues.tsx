import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import { LeaguePinIcon, PinIcon } from "@/common/svg/home";
import Link from "next/link";

const PinnedLeagues = () => {
  return (
    <section className={`mb-7 `}>
      <article className=" p-4">
        <div className={`${style.pinnedLeague} flex items-center pb-3 `}>
          <PinIcon />
          <h2 className="ml-2  text-userList-light font-extrabold ">
            <span className="font-semibold">PINNED</span> LEAGUES
          </h2>
        </div>
      </article>
      <article className="pl-2 pr-2">
        <div
          className={`flex items-center justify-between  mb-2 ${style.league} h-9`}
        >
          <Link
            href="/football/england/premier-league"
            className="flex items-center gap-x-2"
          >
            <Image
              src="/images/userSection/Flag.svg"
              alt="flag"
              width={18}
              height={13}
            />
            <p className="text-xs  text-userList-light font-medium tracking-wider  truncate max-w-40">
              Premier League
            </p>
          </Link>
          <div className={`${style.pinIcon} cursor-pointer`}>
            <LeaguePinIcon />
          </div>
        </div>
        <div
          className={`flex items-center justify-between  mb-2  ${style.league} h-9`}
        >
          <Link
            href="/football/england/eredivisie"
            className="flex items-center gap-x-2"
          >
            <Image
              src="/images/userSection/Flag.svg"
              alt="flag"
              width={18}
              height={13}
            />
            <p className="text-xs  text-userList-light font-medium tracking-wider truncate max-w-44">
              Eredivisie
            </p>
          </Link>
          <div className={`${style.pinIcon} cursor-pointer`}>
            <LeaguePinIcon />
          </div>
        </div>
      </article>
    </section>
  );
};

export default PinnedLeagues;
