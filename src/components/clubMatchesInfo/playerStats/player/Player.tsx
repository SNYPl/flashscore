import React from "react";
import style from "./style.module.css";

const Player = () => {
  return (
    <div
      className={` ${style.infoItem} flex items-center justify-between p-4 mb-4`}
    >
      <p className={`${style.infoIndex} font-semibold`}>1.</p>
      <div className=" flex items-center">
        <span className={`${style.infoIcon} mr-2`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="16" height="16" fill="url(#pattern0_310_9728)" />
            <defs>
              <pattern
                id="pattern0_310_9728"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_310_9728"
                  transform="scale(0.0208333)"
                />
              </pattern>
              <image
                id="image0_310_9728"
                width="48"
                height="48"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </span>
        <h3 className={`${style.infoTitle} font-semibold `}>Jude Bellingham</h3>
      </div>
      <p className={`${style.infoNumber} font-semibold `}>32</p>
      <p className={`${style.infoNumber} font-semibold `}>3</p>
      <p className={`${style.infoNumber} font-semibold `}>90</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
    </div>
  );
};

export default Player;
