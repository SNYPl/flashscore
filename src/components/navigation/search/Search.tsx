import React from "react";
import { SearchICon, SettingIcon } from "@/common/svg/navigation";
import style from "./style.module.css";

const Search = () => {
  return (
    <section className={`flex`}>
      <div className={`${style.searchInput} relative w-60 h-9 mr-3`}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-full rounded-full pl-5 pr-7  mr outline-none text-xs"
        />
        <div className="absolute right-3 top-3">
          <SearchICon />
        </div>
      </div>
      <div className="cursor-pointer">
        <SettingIcon />
      </div>
    </section>
  );
};

export default Search;
