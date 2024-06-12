import React from "react";
import style from "./style.module.css";
import { Venue, Flag, Capacity, Referee } from "@/common/svg/match";

const NotPlay: React.FC = () => {
  let arrayOf6 = new Array(6).fill(1);
  return (
    <article
      className={`${style.formInfo}  flex justify-between p-3 gap-x-3 flex-col`}
    >
      <div className={`${style.title} mb-4 `}>
        <p>WILL NOT PLAY</p>
      </div>
      <article className={`${style.playList}  mb-4`}>
        {arrayOf6.map((el, id) => (
          <div
            className={` flex items-center ${id % 2 === 1 ? style.even : ""}`}
          >
            <div className={`${style.flag} mr-2 `}>
              <div className={`${style.flagBorder} `}>
                <Flag />
              </div>
            </div>
            <div className={`${style.player} `}>
              <h2>Duranville J.</h2>
              <p>(Muscle Injury)</p>
            </div>
          </div>
        ))}
      </article>

      <div className={`${style.title} mb-4 `}>
        <p>MATCH INFORMATION</p>
      </div>

      <article className={`${style.matchInformation} mb-4 `}>
        <div className={`${style.matchInfoItem} mb-4 `}>
          <Referee />
          <h4>REFEREE:</h4>
          <h3>Vincic S.</h3>
        </div>
        <div className={`${style.matchInfoItem} mb-4 `}>
          <Venue />
          <h4>VENUE:</h4>
          <h3>Wembley Stadium (London)</h3>
        </div>
        <div className={`${style.matchInfoItem} mb-4 `}>
          <Capacity />
          <h4>CAPACITY:</h4>
          <h3>90 000</h3>
        </div>
      </article>
    </article>
  );
};

export default NotPlay;
