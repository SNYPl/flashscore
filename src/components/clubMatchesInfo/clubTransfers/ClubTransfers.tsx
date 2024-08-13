"use client";
import React from "react";
import style from "./style.module.css";
import { Skeleton } from "antd";
import Transfer from "./transfer/Transfer";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios, { isAxiosError } from "axios";
import { IoFootballOutline } from "react-icons/io5";

const ClubTransfers = () => {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const sportId = searchParams.get("sportId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/teams/transfers",
    params: {
      team_id: teamId,
      page: 1,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["clubTransfers", teamId, sportId],
    async () => {
      try {
        const response = await axios.request(options).catch((error) => {
          if (isAxiosError(error)) {
            switch (error.response?.status) {
              case 404:
                return { data: { DATA: [] } };

              default:
                break;
            }
          }

          throw error;
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching player transfers", error);
        throw new Error("Error fetching player transfers");
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!teamId,
    }
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton />
      </div>
    );
  }

  return (
    <article
      className={`${style.transfers} bg-white rounded-lg p-4  mobilePadding8`}
    >
      <h4 className={style.matchesTitle}>Transfers</h4>
      {data?.DATA.length === 0 && (
        <div className="flex items-center justify-center flex-col p-3">
          <IoFootballOutline
            style={{
              fontSize: "80px",
              color: "var(--match-league-title-color)",
            }}
          />
          <p
            style={{ color: "var(--black-color)", fontSize: "13px" }}
            className="mt-3"
          >
            No matches found
          </p>
        </div>
      )}

      {data?.DATA.length !== 0 && (
        <article className={` mb-6`}>
          <div className={style.titles}>
            <p className="mobileNone">Date</p>
            <p>PLayer</p>
            <p>Fom/To</p>
            <p className={style.mobileFee}>FEE</p>
          </div>

          <div className={`${style.infoItemSection} `}>
            {data?.DATA.map((transfer: any, id: number) => {
              return (
                <Transfer
                  key={id}
                  id={transfer.TEAM_ID}
                  transferDate={transfer.DATE}
                  transferDirection={transfer.TRANSFER_DIRECTION}
                  transferType={transfer.TRANSFER_TYPE}
                  tj={transfer.TJ}
                  toValue={transfer.TO.VALUE}
                  toImage={
                    transfer.TO.PARTICIPANT_IMAGE || "/images/default/club.gif"
                  }
                  fromValue={transfer.FROM.VALUE}
                  fromImage={
                    transfer.FROM.PARTICIPANT_IMAGE ||
                    "/images/default/club.gif"
                  }
                  player={transfer.PLAYER.VALUE}
                  playerID={transfer.PLAYER.PARTICIPANT_ID}
                  playerImg={transfer.PLAYER.PARTICIPANT_IMAGE}
                />
              );
            })}
          </div>
        </article>
      )}
    </article>
  );
};

export default ClubTransfers;
