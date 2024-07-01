import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import MatchItem from "./matchItem/MatchItem";

const MatchesInfo = ({
  setTableMenu,
  tableMenu,
  data,
}: {
  setTableMenu: any;
  tableMenu: string;
  data: any;
}) => {
  const menu = ["OVERALL", "HOME", "AWAY"];

  return (
    <section className={`${style.info}`}>
      <ul className="flex items-center gap-x-2 pb-3 p-2">
        {menu.map((el, index) => (
          <li
            key={index}
            className={`${tableMenu === el ? style.activeMenu : ""}`}
            onClick={() => setTableMenu(el)}
          >
            <button>{el}</button>
          </li>
        ))}
      </ul>

      {data?.map((el: any) => {
        return (
          <article>
            <div>
              <div
                className={`${style.infoTableTitle} flex items-center  p-2 gap-x-2`}
              >
                <p className="flex items-center justify-center font-bold">
                  #
                  <svg
                    width="6"
                    height="4"
                    viewBox="0 0 6 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-0.5"
                  >
                    <path d="M3 0L6 4H0L3 0Z" fill="#2E3E46" />
                  </svg>
                </p>
                <p className="font-bold">{el.GROUP}</p>
                <p className="flex items-center justify-center font-normal">
                  MP
                </p>
                <p className="flex items-center justify-center font-normal">
                  W
                </p>
                <p className="flex items-center justify-center font-normal">
                  D
                </p>
                <p className="flex items-center justify-center font-normal">
                  L
                </p>
                <p className="flex items-center justify-center font-normal">
                  G
                </p>
                <p className="flex items-center justify-center font-normal">
                  GD
                </p>
                <p className="flex items-center justify-center font-bold">
                  PTS
                </p>
                <p className="flex items-center justify-center font-normal">
                  FORM
                </p>
              </div>
            </div>
            {el.ROWS?.map((el: any) => {
              return (
                <MatchItem
                  key={el.TEAM_ID}
                  id={el.TEAM_ID}
                  name={el.TEAM_NAME}
                  mp={el.MATCHES_PLAYED}
                  wins={el.WINS}
                  goals={el.GOALS}
                  points={el.POINTS}
                  rank={el.RANKING}
                  image={el.TEAM_IMAGE_PATH}
                />
              );
            })}
          </article>
        );
      })}
    </section>
  );
};

export default MatchesInfo;
