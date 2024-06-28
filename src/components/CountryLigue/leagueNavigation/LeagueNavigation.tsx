"use client";
import React, { useEffect } from "react";
import style from "./style.module.css";
import LeagueTitle from "./leagueTitle/LeagueTitle";
import LeagueMenu from "./menu/LeagueMenu";
import ParamInfo from "@/components/paramInfo/ParamInfo";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { setAllStages } from "@/components/store/slices/matchesSlice";
import { useSearchParams } from "next/navigation";

interface leagueProps {
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  LEAGUE_NAME: string;
  SPORT_ID: number;
  STAGE_ID: string;
  TOURNAMENT_IMAGE: string;
}

const LeagueNavigation = ({
  setActiveMenu,
  activeMenu,
}: {
  activeMenu: string;
  setActiveMenu: any;
}) => {
  const sportIdCheck = useSportIdHandler();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const leagueID = searchParams.get("leagueId");
  const countryName = searchParams.get("name");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/stages",
    params: {
      sport_id: "1",
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["allStages"],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setAllStages(data));
    }
  }, [data, dispatch]);

  const filteredLeague = data?.DATA?.find(
    (el: leagueProps) => el.LEAGUE_NAME === countryName
  );

  return (
    <section className={`${style.leagueNavigaion} flex flex-col`}>
      <div className="bg-white rounded-lg  mb-7">
        <div className="p-4 pb-0">
          <ParamInfo />
          <LeagueTitle
            leagueName={filteredLeague?.LEAGUE_NAME}
            leagueImage={filteredLeague?.TOURNAMENT_IMAGE}
          />
        </div>
        <LeagueMenu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      </div>
    </section>
  );
};

export default LeagueNavigation;
