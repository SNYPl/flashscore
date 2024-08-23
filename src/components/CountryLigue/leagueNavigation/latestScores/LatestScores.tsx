"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import CountryLeagueEvents from "../../countryLeagueEvents/CountryLeagueEvents";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import { IoFootballOutline } from "react-icons/io5";
import { mutateLeagueMatchRounds } from "@/components/helper/mutateLeagueMatchesRounds";

const LatestScores = ({
  setActiveMenu,
  activeMenu,
  pages,
}: {
  setActiveMenu?: any;
  activeMenu: string;
  pages: number;
}) => {
  const sportId = useSelector((state: any) => state.navigationReducer.sportId);
  const searchParams = useSearchParams();
  const seasonStageId = searchParams.get("seasonStageId");
  const [allDataInfo, setAllDataInfo] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreBtn, setShowMoreBtn] = useState(true);

  const fetchMatches = async (startPage: number, endPage: number) => {
    const successfulResponses: any[] = [];

    for (let page = startPage; page <= endPage; page++) {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/results",
          params: {
            locale: "en_INT",
            tournament_stage_id: seasonStageId,
            page: page.toString(),
          },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
            "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
          },
        });
        if (response.data?.DATA) {
          successfulResponses.push(response.data.DATA);
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error);
        if (error) setShowMoreBtn(false);
      }
    }

    return successfulResponses;
  };

  const { isLoading, isError, isFetching } = useQuery(
    ["latestScoresLeague", sportId, seasonStageId, currentPage],
    () => fetchMatches(currentPage, currentPage + pages - 1),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!seasonStageId,
      onSuccess: (data) => {
        setAllDataInfo((prevState) => [...prevState, ...data]);
      },
      onError: (err) => {
        console.log("Error occurred:", err);
      },
    }
  );

  if (isFetching && allDataInfo.length === 0) {
    return (
      <div className="p-5 ">
        <Skeleton />
      </div>
    );
  }

  if (activeMenu === "RESULTS" && allDataInfo.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col">
        <IoFootballOutline
          style={{ fontSize: "80px", color: "var(--match-league-title-color)" }}
        />
        <p
          style={{ color: "var(--black-color)", fontSize: "13px" }}
          className="mt-3"
        >
          No matches found
        </p>
      </div>
    );
  }

  if (allDataInfo.length === 0) {
    return <div></div>;
  }

  const { finalData, sortedResultsArray } = mutateLeagueMatchRounds(
    allDataInfo
  );

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + pages);
  };
  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Latest Scores</h2>

      <CountryLeagueEvents
        tournamentStageId={finalData?.TOURNAMENT_STAGE_ID}
        NAME1={finalData?.NAME_PART_1}
        NAME2={finalData?.NAME_PART_2}
        url={finalData?.URL}
        events={sortedResultsArray || []}
        countryId={finalData?.COUNTRY_ID}
        tournamentId={finalData?.TOURNAMENT_ID}
        key={finalData?.TOURNAMENT_STAGE_ID}
        countryName={finalData?.COUNTRY_NAME}
        showMatchesDefault={true}
        setActiveMenu={setActiveMenu}
        ShowFullDateHour
      />

      {isLoading && allDataInfo.length !== 0 ? (
        <div className="p-5 ">
          <Skeleton />
        </div>
      ) : (
        ""
      )}

      {activeMenu !== "RESULTS" && (
        <div
          className={style.moreMatches}
          onClick={() => {
            setActiveMenu("RESULTS");
          }}
        >
          <button>Show More Matches</button>
        </div>
      )}

      {activeMenu === "RESULTS" && showMoreBtn ? (
        <div
          className={`${style.moreMatches} ${style.fixMoreMatchesBtn}`}
          onClick={handleShowMore}
        >
          <button>Show More Matches</button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default LatestScores;
