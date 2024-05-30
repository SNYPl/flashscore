import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { Mark } from "@/common/svg/mark";

const LeagueTitle = () => {
  return (
    <section className={`${style.leagueTitle} flex  items-center`}>
      <div className={style.img}>
        <Image
          src={"/images/leagueMiddle/leagueImg.png"}
          alt="img"
          width={60}
          height={60}
        />
      </div>

      <div className={style.title}>
        <h3 className="flex items-center gap-x-4">
          Premier League{" "}
          <span>
            <Mark />
          </span>
        </h3>
        <p>2023/2024</p>
      </div>
    </section>
  );
};

export default LeagueTitle;
