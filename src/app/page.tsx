import Image from "next/image";
import UserLists from "@/components/userLists/UserLists";
import AllMatchInfos from "@/components/allMatchInfoSection/AllMatchInfos";

export default function Home() {
  return (
    <main className="container flex min-h-screen   py-4">
      <UserLists />
      <AllMatchInfos />
    </main>
  );
}
