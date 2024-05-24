import UserLists from "@/components/userLists/UserLists";
import AllMatchInfos from "@/components/allMatchInfoSection/AllMatchInfos";
import Predictions from "@/components/predictions/Predictions";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <main className=" flex  min-h-screen py-4 pb-0 container gap-x-4">
      <UserLists />
      <AllMatchInfos />
      <Predictions />
    </main>
  );
}
