"use client";
import Link from "next/link";
import React from "react";
import style from "./style.module.css";
import { usePathname } from "next/navigation";
import { SoccerIcon, PredictionIcon } from "@/common/svg/navigation";

const Navigation = () => {
  const pathName = usePathname();

  return (
    <section className={"flex items-center justify-center gap-x-5 h-full"}>
      <div
        className={`${pathName === "/" ? style.active : ""} ${
          style.itemContainer
        }`}
      >
        <Link href={"/"} className="flex gap-x-2 items-center">
          <SoccerIcon />
          <h3>SCORES</h3>
        </Link>
      </div>
      <div
        className={`${pathName === "/prediction" ? style.active : ""} ${
          style.itemContainer
        }`}
      >
        <Link href={"/prediction"} className="flex gap-x-2 items-center">
          <PredictionIcon />
          <h3>PREDICTIONS</h3>
        </Link>
      </div>
    </section>
  );
};

export default Navigation;
