import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface playerProps {
  id: string;
  name: string;
  image: string;
  number: number;
  playerEvents: any[];
  isLoading: boolean;
  typeId: string;
}

const Career: React.FC<playerProps> = ({
  id,
  image,
  name,
  number,
  playerEvents,
  isLoading = true,
  typeId,
}) => {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");

  return (
    <div
      className={` ${style.infoItem} flex items-center justify-between p-4 mb-4`}
    >
      <p className={`${style.infoIndex} font-semibold`}>{number}</p>
      <div className=" flex items-center">
        <span className={`${style.infoIcon} mr-2`}>
          <Image src={image} width={20} height={20} alt="player" />
        </span>
        <Link href={`/player/${name}/?playerId=${id}&sportId=${sportId}`}>
          <h3 className={`${style.infoTitle} font-semibold `}>{name}</h3>
        </Link>
      </div>
      <p>Season</p>
      <p>Team</p>
      <p>Competition</p>
      <p>R</p>
      <p className={`${style.infoNumber} font-semibold `}>2</p>
      <p className={`${style.infoNumber} font-semibold `}>3</p>
      <p className={`${style.infoNumber} font-semibold `}>4</p>
      <p className={`${style.infoNumber} font-semibold `}>5</p>
      <p className={`${style.infoNumber} font-semibold `}>1</p>
      <p className={`${style.infoNumber} font-semibold `}>2</p>
    </div>
  );
};

export default Career;
