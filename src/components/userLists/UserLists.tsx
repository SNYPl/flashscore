import React from "react";
import style from "./nav/style.module.css";
import PinnedLeagues from "./pinnedLeagues/PinnedLeagues";
import UserTeams from "./userTeams/UserTeams";
import Countries from "./countries/Countries";

const UserLists = () => {
  return (
    <section className={` bg-white rounded-lg w-full max-w-52`}>
      <PinnedLeagues />
      <UserTeams />
      <Countries />
    </section>
  );
};

export default UserLists;
