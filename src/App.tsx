import { RouterProvider } from "react-router-dom";
// import { useContext } from "react";
import "./App.css";
import router from "./routes";
import React, { useContext } from "react";
import { ThemeContext } from "./context/theme";
import { ArticlesProvider } from "./context/articles/context.tsx";
import { MatchesProvider } from "./context/livescores/context.tsx";
import { TeamsProvider } from "./context/teams/context.tsx";
import { SportsProvider } from "./context/sports/context.tsx";

const App = () => {
  const currentTheme = useContext(ThemeContext);

  return (
    <div
      className={`h-full w-full mx-auto py-2 ${
        currentTheme.theme === "dark" ? "dark" : ""
      }`}
    >
      <SportsProvider>
        <TeamsProvider>
          <MatchesProvider>
            <ArticlesProvider>
              <RouterProvider router={router} />
            </ArticlesProvider>
          </MatchesProvider>
        </TeamsProvider>
      </SportsProvider>
    </div>
  );
};
export default App;
