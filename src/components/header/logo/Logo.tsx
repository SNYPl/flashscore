import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = ({
  matchRouteHandler,
  isNavFixed,
}: {
  matchRouteHandler: boolean;
  isNavFixed: boolean;
}) => {
  return (
    <article className={`${matchRouteHandler ? " pl-4" : ""} `}>
      <Link href={"/"}>
        <Image
          src={"/images/header/logo.svg"}
          alt="logo"
          width={!isNavFixed ? 165 : 120}
          height={!isNavFixed ? 35 : 25}
          className={"transition-3  "}
        />
      </Link>
    </article>
  );
};

export default Logo;
