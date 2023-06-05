
import './App.css';
import {useState, useEffect} from 'react'

function App() {
const [movies,setMovies] = useState([]);
const [genres,setGenres] = useState([]);

const apiKey = "89381781542657120b15f4951a87e519"
const movieTitle = 'spiderman'
const genreId = 28
const movieId = 603692
const movieTrailerId = "qEVUtrk8_B4"

// create our useEffect
  useEffect(() => {
  // fetch the data
fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`)
// convert the data from json into an object
.then(res => res.json())

// return that object
.then(res => setMovies(res.results))

// log the response 
.then(res => console.log(res))
},[])

useEffect(() => {
  fetch(` https://api.themoviedb.org/3/genre/movie/list?api_key=e908deae2e7ac282a61f49561f56ee92&language=en-US`)
    .then(res => res.json())
    .then(res => setGenres(res.genres))
    .then(res => console.log(res))
}, [])

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`)
    .then(res => res.json())
    .then(res => setGenres(res.genres))
    .then(res => console.log(res))
}, [])

  return (
    <div className="App">
    <h1>Movies</h1>
    <div className='Movie-Gallery'>
      <h1>trending</h1>
     {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.title}</p>
            </div>
            ))}
   </div>
   <div>
    <h1>Genres</h1>
    {genres.map((genre) => (
          <div key={genre.id} className="genre-card">
      <p>{genre.name}</p>
      <h1></h1>
            </div>
            ))}

   </div>
  </div>
  );
};

export default App;

{/* <iframe
  className='movie-trailer'
  width="640" height="360"
  src={`https://www.youtube.com/embed/${movie.key}?enablejsapi=1`}
  allowFullScreen
></iframe> */}

// `https://www.youtube.com/watch?v=${key}/modestbranding=1&showinfo=0&fs=0&rel=0`

{/* <a href={`https://www.youtube.com/embed/${movie.id}?enablejsapi=1`}><p>{movie.title}</p></a> */}