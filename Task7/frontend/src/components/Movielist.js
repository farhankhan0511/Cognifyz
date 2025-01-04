import React, { useRef } from 'react';
import MovieCard from './MovieCard';

const Movielist = ({ title, movies }) => {
  // Reference to the scrollable container
  const scrollContainerRef = useRef(null);

  // Function to scroll to the right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 1400, behavior: 'smooth' });
    }
  };

  // Function to scroll to the left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -1400, behavior: 'smooth' });
    }
  };

  return (
    movies && (
      <div className='mb-5 p-2 bg-transparent relative'>
        <h1 className='py-5 text-white  text-md md:text-2xl'>{title}</h1>

        {/* Scroll Button - Left */}
        <button
          className='hidden md:block absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-700 bg-opacity-50 text-white h-1/3 px-2 py-1 rounded-full'
          onClick={scrollLeft}
        >
          &#9664; {/* Left arrow */}
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className='flex overflow-x-scroll scrollbar-hidden space-x-4'
        >
          <div className='flex'>
            {movies?.map((movie) => (
              <MovieCard key={movie?.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Scroll Button - Right */}
        <button
          className='hidden md:block absolute top-1/2 transform -translate-y-1/2  h-1/3 right-0 bg-gray-700 bg-opacity-50 text-white px-2 py-1 rounded-full'
          onClick={scrollRight}
        >
          &#9654; {/* Right arrow */}
        </button>
      </div>
    )
  );
};

export default Movielist;
