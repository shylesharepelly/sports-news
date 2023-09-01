// import React from 'react'
import Livescore from './livescores'
import Favourites from './favouritesBlock'
import Articles from './articles'
import Appbar from '../layouts/Appbar'


const Home = () => {
  return (

    <div className='m-4'>

      <Appbar/>
      <div className='bg-white'>
          <div>
              <Livescore/>
          </div>
          <h1 className="font-bold text-xl p-4">Trending News</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4 shadow-lg">
              <Articles />
            </div>
            <div className="lg:w-1/4 shadow-lg">
              <Favourites />
            </div>
          </div>
      </div>
        
    </div>
  )
}

export default Home