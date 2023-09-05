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

  const favoriteSports = JSON.parse(localStorage.getItem("favouriteSports") || "{}");
  
  const favoriteTeams = JSON.parse(localStorage.getItem("favouriteTeams") || "{}");
  const authToken = localStorage.getItem("authToken");

  // useEffect(() => {
  //   fetchArticles(dispatchArticles);
  // }, [dispatchArticles, favoriteSports]);


  //console.log("favsports",favoriteSports)
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("date");
  // eslint-disable-next-line
  const [filterValue, setFilterValue] = useState("");
// eslint-disable-next-line
  const { articles, isLoading, isError, errorMessage } = state;
  if ( isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }


  

  // const filteredArticles = articles.filter((article:any) => {
  //   return (
  //     !selectedSport ||  (favoriteSports[selectedSport] && favoriteSports[selectedSport] === true) 
  //   );
  // });

  


  const applyFilter = (article: any) => {
    if ( article.sport.name === selectedSport) {
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
    else if(selectedSport==""){
      if(authToken){
      return favoriteSports[article.sport.name] === true && 
      ( article.teams.length === 0  || article.teams.some((team: any) => favoriteTeams[team.name] === true));
      }
      else{
        return true
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
      <div className="flex border shadow-lg bg-slate-100">
        <div className="w-full p-2">
          <div className="px-5 mb-4 flex">
            <button  onClick={() => setSelectedSport("")}
              className={`px-4 py-2 mr-2 text-sm font-medium rounded ${
                selectedSport === "" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              Your News
            </button>
            {Array.from(new Set(articles.map((article: any) => article.sport.name))).map((sportName: any) => (
              <button
                key={sportName}
                onClick={() => setSelectedSport(sportName)}
                className={`px-4 py-2 mr-2 text-sm font-medium rounded ${
                  selectedSport === sportName ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:border border-b-black"
                }`}
              >
                {sportName}
              </button>
            ))}
            
          </div>
        </div>

        <div className="w-full p-4">
          <div className="mb-2 flex items-center justify-end">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 text-sm rounded border border-black font-bold bg-white text-gray-600"
            >
              <option value="sportname">Sport Name</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
            <div className="p-1 bg-slate-400 m-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
</svg>

            </div>
           
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
