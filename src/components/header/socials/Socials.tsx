"use client";
import React, { useState } from "react";
import Link from "next/link";
import style from "./style.module.css";
import Image from "next/image";
import { Modal } from "antd";
import { usePathname } from "next/navigation";

const socialArray = [
  { component: "1", w: 9, h: 15, alt: "fb", href: "" },
  { component: "2", w: 17, h: 15, alt: "tw", href: "" },
  { component: "3", w: 15, h: 15, alt: "inst", href: "" },
  { component: "4", w: 18, h: 15, alt: "email", href: "" },
];

const Socials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      className={`flex items-center justify-center gap-x-5 ${
        matchRouteHandler ? "hide" : ""
      }`}
    >
      <div
        className={`flex justify-between items-center gap-x-4 ${style.socialItems}`}
      >
        {socialArray.map((el, id) => (
          <Link href={el.href} key={id} target="_blank">
            <span
              style={{
                background: `url(/images/socials/soc-${el.component}.svg) top no-repeat`,
                width: el.w,
              }}
            ></span>
          </Link>
        ))}
      </div>
      <div className={style.blitz}>
        <Image
          src="/images/header/blitz.svg"
          alt="blitz"
          width={60}
          height={20}
          onClick={showModal}
        />
        <Modal
          title=""
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          className={style.modal}
          classNames={{ content: style.modalBody, wrapper: style.wrapper }}
          style={{ transformOrigin: "400px 20px" }}
        >
          <article>
            <div
              className={`flex justify-center items-center p-6 ${style.blitzHover}`}
            >
              <Link href="#">
                <div>
                  <Image
                    src={"images/header/blitz/BLITZ.svg"}
                    alt="blitz"
                    width={87}
                    height={27}
                  />
                </div>
              </Link>
            </div>
            <article className={`${style.supportItems} flex`}>
              <div className={`${style.itemOne} flex`}>
                <div className={`flex justify-center items-center  `}>
                  <Link
                    href="#"
                    target="_blank"
                    className="w-full h-full flex justify-center items-center relative"
                  >
                    <Image
                      src={"images/header/blitz/soccer.svg"}
                      alt="soccer"
                      width={90}
                      height={20}
                    />
                  </Link>
                </div>
                <div className="flex justify-center items-center ">
                  <Link
                    href="#"
                    target="_blank"
                    className="w-full h-full flex justify-center items-center"
                  >
                    <Image
                      src={"images/header/blitz/FOTBALLNEWS.svg"}
                      alt="football"
                      width={145}
                      height={12}
                    />
                  </Link>
                </div>
              </div>
              <div className={` justify-center items-center  ${style.itemTwo}`}>
                <div className="flex justify-center items-center ">
                  <Link
                    href="#"
                    target="_blank"
                    className="w-full h-full flex justify-center items-center"
                  >
                    <Image
                      src={"images/header/blitz/ISPORT.svg"}
                      alt="isport"
                      width={90}
                      height={22}
                    />
                  </Link>
                </div>
                <div className={`flex justify-center items-center  `}>
                  <Link
                    href="#"
                    target="_blank"
                    className="w-full h-full flex justify-center items-center relative"
                  >
                    <Image
                      src={"images/header/blitz/INEWS.svg"}
                      alt="inews"
                      width={80}
                      height={23}
                    />
                  </Link>
                </div>
              </div>
            </article>
          </article>
        </Modal>
      </div>
    </section>
  );
};

export default Socials;
