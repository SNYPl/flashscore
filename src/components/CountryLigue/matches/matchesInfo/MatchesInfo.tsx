import React from "react";
import style from "./style.module.css";
import Link from "next/link";

const MatchesInfo = () => {
  const menu = [
    { title: "OVERALL", href: "/" },
    { title: "HOME", href: "/" },
    { title: "AWAY", href: "/" },
  ];
  return (
    <section className={`${style.info}`}>
      <ul>
        {menu.map((el, index) => (
          <li key={index}>
            <Link href={el.href}>{el.title}</Link>
          </li>
        ))}
      </ul>
      <article>
        <div>
          <p>#</p>
          <div>TEAM</div>
          <p>MP</p>
          <p>W</p>
          <p>D</p>
          <p>L</p>
          <p>G</p>
          <p>GD</p>
          <p>PTS</p>
          <p>FORM</p>
        </div>
      </article>
    </section>
  );
};

export default MatchesInfo;
