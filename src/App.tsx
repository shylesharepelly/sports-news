import { RouterProvider } from "react-router-dom";
// import { useContext } from "react";
import "./App.css";
import router from "./routes";

import { ArticlesProvider } from './context/articles/context.tsx'
import { MatchesProvider } from "./context/livescores/context.tsx";
import { TeamsProvider } from "./context/teams/context.tsx";
import { SportsProvider } from "./context/sports/context.tsx";

const App = () => {
  return (
    <div>
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
