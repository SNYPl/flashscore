"use client";
import React, { useState, useRef } from "react";
import { SearchICon, SettingIcon } from "@/common/svg/navigation";
import style from "./style.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Modal, Skeleton } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

const Search = () => {
  const [searchItems, setSearchItems] = useState<string | null | undefined>("");
  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const sport = useSportIdHandler();
  const searchRef = useRef<HTMLInputElement>(null);

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/search/multi-search",
    params: {
      locale: "en_INT",
      query: searchItems,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["searchItems", searchItems],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    },
    {
      enabled: !!searchItems,
      onSuccess: (data) => {
        if (searchRef.current) {
          searchRef.current.value = "";
        }
        setSearchedData(data);
        setSearchItems("");
      },
    }
  );

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    setOpen(true);

    setSearchItems(searchRef?.current?.value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <section className={`flex`}>
      <form
        className={`${style.searchInput} relative w-60 h-9 mr-3`}
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-full rounded-full pl-5 pr-7  mr outline-none text-xs"
          ref={searchRef}
        />
        <div className="absolute right-3 top-2">
          <button type="submit" aria-label="Search">
            <SearchICon />
          </button>
        </div>
      </form>
      <div className="cursor-pointer">
        <SettingIcon />
      </div>

      <Modal
        title="Search result"
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        {isLoading && (
          <div className="p-4">
            <Skeleton />
          </div>
        )}
        {searchedData?.map((searched: any) => {
          const defaultImage =
            searched.TYPE === "playersInTeam"
              ? "/images/default/person.gif"
              : "/images/default/club.gif";
          const stageId = searched.TOURNAMENT_STAGE_IDS_WITH_STATS_DATA
            ? searched.TOURNAMENT_STAGE_IDS_WITH_STATS_DATA[0]
            : [];

          const url =
            searched.TYPE === "playersInTeam"
              ? `/player/${searched.URL}?playerId=${searched.ID}&sportId=${sport?.id}`
              : searched.TYPE === "participants"
              ? `/team/${searched.URL}?id=${searched.ID}&sportId=${sport?.id}`
              : `${sport?.href}/${searched.COUNTRY_NAME}/${searched.URL}?seasonStageId=${stageId}&name=${searched.NAME}&tournamentId=${searched.ID}`;

          return (
            <Link
              href={url}
              className={style.searchedItemLink}
              target="_blank"
              key={searched.ID}
            >
              <article className={style.serachItem}>
                <div className={`${style.searchImage}`}>
                  <Image
                    src={searched.IMAGE ? searched.IMAGE : defaultImage}
                    alt="img"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={style.searchInfo}>
                  <h4>{searched.NAME}</h4>
                  <p>
                    {sport?.text},<span>{searched.COUNTRY_NAME}</span>
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </Modal>
    </section>
  );
};

export default Search;
