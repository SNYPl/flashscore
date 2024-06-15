import React from "react";
import style from "./style.module.css";

const LineUp: React.FC = () => {
  const formation = [4, 3, 1, 2];

  const formation1 = [4, 3, 3];

  return (
    <section className={`${style.lineUp}`}>
      <div className={`${style.title}`}>
        <p>Possible line up</p>
      </div>
      <article
        style={{ backgroundImage: "/images/match/stadium.jpg" }}
        className={`${style.stadium}`}
      >
        <div className={`${style.teamOne}`}>
          <p className={`${style.teamTitle}`}>Real madrid</p>
          <div className={`pt-6 ${style.teamOnePlayers}`}>
            <div className={style.player}>GK</div>
            {formation.map((count: any, index) => {
              console.log(count);
              return (
                <div key={index} className={style.line}>
                  {Array.from({ length: parseInt(count) }).map((_, idx) => (
                    <div key={idx} className={style.player}>
                      {count}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${style.teamTwo}`}>
          <p className={`${style.teamTitle}`}>VillaReal</p>
          <div className={`pb-6 ${style.teamTwoPlayers}`}>
            <div className={style.player}>GK</div>
            {formation1.map((count: any, index) => {
              return (
                <div key={index} className={style.line}>
                  {Array.from({ length: parseInt(count) }).map((_, idx) => (
                    <div key={idx} className={style.player}>
                      {count}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
};

export default LineUp;
