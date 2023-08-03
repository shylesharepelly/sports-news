import { RouterProvider } from "react-router-dom";
// import { useContext } from "react";
import "./App.css";
import router from "./routes";

import { ArticlesProvider } from './context/articles/context.tsx'
import { MatchesProvider } from "./context/livescores/context.tsx";

const App = () => {
  return (
    <div>
      <MatchesProvider>
        <ArticlesProvider>
           <RouterProvider router={router} />
        </ArticlesProvider>
      </MatchesProvider>
    </div>
  );
};
export default App;
