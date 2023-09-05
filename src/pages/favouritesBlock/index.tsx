import React, { Suspense } from "react";
const Favourites = React.lazy(() => import("./Favourites"));
import ErrorBoundary from "../../components/ErrorBoundary";

//import Favourites from './Favourites';

const Favouriteslist = () => {
  return (
    <div className="m-2 bg-gray-200">
      <h1 className="py-3 px-6 font-bold text-2xl">Favourites</h1>
      <div className="m-2">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <Favourites />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Favouriteslist;
