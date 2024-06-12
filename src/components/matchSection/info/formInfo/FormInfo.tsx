import React from "react";
import style from "./style.module.css";
import Image from "next/image";

const FormInfo: React.FC = () => {
  return (
    <>
      <div className={`${style.title} mx-3 mb-1`}>
        <p>FORM</p>
      </div>
      <article
        className={`${style.formInfo}  flex justify-between p-3 gap-x-3 flex-col`}
      >
        <div className={`${style.infoItem}  p-2`}>
          <div className={`${style.infoItemCont} flex flex-row items-center`}>
            <div className={`${style.infoImage} mr-4`}>
              <Image src="/images/club.svg" alt="club" width={55} height={55} />
            </div>
            <div>
              <h3 className="text-left font-bold mb-2">Villarreal</h3>
              <div
                className={` items-center font-normal ${style.tableWords} gap-x-1`}
              >
                <p style={{ backgroundColor: "#C8CDCD" }}>?</p>
                <p className={style.greenColor}>W</p>
                <p className={style.yellowColor}>D</p>
                <p className={style.greenColor}>W</p>
                <p className={style.redColor}>L</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.vs} flex items-center justify-center`}>
          <p>VS</p>
        </div>

        <div className={`${style.infoItem} p-2`}>
          <div
            className={`${style.infoItemCont} flex  items-center flex-row-reverse`}
          >
            <div className={`${style.infoImage} ml-4`}>
              <Image src="/images/club.svg" alt="club" width={55} height={55} />
            </div>

            <div>
              <h3 className=" font-bold mb-2 text-right">Villarreal</h3>
              <div
                className={` items-center font-normal ${style.tableWords} gap-x-1`}
              >
                <p style={{ backgroundColor: "#C8CDCD" }}>?</p>
                <p className={style.greenColor}>W</p>
                <p className={style.yellowColor}>D</p>
                <p className={style.greenColor}>W</p>
                <p className={style.redColor}>L</p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className={`${style.title} mx-3 mb-4`}>
        <p>PREVIEW</p>
      </div>
      <div className={`${style.preview} mx-3 mb-1`}>
        <p className="mb-2">
          Life after Will Still got off to a respectable start for Reims, as
          they secured a hard-fought 1-1 draw against <b>UEFA</b> Champions
          League-chasing Brest in caretaker manager Samba Diawara’s first
          assignment, halting the three-game losing streak they were on when the
          Malian’s predecessor departed.
        </p>
        <p>
          Consequently, Reims find themselves 11th in Ligue 1 with two matches
          left and have the potential to realistically jump a place or two
          before the campaign’s conclusion. If that wish comes true, they’ll
          have secured their highest finish in the last four seasons, but the
          Stade Auguste-Delaune faithful won’t be holding their breath even
          though their side’s last two encounters are both at home, as they’ve
          witnessed just one win in their last seven such games (D3, L3).
        </p>
      </div>
    </>
  );
};

export default FormInfo;
