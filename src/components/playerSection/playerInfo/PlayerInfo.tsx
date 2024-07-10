import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

interface props {
  data: any;
  // h2hData: any;
}

const PlayerInfo = () => {
  const sportIdCheck = useSportIdHandler();

  return (
    <section
      className={`${style.playerInfo}  w-full px-3 flex justify-between items-center`}
    >
      <div className="flex gap-x-4">
        <div className={style.img}>
          <Image
            src="/images/player1.png"
            alt="player"
            width={72}
            height={72}
          />
        </div>
        <div className={`${style.info}`}>
          <h3 className="mb-1">Emiliano Martinez</h3>
          <div>
            <p>
              Goalkeeper:<span>(Aston Villa)</span>
            </p>
            <p>
              Age:<span>31(02.03.1994)</span>
            </p>
            <p>
              Market value:<span>27.0mln</span>
            </p>
            <p>
              Contract expires:<span>30.06.2027</span>
            </p>
          </div>
        </div>
      </div>
      <div className={`${style.img}`}>
        <Image src="/images/player1.png" alt="player" width={72} height={72} />
      </div>
    </section>
  );
};

export default PlayerInfo;
