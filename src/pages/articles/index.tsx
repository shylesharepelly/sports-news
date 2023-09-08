// import { Link } from 'react-router-dom';
//import ArticlesList from './ArticlesList';
import React, { Suspense } from "react";
const ArticlesList = React.lazy(() => import("./ArticlesList"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Articles = () => {
  return (
    <div className="bg-slate-200 dark:bg-gray-600">
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ArticlesList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Articles;
