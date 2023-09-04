import { useState , useEffect } from 'react';
import { Disclosure  , Menu  } from "@headlessui/react";
import Logo from "../assets/react.svg";
import setting from "../assets/setting1.svg"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { useSportsState } from '../context/sports/context';
import { useTeamsState } from '../context/teams/context';
import { Team } from '../context/teams/reducer';
import { Sport } from '../context/sports/reducer';
import { API_ENDPOINT } from '../config/constants';





const Appbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
 // console.log("auth",authToken)
  const userData = localStorage.getItem("userData");
  // console.log("user",userData)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [favouriteSports, setFavouriteSports] = useState<{ [sportName: string]: boolean }>({});
  const [favouriteTeams, setFavouriteTeams] = useState<{ [teamName: string]: boolean }>({});
  
  const [tempFavouriteSports, setTempFavouriteSports] = useState<{ [sportName: string]: boolean }>({});
  const [tempFavouriteTeams, setTempFavouriteTeams] = useState<{ [teamName: string]: boolean }>({});



  // console.log("tempsports",tempFavouriteSports)
  // console.log("tempteams",tempFavouriteTeams)

  // console.log("favsports",favouriteSports)
  // console.log("favteams",favouriteTeams)

  const handleSportCheckbox = (event:any) =>{
    const { id, checked } = event.target;
    setTempFavouriteSports((previousSports) => ({
      ...previousSports,
      [id]: checked,
    }));
  }

  const handleTeamCheckbox = (event:any) =>{
    const { id, checked } = event.target;
    setTempFavouriteTeams((previousTeams) => ({
      ...previousTeams,
      [id]: checked,
    }));
  }

  const sports = useSportsState();
  const teams = useTeamsState();

  


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
            
          },
        });
        if (response.ok) {
          const data = await response.json();
          //console.log("pref",data.preferences)

          if (data.preferences.sports && data.preferences.teams) {
            setFavouriteSports(data.preferences.sports);
            setFavouriteTeams(data.preferences.teams);
            localStorage.setItem("favouriteSports", JSON.stringify(data.preferences.sports));
            localStorage.setItem("favouriteTeams", JSON.stringify(data.preferences.teams));
          } else {
            setFavouriteSports({});
            setFavouriteTeams({});
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if(authToken){
    fetchData();
    }
  }, []);

  // console.log("sports",sportsData)
  // console.log("sports",  Object.keys(sportsData).length)
  // console.log("teams",teamsData)

  const sports1 =  sports?.sports;
  const teams1 =  teams?.teams;
  

  // console.log("sports1",sports1)
  // console.log("teams1",teams1)

  const handleLinkClick = async () => {
    setTempFavouriteSports(favouriteSports);
    setTempFavouriteTeams(favouriteTeams);
    setIsDialogOpen(true);
  };

  const signout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("favouriteSports");
    localStorage.removeItem("favouriteTeams");
    navigate("/home");
  };

  const handleCancel = () => {
    setTempFavouriteSports(favouriteSports);
    setTempFavouriteTeams(favouriteTeams);
    setIsDialogOpen(false);
  };


  const handleSave = async () => {
    setFavouriteSports(tempFavouriteSports);
    setFavouriteTeams(tempFavouriteTeams);
    localStorage.setItem("favouriteSports", JSON.stringify(tempFavouriteSports));
    localStorage.setItem("favouriteTeams", JSON.stringify(tempFavouriteTeams));

    try {
      const preferences = {
        sports: tempFavouriteSports,
        teams: tempFavouriteTeams,
      };
  
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
      });
  

      if (!response.ok) {
       // console.log("error")
        throw new Error("Failed to save data");
      }

      console.log("Data saved successfully");

      setIsDialogOpen(false);

    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <Disclosure as="nav" className="bg-gray-100 shadow-lg">
      {() => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img className="h-8 mr-2" src={Logo} alt="Logo" />
                <span className="font-bold text-xl">SPORTS NEWS</span>
              </div>
              <div >
              <Menu as="div" className="relative inline-block text-left">
              {authToken ? (
                <Menu.Button onClick={() => handleLinkClick()}  className="h-8 w-8 rounded-full  hover:bg-blue-600 flex items-center justify-center focus:outline-none">
                  <img className="h-6 w-6" src={setting}/>
                </Menu.Button>
              ): (
                <></>
                )}
                    <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                className="relative z-50"
                >
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-white">
                    <div className="flex justify-end">
                    <button onClick={() => setIsDialogOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
                    </button>
                  </div>
                  
                    <div>
                      <Dialog.Title  className="bg-white  font-bold text-2xl py-2">Preferences</Dialog.Title>
                  
                    </div>
                    <div className="p-2 flex flex-wrap">
                      <h1 className="font-bold text-xl">Favourite Sports</h1>
                      <div className="py-2 flex flex-wrap">
                            {sports1?.map((sport: Sport) => (
                              <div key={sport.id} className="w-1/3 mb-4 px-2">
                                <input
                                  type="checkbox"
                                  id={sport.name}
                                  value={sport.name}
                                  checked={ tempFavouriteSports[sport.name]  || false}
                                   onChange={handleSportCheckbox}
                                />
                                <label htmlFor={sport.name} className="ml-2">
                                  {sport.name}
                                </label>
                              </div>
                            ))}
                      </div>
                      <h1 className="font-bold text-xl">Favourite Teams</h1>
                      <div className="py-2 flex flex-wrap">
                            {teams1?.map((team: Team) => (
                              <div key={team.id} className="w-1/3 mb-4 px-2">
                                <input
                                  type="checkbox"
                                  id={team.name}
                                  value={team.name}
                                  checked={tempFavouriteTeams[team.name]  || false}
                                   onChange={handleTeamCheckbox}
                                />
                                <label htmlFor={team.name} className="ml-2">
                                  {team.name}
                                </label>
                              </div>
                            ))}
                      </div>

                      <button className="bg-gray-800 px-2 py-2 text-white hover:bg-blue-700 text-xl" onClick={() => handleCancel()}>
                        cancel
                      </button>
                      <button onClick={()=> handleSave()} className="bg-gray-800 px-2 py-2 mx-2 text-white  hover:bg-blue-700 text-xl">
                        save
                      </button>
                  </div>
                    </Dialog.Panel>
                </div>
                </Dialog>
              </Menu>
              <Menu as="div" className="relative px-2 inline-block text-left">
                <Menu.Button className="h-8 w-8 rounded-full  hover:bg-blue-600 flex items-center justify-center focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
                </Menu.Button>
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {authToken ? (
                    <Menu.Item>
                      <button
                        onClick={signout}
                        className="block w-full px-4 py-2 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  ) : (
                    <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/signin"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign In
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                      to="/signup"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign Up
                        </Link>
                    )}
                  </Menu.Item> 
                  </>
                  )}
                </Menu.Items>
                      
              </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Appbar;
