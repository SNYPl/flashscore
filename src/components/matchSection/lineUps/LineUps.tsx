import React from "react";
import style from "./style.module.css";
import LineUp from "./lineUp/LineUp";
import Injuries from "./injuries/Injuries";
import { Skeleton } from "antd";
import axios, { isAxiosError } from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";

interface lineUpProp {
  homeTeamName:string;
  awayTeamName:string;
}


const LineUps: React.FC<lineUpProp> = ({awayTeamName,homeTeamName}) => {

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
        const response = await axios.request(options).catch(error => {
          if (isAxiosError(error)) {
            switch (error.response?.status) {
              case 404:

                return { data: { DATA:[]}  };

              default:
                break;
            }
          }

          throw error;
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    }, {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!eventId,
    }
  );


  

  if (isLoading ) {
    return (
      <div className="p-5 ">
        <Skeleton />
      </div>
    );
  }


  
  const [ startingLineUp,subtitiles] = data?.DATA;
  const[teamOneFormation,teamTwoFormation] = startingLineUp?.FORMATIONS;


  return (
    <section className={`${style.lineUps}`}>
      <LineUp  data={data}  teamOneFormation={teamOneFormation} teamTwoFormation={teamTwoFormation} awayTeamName={awayTeamName} homeTeamName={homeTeamName}/>
      <Injuries />
    </section>
  );
};

export default LineUps;
