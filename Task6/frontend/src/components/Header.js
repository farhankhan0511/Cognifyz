import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { logo,useravatar } from '../utils/constant';

const Header = () => {
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const lang=useRef()
  const user=useSelector((store)=>store?.user)
  
 

  const handlesignout=()=>{
    
  }






  useEffect(()=>{
    
},[])
  return (
    <div className='z-20 absolute top-0  px-8 py-2 bg-gradient-to-b from-black w-full flex justify-between'>
        <img  className="w-28 md:w-44" src={logo} alt="Logo"/>
     
     {user && ( 
          
     <div className='flex'>

     

    <img className='hidden md:block w-12 h-12 m-2' alt='user logo' src={useravatar}/>
    <button onClick={handlesignout} className='font-bold text-white md:font-medium'>Sign Out</button>
    </div>
     )

     }
      
    </div>  
  )
}

export default Header