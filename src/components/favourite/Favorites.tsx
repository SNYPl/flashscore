"use client";
import React from "react";
import style from "./style.module.css";

import { usePathname } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

interface FavouriteLeague {
  mainLeagueID: string;
  eventsId: string[];
}

const Favorites = () => {
  const [favouriteEvents, setFavouriteEvents] = useLocalStorage<
    FavouriteLeague[]
  >("favouriteEvents", []);

  console.log(favouriteEvents);

  return (
    <section className={`${style.favorites}    w-full`}>
      <article className={`bg-white rounded-lg  p-3 w-full `}></article>
    </section>
  );
};

export default Favorites;
