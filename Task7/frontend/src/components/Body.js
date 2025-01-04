import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Body = () => {
    const dispatch=useDispatch()
    const approuter=createBrowserRouter([
        {
            path:"/",
            element:<Login />
        },
        {
            path:"/browse",
            element:<Browse />
        },
    ]);
    useEffect(()=>{
       
    },[])

  return (
    <div>
        <RouterProvider router={approuter}/>
    </div>
  )
};

export default Body