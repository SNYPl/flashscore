import React from "react";
import style from "./style.module.css";
import PinnedLeagues from "./pinnedLeagues/PinnedLeagues";
import UserTeams from "./userTeams/UserTeams";
import Countries from "./countries/Countries";

const UserLists = () => {
  return (
    <section className={`${style.UserList} bg-white rounded-lg w-full `}>
      <PinnedLeagues />
      <UserTeams />
      <Countries />
    </section>
  );
};

export default UserLists;
