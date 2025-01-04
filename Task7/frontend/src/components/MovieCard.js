import React from 'react'
import { MOVIEPOSTER } from '../utils/constant'

const MovieCard = ({movie}) => {
  return (
    <div className=' w-32 md:w-48 hover:scale-105 mx-1 md:mx-2'>
        <img className="w-full  aspect-auto md:h-30" src={MOVIEPOSTER +movie?.poster_path } alt={movie?.orignal_title}/>
        {/* <h1>{movie?.orignal_title}</h1> */}

    </div>
  )
}

export default MovieCard