import React from "react";
import style from "./style.module.css";

const SignSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
      stroke="#555E61"
    />
    <path d="M8 4.5H8.0065" stroke="#555E61" strokeLinecap="round" />
    <path
      d="M6.6001 7.30005H8.0001V10.8M6.6001 10.8H9.4001"
      stroke="#555E61"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MatchesInfoTips = () => {
  const infoText = [
    { color: "004682", text: "Promotion - Champions League (Group Stage: )" },
    { color: "7F0029", text: "Promotion - Europa League (Group Stage: )" },
    {
      color: "B8860B",
      text: "Promotion - Europa Conference League (Qualification: )",
    },
    { color: "BD0000", text: "Relegation - Championship" },
  ];

  return (
    <article className={`${style.info} mt-4 flex flex-rows justify-between`}>
      <div className="flex flex-col ">
        {infoText.map((el, id) => (
          <div className="flex items-center gap-x-3 mb-2" key={id}>
            <span
              className="rounded-xl"
              style={{
                backgroundColor: `#${el.color}`,
                width: "14px",
                height: "14px",
              }}
            ></span>
            <p className="text-xs">{el.text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-x-2 mb-2">
          <span className="text-xs">
            <SignSvg />
          </span>
          <p className="text-xs">Nottingham: -4 points (Federation decision)</p>
        </div>
        <div className="flex items-center gap-x-2 mb-2">
          <span className="text-xs">
            <SignSvg />
          </span>
          <p className="text-xs">Everton: -8 points (Federation decision)</p>
        </div>
      </div>
    </article>
  );
};

export default MatchesInfoTips;
