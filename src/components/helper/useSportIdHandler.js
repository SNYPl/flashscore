import { usePathname } from "next/navigation";
import { sportNavigation } from "@/lib/sportNavigation";

export const useSportIdHandler = () => {
  const pathName = usePathname();

  const foundSport = sportNavigation.find((el) => {
    const alt = el.alt.replace(/^\//, "");
    const regex = new RegExp(`^/${alt}(/|$)`);

    return regex.test(pathName);
  });

  if (foundSport) {
    return foundSport;
  } else {
    return null;
  }
};
