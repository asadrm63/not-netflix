import React, { useState, useEffect } from 'react';
import './Modal.css';

export default function Modal({movie,onClose, className, setCardModalData, cardModalData }) {
  const { id, videoKey } = movie;
  const [info, setInfo] = useState([]);
 

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=89381781542657120b15f4951a87e519&language=en-US`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setInfo(res);
      });
  }, [id]);

  const onCloseModal = () => {
    onClose();
  };

  return (
    <>
      {info && (
        <div className="modal">
          <div className="modal-content">
            <h2>{info.name}</h2>
            <iframe
              className="movie-trailer"
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1`}
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
            <p>{info.overview}</p>
            {/* Rest of the modal content */}
            <button onClick={onCloseModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
