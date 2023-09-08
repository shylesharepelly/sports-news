import React, { useEffect, useState } from "react";
import { useSportsState } from "../../context/sports/context";
import { useTeamsState } from "../../context/teams/context";
import { fetchTeams } from "../../context/teams/actions";
import { fetchSports } from "../../context/sports/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { useTeamsDispatch } from "../../context/teams/context";
import Favouriteitems from "./Favouriteitems";

const Favourites: React.FC = () => {
  const sportsState = useSportsState();
  const sportsDispatch = useSportsDispatch();

  const teamsState = useTeamsState();
  const teamsDispatch = useTeamsDispatch();

  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
  }, [sportsDispatch, teamsDispatch]);

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSportName = event.target.value;
    setSelectedSport(selectedSportName);
    setSelectedTeam("");
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  const favoriteSports = JSON.parse(
    localStorage.getItem("favouriteSports") || "{}",
  );
  const favoriteSportsList = sportsState?.sports.filter(
    (sport: any) => favoriteSports[sport.name] === true,
  );

  const favoriteTeams = JSON.parse(
    localStorage.getItem("favouriteTeams") || "{}",
  );
  const favoriteTeamsList = teamsState?.teams.filter(
    (team: any) => favoriteTeams[team.name] === true,
  );

  return (
    <div className="container">
      <div className="dropdown-container  p-4">
        <select
          className="dropdown p-2 border  border-black dark:border-white rounded-md dark:bg-gray-600"
          value={selectedSport}
          onChange={handleSportChange}
        >
          <option value="" className="dark:bg-gray-600">
            Select Sport
          </option>
          {authToken
            ? favoriteSportsList?.map((sport: any) => (
                <option
                  key={sport.id}
                  value={sport.name}
                  className="dark:bg-gray-600"
                >
                  {sport.name}
                </option>
              ))
            : sportsState?.sports.map((sport: any) => (
                <option
                  key={sport.id}
                  value={sport.name}
                  className="dark:bg-gray-600"
                >
                  {sport.name}
                </option>
              ))}
        </select>
      </div>

      {selectedSport && (
        <div className="dropdown-container p-4">
          <select
            className="dropdown p-2 border dark:bg-gray-600 dark:border-white  border-black rounded-md"
            value={selectedTeam}
            onChange={handleTeamChange}
          >
            <option value="" className="dark:bg-gray-600">
              Select Team
            </option>
            {authToken
              ? favoriteTeamsList
                  ?.filter((team: any) => team.plays === selectedSport)
                  .map((team: any) => (
                    <option
                      key={team.id}
                      value={team.name}
                      className="dark:bg-gray-600"
                    >
                      {team.name}
                    </option>
                  ))
              : teamsState?.teams
                  .filter((team: any) => team.plays === selectedSport)
                  .map((team: any) => (
                    <option
                      key={team.id}
                      value={team.name}
                      className="dark:bg-gray-600"
                    >
                      {team.name}
                    </option>
                  ))}
          </select>
        </div>
      )}

      <Favouriteitems
        selectedSport={selectedSport}
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

export default Favourites;
