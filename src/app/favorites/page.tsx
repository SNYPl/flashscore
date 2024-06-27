import Predictions from "@/components/predictions/Predictions";
import UserTeams from "@/components/userLists/userTeams/UserTeams";
import FavoritesSection from "@/components/favourite/Favorites";

export default function Favorites() {
  return (
    <main className=" flex  py-4 pb-0 container gap-x-4">
      <UserTeams />
      <FavoritesSection />
      <Predictions />
    </main>
  );
}
