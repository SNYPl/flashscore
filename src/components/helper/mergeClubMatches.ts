export function mergeClubMatches(leagues: any[]) {
  const mergedLeagues: any = [];

  leagues?.forEach((league) => {
    const existingLeague = mergedLeagues.find(
      (l: any) => l.NAME === league.NAME
    );

    if (existingLeague) {
      existingLeague.EVENTS = existingLeague.EVENTS.concat(league.EVENTS);
    } else {
      mergedLeagues.push({ ...league });
    }
  });

  // Sort the EVENTS array within each league by START_TIME
  mergedLeagues.forEach((league: any) => {
    league.EVENTS.sort((a: any, b: any) => a.START_TIME - b.START_TIME);
  });

  return mergedLeagues;
}
