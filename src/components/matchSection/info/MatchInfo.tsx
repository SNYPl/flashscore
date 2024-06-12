import React from "react";
import style from "./style.module.css";
import FormInfo from "./formInfo/FormInfo";
import NotPlay from "./notPlay/NotPlay";

const MatchInfo: React.FC = () => {
  return (
    <section>
      <FormInfo />
      <NotPlay />
    </section>
  );
};

export default MatchInfo;
