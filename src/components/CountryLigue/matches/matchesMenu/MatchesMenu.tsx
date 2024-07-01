import React from "react";
import style from "./style.module.css";

const MatchesMenu = ({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: any;
}) => {
  const menu = ["STANDINGS", "FORUM", "OVER/UNDER", "HT/FT", "TOP SCORES"];

  return (
    <section className={`${style.menu} mb-4`}>
      <ul className="flex items-center gap-x-2">
        {menu.map((el, index) => (
          <li
            key={index}
            className={`${activeMenu === el ? style.activeMenu : ""}`}
            onClick={() => setActiveMenu(el)}
          >
            <button className="">{el}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MatchesMenu;
