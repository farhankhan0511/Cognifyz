import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-full aspect-video z-10 pt-[30%] md:pt-[20%]  px-2 md:px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className=' text=3xl md:text-5xl font-bold'>{title}</h1>
        <p className=' hidden md:block md:py-6  w-[40%] md:w-2/6 text-md overflow-hidden'>{overview}</p>
        <div className='flex p-2'>
            <button className='bg-white text-black border border-solid border-black md:m-2 px-4 py-2 rounded-md text-md hover:bg-opacity-80 '>▶Play</button>
            <button className='hidden md:block bg-gray-600 text-white border border-solid border-black m-2 px-4 py-2 rounded-md text-md hover:bg-opacity-80'> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle