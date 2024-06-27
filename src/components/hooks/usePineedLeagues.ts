import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const usePinnedLeagues = () => {
  const [pinnedLeagueIds, setPinnedLeagueIds] = useLocalStorage<string[]>(
    "leagueIds",
    []
  );

  useEffect(() => {
    let pinnedIds = JSON.parse(localStorage.getItem("leagueIds") || "[]");

    if (pinnedIds.length === 0 || undefined || null) {
      const arrayOfIds = [
        "xjLzNo5G",
        "hYZkYQNG",
        "vJuMPo6c",
        "Y1GgcKlj",
        "x0z4oZsj",
        "A1MYWy8T",
      ];
      setPinnedLeagueIds(arrayOfIds);
      return;
    }

    setPinnedLeagueIds(pinnedIds);
  }, []);

  const addLeagueToLocalStorage = (tournamentId: string) => {
    if (pinnedLeagueIds.includes(tournamentId)) {
      setPinnedLeagueIds(pinnedLeagueIds.filter((id) => id !== tournamentId));
    } else {
      setPinnedLeagueIds([...pinnedLeagueIds, tournamentId]);
    }
  };

  const removePinnedLeague = (tournamentId: string) => {
    if (pinnedLeagueIds.includes(tournamentId)) {
      setPinnedLeagueIds(pinnedLeagueIds.filter((id) => id !== tournamentId));
    }
  };

  return { pinnedLeagueIds, addLeagueToLocalStorage, removePinnedLeague };
};
