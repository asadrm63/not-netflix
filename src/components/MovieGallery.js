import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from './Modal';
import Badge from '@mui/material/Badge';

const MovieGallery = ({ movies ,setCardModalData}) => {
    const [selectedMovie,setSelectedMovie] =useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleModalClose =() => {
        setSelectedMovie(null);
    };

    const handleCardModalOpen = (movie) => {
        setCardModalData(movie);
      };

  return (
    <div className='mq'>
    <Carousel  showThumbs={false} onClickItem= {(index) => handleMovieClick(movies[index])}>
      {movies.map((movie) => (
        <div key={movie.id}  className="movie-card">
           <span onClick={() => handleCardModalOpen(movie)}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </span>
          {/* <p className="legend">{movie.title}</p> */}
          {/* <p className="vote-average">{movie.vote_average.toFixed(1)}</p> */}
          <Badge badgeContent={movie.vote_average.toFixed(1)} color={movie.vote_average >6? 'primary':'error'}/>

        </div>
      ))}
    </Carousel>
    {selectedMovie && (
        <Modal movie={selectedMovie} onClose={handleModalClose} />
    )}
    </div>
  ); 
};

export default MovieGallery;




