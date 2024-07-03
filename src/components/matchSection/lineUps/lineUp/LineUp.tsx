import React from "react";
import style from "./style.module.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";

const LineUp: React.FC = () => {
  const searchParams = useSearchParams();

  const eventId = searchParams.get("id");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/lineups",
    params: {
      event_id: eventId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["eventLineUp", eventId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    }
  );

  console.log(data);

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
