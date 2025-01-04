import React, { useEffect } from 'react'
import Header from './Header'
import useNowplaying from '../Hooks/useNowplaying'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Browse = () => {
  const user=useSelector((store)=>store?.user)
  const navigate=useNavigate()
  useNowplaying();

  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  },[])
  
  return (
    <div className='bg-gray-950'>
      <Header/>  
         <MainContainer/>
         <SecondaryContainer/>
      

      
    </div>
  )
  
}


export default Browse