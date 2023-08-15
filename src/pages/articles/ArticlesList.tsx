import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch, useArticlesState } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";



const ArticlesList: React.FC = () => {
  const dispatchArticles = useArticlesDispatch();
  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, [dispatchArticles]);

  const state: any = useArticlesState();

  const [selectedSport, setSelectedSport] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("date");
  const [filterValue, setFilterValue] = useState("");

  const { articles, isLoading, isError, errorMessage } = state;

  const applyFilter = (article: any) => {
    if (!selectedSport || article.sport.name === selectedSport) {
      switch (selectedFilter) {
        case "sportname":
          return article.sport.name.includes(filterValue);
        case "date":
          return article.date.includes(filterValue);
        case "title":
          return article.title.includes(filterValue);
        default:
          return true;
      }
    }
    return false;
  };

  

  const sortArticles = (a: any, b: any) => {
    switch (selectedFilter) {
      case "sportname":
        return a.sport.name.localeCompare(b.sport.name);
      case "date":
        return a.date.localeCompare(b.date);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  };
  return (
    <div>
      <div className="flex border bg-slate-200">
        <div className="w-full p-2">
          <div className="px-5 mb-4 flex">
          <button  onClick={() => setSelectedSport("")}
              className={`px-4 py-2 mr-2 text-sm font-medium rounded ${
                selectedSport === "" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              News
            </button>
            {Array.from(new Set(articles.map((article: any) => article.sport.name))).map((sportName: any) => (
              <button
                key={sportName}
                onClick={() => setSelectedSport(sportName)}
                className={`px-4 py-2 mr-2 text-sm font-medium rounded ${
                  selectedSport === sportName ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {sportName}
              </button>
            ))}
            
          </div>
        </div>

        <div className="w-full p-4">
          <div className="mb-4 flex items-center justify-end">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 text-sm rounded font-bold bg-gray-100 text-gray-600"
            >
              <option value="sportname">Sport Name</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      

      <div className="m-4 bg-slate-200 ">
        {articles
          .filter(applyFilter)
          .sort(sortArticles)
          .map((article: any) => (
            <ArticleListItems key={article.id} article={article} />
          ))}
      </div>

    </div>
  );
};

export default ArticlesList;
