import React from "react";
import style from "./style.module.css";
import { UserOutlined } from "@ant-design/icons";

const StartingLineUp = ({
  teamOneFormation,
  teamTwoFormation,
}: {
  teamOneFormation: any;
  teamTwoFormation: any;
}) => {
  return (
    <article
      className={`${style.lineUP}  flex justify-between p-3 gap-x-3 flex-col px-0`}
    >
      <div className={`${style.title} mb-4 `}>
        <p>Starting Line Up</p>
      </div>

      <article className={`${style.info} mb-4 `}>
        <div>
          {teamOneFormation?.MEMBERS.map((el: any) => {
            return (
              <div className={`  flex items-center py-2 `} key={el.PLAYER_ID}>
                <div className={`${style.img} mr-2 flex items-center`}>
                  <div className={`${style.num} mr-2 `}>{el.PLAYER_NUMBER}</div>
                  <div className={`${style.imgBorder} `}>
                    <UserOutlined />
                  </div>
                </div>
                <div className={`${style.player}  `}>
                  <h2>{el.PLAYER_FULL_NAME}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          {teamTwoFormation?.MEMBERS.map((el: any) => {
            return (
              <div
                className={` py-2  ${style.playerTwo} flex items-center `}
                key={el.PLAYER_ID}
              >
                <div className={`${style.img} ml-2 flex items-center `}>
                  <div className={`${style.num} mr-2 `}>{el.PLAYER_NUMBER}</div>
                  <div className={`${style.imgBorder} `}>
                    <UserOutlined />
                  </div>
                </div>
                <div className={`${style.player}  `}>
                  <h2>{el.PLAYER_FULL_NAME}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </article>
  );
};

export default StartingLineUp;