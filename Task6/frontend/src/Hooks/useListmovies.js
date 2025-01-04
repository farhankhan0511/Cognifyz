import { apioptions } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import {addPopularmovies, addTopratedmovies, addupcomingmovies } from '../utils/movieSlice'
import { useEffect } from 'react'

const useListmovies=()=>{
        
        const popularmovies=useSelector((store)=>store.movies?.popularmovies)
        const upcomingmovies=useSelector((store)=>store.movies?.upcomingmovies)
        const topratedmovies=useSelector((store)=>store.movies?.topratedmovies)
    
const dispatch=useDispatch()
const Popularmovies= async ()=>{
  const data=await fetch('https://api.themoviedb.org/3/movie/popular',apioptions);
  const response=await data.json()
  dispatch(addPopularmovies(response?.results))
  
}
const Upcomingmovies= async ()=>{
  const data=await fetch('https://api.themoviedb.org/3/movie/upcoming',apioptions);
  const response=await data.json()
  dispatch(addupcomingmovies(response?.results))
  
}
const Topratedmovies= async ()=>{
  const data=await fetch('https://api.themoviedb.org/3/movie/top_rated',apioptions);
  const response=await data.json()
  dispatch(addTopratedmovies(response?.results))
 
}
useEffect(()=>{
  !popularmovies && Popularmovies()
  !upcomingmovies && Upcomingmovies()
  !topratedmovies && Topratedmovies()
},[])
}
export default useListmovies;