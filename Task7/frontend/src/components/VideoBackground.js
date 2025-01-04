import React from 'react'
import {  useSelector } from 'react-redux';
import useMovieTrailer from '../Hooks/useMovieTrailer';


const VideoBackground =({movie_id}) => {
    useMovieTrailer(movie_id);
   const video=useSelector((store)=>store.movies?.trailerMovie)
   


  return (
    <div >
       <iframe className='w-full aspect-video' src={"https://www.youtube.com/embed/"+ video?.key + "?autoplay=1&mute=1&controls=0&rel"}  title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"allowFullScreen ></iframe>
        </div>
  )
}

export default VideoBackground