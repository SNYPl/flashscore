import React from "react";
import { LogoImg } from "@/common/svg/logo";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ matchRouteHandler }: { matchRouteHandler: boolean }) => {
  return (
    <article className={`${matchRouteHandler ? " pl-4" : ""}`}>
      <Link href={"/"}>
        <Image
          src={"/images/header/logo.svg"}
          alt="logo"
          width={165}
          height={35}
        />
      </Link>
    </article>
  );
};

export default Logo;
