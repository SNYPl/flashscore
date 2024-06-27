import { useLocalStorage } from "usehooks-ts";

interface FavouriteEvent {
  eventId: string;
  eventInfo: {
    awayTeam: string;
    awayImage: string;
    homeImage: string;
    homeTeam: string;
    homeScore: number;
    awayScore: number;
    status: string;
    time: string;
  };
}

interface LeagueInfo {
  NAME1: string;
  NAME2: string;
  url: string;
  countryId: number;
  countryName: string;
}

interface FavouriteLeague {
  mainLeagueID: string;
  leagueInfo: LeagueInfo;
  events: FavouriteEvent[];
}

export const useFavouriteLeagues = () => {
  const [favouriteLeagues, setFavouriteLeagues] = useLocalStorage<
    FavouriteLeague[]
  >("favouriteLeagues", []);

  const addToFavourite = (
    tournamentId: string,
    events: any[],
    leagueInfo: LeagueInfo,
    eventId?: string,
    eventInfo?: FavouriteEvent["eventInfo"]
  ) => {
    const existingLeague = favouriteLeagues.find(
      (fav) => fav.mainLeagueID === tournamentId
    );

    if (eventId && eventInfo) {
      if (existingLeague) {
        const updatedEvents = existingLeague.events.some(
          (event) => event.eventId === eventId
        )
          ? existingLeague.events.filter((event) => event.eventId !== eventId)
          : [...existingLeague.events, { eventId, eventInfo }];

        setFavouriteLeagues(
          updatedEvents.length === 0
            ? favouriteLeagues.filter(
                (fav) => fav.mainLeagueID !== tournamentId
              )
            : favouriteLeagues.map((fav) =>
                fav.mainLeagueID === tournamentId
                  ? { ...fav, events: updatedEvents }
                  : fav
              )
        );
      } else {
        setFavouriteLeagues([
          ...favouriteLeagues,
          {
            mainLeagueID: tournamentId,
            leagueInfo,
            events: [{ eventId, eventInfo }],
          },
        ]);
      }
    } else {
      const eventIds = events.map((event) => ({
        eventId: event.EVENT_ID,
        eventInfo: {
          awayTeam: event.AWAY_NAME,
          awayImage: event.AWAY_IMAGES,
          homeImage: event.HOME_IMAGES,
          homeTeam: event.HOME_NAME,
          homeScore: event.HOME_SCORE_CURRENT,
          awayScore: event.AWAY_SCORE_CURRENT,
          status: event.STAGE,
          time: event.START_TIME,
        },
      }));

      if (existingLeague) {
        const allEventsIncluded = eventIds.every((id) =>
          existingLeague.events.some((event) => event.eventId === id.eventId)
        );

        setFavouriteLeagues(
          allEventsIncluded
            ? favouriteLeagues.filter(
                (fav) => fav.mainLeagueID !== tournamentId
              )
            : favouriteLeagues.map((fav) =>
                fav.mainLeagueID === tournamentId
                  ? { ...fav, events: eventIds }
                  : fav
              )
        );
      } else {
        setFavouriteLeagues([
          ...favouriteLeagues,
          { mainLeagueID: tournamentId, leagueInfo, events: eventIds },
        ]);
      }
    }
  };

  return { favouriteLeagues, addToFavourite };
};
