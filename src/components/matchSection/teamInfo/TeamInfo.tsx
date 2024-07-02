import React from "react";
import style from "./style.module.css";
import Image from "next/image";

interface props {
  data: any;
}

const Icon = () => (
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
      d="M6.59961 7.29999H7.99961V10.8M6.59961 10.8H9.39961"
      stroke="#555E61"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TeamInfo: React.FC<props> = ({ data }) => {
  console.log(data);
  return (
    <section className={`${style.teamInfo}  w-full px-3`}>
      <article className="flex justify-around">
        <div className={`${style.infoItem} flex flex-col`}>
          <div className={`${style.infoImage}`}>
            <Image
              src={data?.HOME_IMAGES[0]}
              alt="club"
              width={55}
              height={55}
            />
          </div>
          <h3 className="text-center font-bold">{data?.HOME_NAME}</h3>
        </div>

        <div className={`${style.infoTime} flex flex-col items-center`}>
          <p className="mb-5">19.05.2024 21:00</p>
          <h4>
            <svg
              width="13"
              height="5"
              viewBox="0 0 13 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5581 -0.00142133V4.81818H0.438743V-0.00142133H12.5581Z"
                fill="#00141E"
              />
            </svg>
          </h4>
        </div>

        <div className={`${style.infoItem} flex flex-col`}>
          <div className={`${style.infoImage}`}>
            <Image src="/images/club.svg" alt="club" width={55} height={55} />
          </div>
          <h3 className="text-center font-bold">Villarreal</h3>
        </div>
      </article>
      <div className={`flex justify-center items-center ${style.infoText}`}>
        <p className="">
          <span className="mr-1">
            <Icon />
          </span>
          Neutral location - Wembley Stadium.
        </p>
      </div>
    </section>
  );
};

export default TeamInfo;
