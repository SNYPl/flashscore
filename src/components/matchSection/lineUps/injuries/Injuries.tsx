import React from "react";
import style from "./style.module.css";
import { InjuriesICon, Flag } from "@/common/svg/match";

const Injuries: React.FC = () => {
  let arrayOf6 = new Array(6).fill(1);

  return (
    <article
      className={`${style.injuries}  flex justify-between p-3 gap-x-3 flex-col`}
    >
      <div className={`${style.title} mb-4 `}>
        <p>WILL NOT PLAY</p>
      </div>
      <div className={`${style.playList}  mb-4`}>
        {arrayOf6.map((el: any, id: any) => (
          <div
            className={` flex items-center ${id % 2 === 1 ? style.even : ""}`}
            key={id}
          >
            <div className={`${style.flag} mr-2 `}>
              <div>
                <InjuriesICon />
              </div>
            </div>
            <div className={`${style.player} `}>
              <h2>Duranville J.</h2>
              <p>(Muscle Injury)</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`${style.title} mb-4 `}>
        <p>COACHES</p>
      </div>

      <article className={`${style.coaches} mb-4 `}>
        {arrayOf6.map((el: any, id: any) => {
          return (
            <div
              className={`${style.coach}  flex items-center ${
                id % 2 === 1 ? style.even : ""
              }`}
            >
              <div className={`${style.flag} mr-2 `}>
                <div className={`${style.flagBorder} `}>
                  <Flag />
                </div>
              </div>
              <div className={`${style.player}  `}>
                <h2>Duranville J.</h2>
              </div>
            </div>
          );
        })}
      </article>
    </article>
  );
};

export default Injuries;
