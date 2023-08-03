import LivematchItem from "./LivematchItem";
import {
  useMatchesState,
} from "../../context/livescores/context";

export default function LiveMatches() {
  const state: any = useMatchesState();

  const { matches, isLoading, isError, errorMessage } = state;
 // console.log("matches",matches)
  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }


  return (
    <>
    <div className="flex px-4">
      {matches.map((match: any) => (
          
            <LivematchItem key={match.id} id={match.id} />
          
        ))}
    </div>
    </>
  );
}
