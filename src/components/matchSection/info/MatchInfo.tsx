import React from "react";
import style from "./style.module.css";
import FormInfo from "./formInfo/FormInfo";
import NotPlay from "./notPlay/NotPlay";

interface props {
  eventData: any;
  h2hData: any;
  summaryData: any;
}

const MatchInfo: React.FC<props> = ({ eventData, h2hData, summaryData }) => {
  return (
    <section>
      <FormInfo eventData={eventData} h2hData={h2hData} />
      <NotPlay summaryData={summaryData} />
    </section>
  );
};

export default MatchInfo;
