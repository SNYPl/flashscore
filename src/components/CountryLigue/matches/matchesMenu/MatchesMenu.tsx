import React from "react";
import style from "./style.module.css";
import Link from "next/link";

const MatchesMenu = () => {
  const menu = [
    { title: "STANDINGS", href: "/" },
    { title: "FORUM", href: "/" },
    { title: "OVER/UNDER", href: "/" },
    { title: "HT/FT", href: "/" },
    { title: "TOP SCORES", href: "/" },
  ];
  return (
    <section className={`${style.menu}`}>
      <ul>
        {menu.map((el, index) => (
          <li key={index}>
            <Link href={el.href}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MatchesMenu;
