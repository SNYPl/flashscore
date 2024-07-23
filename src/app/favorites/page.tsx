import Predictions from "@/components/predictions/Predictions";
import UserTeams from "@/components/userLists/userTeams/UserTeams";
import FavoritesSection from "@/components/favourite/Favorites";
import dynamic from "next/dynamic";

export default function Favorites() {
  const NoSSR = dynamic(() => import("@/components/favourite/Favorites"), {
    ssr: false,
  });

  return (
    <main className=" flex  py-4 pb-0 container gap-x-4 mobailmain">
      <div className="mobileNone">
        <UserTeams />
      </div>
      <NoSSR />
      <div className="mobileNone">
        <Predictions />
      </div>
    </main>
  );
}
