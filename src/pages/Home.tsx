// import React from 'react'
import Livescore from './livescores'
import Favourites from './favourites'
import Articles from './articles'
import Appbar from '../layouts/Appbar'

function Home() {
  return (

    <div>

      <Appbar/>

      <Livescore/>

      <Articles/>

      <Favourites/>


    </div>
  )
}

export default Home