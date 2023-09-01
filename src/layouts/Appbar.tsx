import { useState } from 'react';
import { Disclosure  , Menu  } from "@headlessui/react";
import Logo from "../assets/react.svg";
import setting from "../assets/setting1.svg"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { useSportsState } from '../context/sports/context';
import { useTeamsState } from '../context/teams/context';
import { Sport } from '../context/sports/reducer';
import { Team } from '../context/teams/reducer';



const Appbar = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sports = useSportsState();
  const teams = useTeamsState();


  
  const handleLinkClick = async () => {
    setIsDialogOpen(true);
  };

  const signout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/home");
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
                <Menu.Button onClick={() => handleLinkClick()}  className="h-8 w-8 rounded-full  hover:bg-blue-600 flex items-center justify-center focus:outline-none">
                  <img className="h-6 w-6" src={setting}/>
                </Menu.Button>

                    <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                className="relative z-50"
                >
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-white">
                    <div className="flex justify-end">
                    <button onClick={() => setIsDialogOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
                    </button>
                  </div>
                  
                    <div>
                      <Dialog.Title  className="bg-white  font-bold text-2xl py-2">Preferences</Dialog.Title>
                  
                    </div>
                    <div className="p-2 flex flex-wrap">
                      <h1 className="font-bold text-xl">Favourite Sports</h1>
                      <div className="py-2 flex flex-wrap">
                            {sports?.sports.map((sport: any) => (
                              <div key={sport.id} className="w-1/3 mb-4 px-2">
                                <input
                                  type="checkbox"
                                  id={sport.name}
                                  value={sport.name}
                                />
                                <label htmlFor={sport.name} className="ml-2">
                                  {sport.name}
                                </label>
                              </div>
                            ))}
                      </div>
                      <h1 className="font-bold text-xl">Favourite Sports</h1>
                      <div className="py-2 flex flex-wrap">
                            {teams?.teams.map((team: any) => (
                              <div key={team.id} className="w-1/3 mb-4 px-2">
                                <input
                                  type="checkbox"
                                  id={team.name}
                                  value={team.name}
                                />
                                <label htmlFor={team.name} className="ml-2">
                                  {team.name}
                                </label>
                              </div>
                            ))}
                      </div>

                      <button className="bg-gray-800 px-2 py-2 text-white hover:bg-blue-700 text-xl" onClick={() => setIsDialogOpen(false)}>
                        cancel
                      </button>
                      <button className="bg-gray-800 px-2 py-2 mx-2 text-white  hover:bg-blue-700 text-xl">
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
                        className="block px-4 py-2 text-sm text-gray-700"
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
