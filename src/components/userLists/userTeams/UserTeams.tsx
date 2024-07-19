"use client";
import React, { useRef, useState } from "react";
import { StarIcon, PlusIcon, EmptyFavouriteStarIcon } from "@/common/svg/home";
import style from "./style.module.css";
import { Modal, Skeleton } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocalStorage } from "usehooks-ts";

interface team {
  image: string;
  name: string;
  id: string;
  url: string;
}

const UserTeams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<string | null | undefined>("");
  // const [searchedData, setSearchedData] = useState<any[]>([]);
  const sport = useSportIdHandler();
  const searchRef = useRef<HTMLInputElement>(null);
  const [myTeamsList, setMyTeamsList] = useLocalStorage<team[]>(
    "myTeamsList",
    []
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    ["searchedUserITems", searchItems],
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
      },
    }
  );

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    setSearchItems(searchRef?.current?.value);
  };

  function addToMyTeam(name: string, image: string, id: string, url: string) {
    const itemIndex = myTeamsList?.findIndex((el) => el.id === id);

    if (itemIndex !== -1) {
      setMyTeamsList(myTeamsList.filter((el) => el.id !== id));
    } else {
      setMyTeamsList([...myTeamsList, { name, image, id, url }]);
    }
  }

  console.log(data);

  return (
    <section className={`p-4   mb-9 `}>
      <div className={`${style.myTeamsTitle} flex items-center pb-3  `}>
        <StarIcon />
        <h2 className="ml-2  text-userList-light font-bold ">MY TEAMS</h2>
      </div>

      <article>
        {myTeamsList.map((el: any) => {
          console.log(el);
          return (
            <div className={style.favItem} key={el.id}>
              <Link href={`/team/real-madrid?id=W8mj7MDD&sportId=1`}>
                <div>
                  <Image src={el.image} width={15} height={15} alt="flag" />
                </div>
                <span>{el.name}</span>
              </Link>
            </div>
          );
        })}
      </article>

      <div className={`${style.teams} flex items-center`} onClick={showModal}>
        <PlusIcon />
        <h2 className="ml-2 text-userList-light font-semibold  ">
          ADD THE TEAM
        </h2>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <h4 className={style.modalTitle}>Search</h4>
        <form className={`${style.searchInput}`} onSubmit={handleSubmitForm}>
          <div className={`flex h-9 ${style.modalInputSearch}`}>
            <input
              type="text"
              placeholder="type your search here"
              ref={searchRef}
            />
          </div>
        </form>
        <p className={style.text}>
          Please type at least 1 characters and press enter. search only teams
        </p>

        {isLoading ? (
          <div className="p-3">
            <Skeleton />
          </div>
        ) : (
          <article className={`${style.searches}`}>
            {data
              ?.filter((el: any) => el.TYPE === "participants")
              .map((searched: any) => {
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

                const isfavorited = myTeamsList?.find(
                  (el: any) => el.id === searched.ID
                );

                return (
                  <div
                    className={`relative  ${isfavorited ? style.added : ""}`}
                    key={searched.ID}
                  >
                    <Link
                      href={url}
                      className={`${style.searchedItemLink} `}
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
                    <div
                      className={style.starIcon}
                      onClick={() =>
                        addToMyTeam(
                          searched.NAME,
                          searched.IMAGE,
                          searched.ID,
                          searched.URL
                        )
                      }
                    >
                      <EmptyFavouriteStarIcon />
                    </div>
                  </div>
                );
              })}
          </article>
        )}
      </Modal>
    </section>
  );
};

export default UserTeams;
