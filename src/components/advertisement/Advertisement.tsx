"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Advertisement: React.FC = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");

  return (
    <section
      className={`${
        matchRouteHandler ? "matchContainer" : ""
      } flex justify-center items-center my-4`}
    >
      <Image
        src="/images/adversitment.jpg"
        alt="AD"
        width={1180}
        height={100}
        className="max-w-full"
      />
    </section>
  );
};

export default Advertisement;
