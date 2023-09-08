//import AllMatches from "./AllMatches";

import React, { Suspense } from "react";
const AllMatches = React.lazy(() => import("./AllMatches"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Livescore = () => {
  return (
    <div>
      <div className="font-bold text-xl px-5 py-2 dark:text-white dark:bg-gray-500">
        Live Games
      </div>
      <div className="flex px-4 py-2  shadow-lg  dark:bg-gray-300">
        <div className="flex space-x-10">
          <ErrorBoundary>
            <Suspense
              fallback={<div className="suspense-loading">Loading...</div>}
            >
              <AllMatches />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Livescore;
