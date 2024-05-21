import React from "react";
import { StarIcon, PlusIcon } from "@/common/svg/home";
import style from "./style.module.css";

const UserTeams = () => {
  return (
    <section className={`p-4   mb-9`}>
      <div className={`${style.myTeamsTitle} flex items-center pb-3  `}>
        <StarIcon />
        <h2 className="ml-2  text-userList-light font-bold ">MY TEAMS</h2>
      </div>

      <div className={`${style.teams} flex items-center`}>
        <PlusIcon />
        <h2 className="ml-2 text-userList-light font-semibold  ">
          ADD THE TEAM
        </h2>
      </div>
    </section>
  );
};

export default UserTeams;
