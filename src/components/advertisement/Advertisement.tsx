import React from "react";
import Image from "next/image";

const Advertisement: React.FC = () => {
  return (
    <section className={"flex justify-center items-center my-4"}>
      <Image
        src="/images/adversitment.jpg"
        alt="AD"
        width={1180}
        height={100}
      />
    </section>
  );
};

export default Advertisement;
