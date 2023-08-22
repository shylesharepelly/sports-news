import React, { useEffect, useState } from "react";
import { useSportsState } from "../../context/sports/context";
import { useTeamsState } from "../../context/teams/context";
import { fetchTeams } from '../../context/teams/actions';
import { fetchSports } from '../../context/sports/actions';
import { useSportsDispatch } from '../../context/sports/context';
import { useTeamsDispatch } from '../../context/teams/context';
import Favouriteitems from "./Favouriteitems";

const Favourites: React.FC = () => {
    const sportsState = useSportsState();
    const sportsDispatch = useSportsDispatch();
  
    const teamsState = useTeamsState();
    const teamsDispatch = useTeamsDispatch();
  
    const [selectedSport, setSelectedSport] = useState<string>("");
    const [selectedTeam, setSelectedTeam] = useState<string>("");
  
    useEffect(() => {
      fetchSports(sportsDispatch);
      fetchTeams(teamsDispatch);
    }, [sportsDispatch, teamsDispatch]);
  
    const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedSportName = event.target.value;
      setSelectedSport(selectedSportName);
      setSelectedTeam("");
    }
    
    const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeam(event.target.value);
    };

    return (
      <div className="container">
        <div className="dropdown-container  p-4">
          <select className="dropdown p-2 border  border-black rounded-md" value={selectedSport} onChange={handleSportChange}>
            <option value="">Select Sport</option>
            {sportsState?.sports.map((sport: any) => (
              <option key={sport.id} value={sport.name}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>

        {selectedSport && (
          <div className="dropdown-container p-4">
            <select className="dropdown p-2 border  border-black rounded-md" value={selectedTeam} onChange={handleTeamChange}>
              <option value="">Select Team</option>
              {teamsState?.teams
                .filter((team: any) => team.plays === selectedSport)
                .map((team: any) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <Favouriteitems selectedSport={selectedSport} selectedTeam={selectedTeam}  />
      </div>
    )
}

export default Favourites;
