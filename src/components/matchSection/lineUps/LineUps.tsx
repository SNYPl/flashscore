import React from "react";
import style from "./style.module.css";
import LineUp from "./lineUp/LineUp";
import Injuries from "./injuries/Injuries";

const LineUps: React.FC = () => {
  return (
    <section className={`${style.lineUps}`}>
      <LineUp />
      <Injuries />
    </section>
  );
};

export default LineUps;
