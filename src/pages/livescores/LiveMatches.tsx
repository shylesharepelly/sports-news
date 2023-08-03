import React from "react";
import {
  useMatchesState,
  useMatchesDispatch,
} from "../../context/livescores/context";

export default function LiveMatches() {
  const state: any = useMatchesState();
  const dispatchMembers = useMatchesDispatch();

  const { matches, isLoading, isError, errorMessage } = state;
  console.log("matches",matches)
  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

 

  return (
    <>
      {matches.map((match: any) => (
        <div
          key={match.id}
          className="member p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {match.name}
          </h5>
          
        
        </div>
      ))}
    </>
  );
}
