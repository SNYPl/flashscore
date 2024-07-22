import UserLists from "@/components/userLists/UserLists";
import Predictions from "@/components/predictions/Predictions";
import CountryLeague from "@/components/CountryLigue/CountryLeague";

export default function Home() {
  return (
    <main className=" flex  py-4 pb-0 container gap-x-4 mobailmain">
      <div className="mobileNone">
        <UserLists />
      </div>
      <CountryLeague />
      <div className="mobileNone">
        <Predictions />
      </div>
    </main>
  );
}
