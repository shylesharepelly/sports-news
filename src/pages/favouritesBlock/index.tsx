import { Link  } from 'react-router-dom';
import { useEffect } from 'react';

import Favourites from './Favourites';

  const Favouriteslist = () => {

  return (

  <div className='m-2 bg-gray-200'>
    <h1 className="py-3 px-6 font-bold text-2xl">Favourites</h1>
    <div className='m-2'>
      <Favourites/>
      
    </div>
  </div>


  
)}

export default Favouriteslist