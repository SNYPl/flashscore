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
          className="w-full h-full rounded-full pl-5 pr-7  mr"
        />
        <div className="absolute right-3 top-3">
          <SearchICon />
        </div>
      </div>
      <div>
        <SettingIcon />
      </div>
    </section>
  );
};

export default Search;
