import LivematchItem from "./LivematchItem";
import { useMatchesState } from "../../context/livescores/context";

export default function LiveMatches() {
  const state: any = useMatchesState();

  const favoriteSports = JSON.parse(
    localStorage.getItem("favouriteSports") || "{}",
  );
  const favoriteTeams = JSON.parse(
    localStorage.getItem("favouriteTeams") || "{}",
  );
  const authToken = localStorage.getItem("authToken");

  const { matches, isLoading, isError, errorMessage } = state;
  // console.log("matches",matches)
  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const live = matches.filter((match: any) => {
    //favoriteSports[match.sportName] === true && match.teams.some((team: any) => favoriteTeams[team.name] === true)
    const isFavoriteSport = favoriteSports[match.sportName] === true;
    const hasFavoriteTeams = Object.values(favoriteTeams).some(
      (value) => value === true,
    );
    if (isFavoriteSport && !hasFavoriteTeams) {
      return true;
    }

    if (isFavoriteSport && hasFavoriteTeams) {
      return match.teams.some((team: any) => favoriteTeams[team.name] === true);
    }
    return false;
  });

  if (authToken && live.length == 0) {
    return <h1>No Live Matches</h1>;
  }
  return (
    <>
      <div className="flex px-4">
        {authToken
          ? live?.map((match: any) => (
              <LivematchItem key={match.id} id={match.id} />
            ))
          : matches.map((match: any) => (
              <LivematchItem key={match.id} id={match.id} />
            ))}
      </div>
    </>
  );
}
