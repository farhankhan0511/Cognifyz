import React from 'react'
import useListmovies from '../Hooks/useListmovies'
import { useSelector } from 'react-redux'
import Movielist from './Movielist'

const SecondaryContainer = () => {
    useListmovies()
    const nowplayingmovies=useSelector((store)=>store.movies?.nowplayingmovies)
    const popularmovies=useSelector((store)=>store.movies?.popularmovies)
    const upcomingmovies=useSelector((store)=>store.movies?.upcomingmovies)
    const topratedmovies=useSelector((store)=>store.movies?.topratedmovies)
  return (
    <div className=' -mt:[80%] md:-mt-64 relative z-50'>
       <Movielist title={"Now Playing Movies"} movies={nowplayingmovies}/>
       <Movielist title={"Top-rated Movies"} movies={topratedmovies}/>
       <Movielist title={"Popular Movies"} movies={popularmovies}/>
       <Movielist title={"Upcoming Movies"} movies={upcomingmovies}/>

    </div>
  )
}

export default SecondaryContainer