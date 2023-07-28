import './App.css';
import { useState, useEffect} from 'react';
import Modal from './components/Modal';
import MovieGallery from './components/MovieGallery';
import Navbar from './components/Navbar';
import Badge from '@mui/material/Badge';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genrelist, setGenrelist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cardModalData, setCardModalData] = useState(null);
  const [toggleTV, setToggleTV] = useState(false);
  // const apiKey = process.env.REACT_APP_API_KEY;
  const apiKey = "e908deae2e7ac282a61f49561f56ee92";

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };
  const handleCardModalOpen = (movie) => {
    setCardModalData(movie);
  };

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }


  // Fetching Trending
  useEffect(() => {
    const mediaType = toggleTV ? 'tv' : 'movie';
    fetch(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(res => {
        // Fetch video key for each movie
        const fetchVideoPromises = res.results.map(movie => {
          return fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${apiKey}&language=en-US`)
            .then(res => res.json())
            .then(data => {
              const trailer = data.results.find(
                (video) => video.type === "Trailer"
              );
              if (trailer) {
                movie.videoKey = trailer.key;
              }
            });
        });
  
        // Wait for all video fetch requests to complete
        Promise.all(fetchVideoPromises).then(() => {
          setMovies(res.results);
        });
      })
      .then(res => console.log('trending', res));
  }, [toggleTV]);

  // Fetching Genres
  useEffect(() => {
    const mediaType = toggleTV ? 'tv' : 'movie';
    fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(res => setGenres(res.genres))
      .then(res => console.log('genres', res))
  }, [toggleTV])

  // Fetching data with genreId
  useEffect(() => {
    if (selectedGenre) {
      const mediaType = toggleTV ? 'tv' : 'movie';
      fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${selectedGenre}`)
        .then(res => res.json())
        .then(res => {
          // Fetch video key for each movie
          const fetchVideoPromises = res.results.map(movie => {
            return fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${apiKey}&language=en-US`)
              .then(res => res.json())
              .then(data => {
                const trailer = data.results.find(
                  (video) => video.type === "Trailer"
                );
                if (trailer) {
                  movie.videoKey = trailer.key;
                }
              });
          });
  
          // Wait for all video fetch requests to complete
          Promise.all(fetchVideoPromises).then(() => {
            setGenrelist(res.results);
          });
        })
        .then(res => console.log('genrelist', res));
    }
  }, [selectedGenre, toggleTV]);
  

  const searchQuery = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      const mediaType = toggleTV ? 'tv' : 'movie';
      fetch(
        `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&language=en-US&query=${query}`
      )
        .then((res) => res.json())
        .then((res) => {
          // Fetch video key for each movie
          const fetchVideoPromises = res.results.map(movie => {
            return fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`)
              .then(res => res.json())
              .then(data => {
                const trailer = data.results.find(
                  (video) => video.type === "Trailer" && video.site === "YouTube"
                );
                if (trailer) {
                  movie.videoKey = trailer.key;
                }
              });
          });

          // Wait for all video fetch requests to complete
          Promise.all(fetchVideoPromises).then(() => {
            setSearchResults(res.results);
          });
        })
        .catch((error) => console.log("Error searching movies:", error));
    }
  };

  return (
    <div className='App'>
    <div className='app'>
<Navbar  toggleTV={toggleTV} setToggleTV={setToggleTV}/>
      <div className="Movie-Gallery" id='trending'>
        
        <h1>Trending</h1>
          <MovieGallery movies={movies}  />
      </div>
      <div className='genre' id='sortedByGenre'>
        <h1>Genres</h1>
        <ul className='genre-bar'>
        {genres.map((genre) => (
          <li key={genre.id} className="genre-card" onClick={() => setSelectedGenre(genre.id)}>
          {genre.name}
          </li>
        ))}
        </ul>
      </div>
<div className="Movie-Gallery">
  <h1>Movies Sorted By Genre</h1>

  {selectedGenre ? (
    <MovieGallery movies={genrelist} setCardModalData={setCardModalData} />
  ) : (
    searchResults.length > 0 ? (
      <MovieGallery movies={searchResults} setCardModalData={setCardModalData} />
    ) : (
      <MovieGallery movies={movies} setCardModalData={setCardModalData} />
    )
  )}
</div>

 <div className="search-bar-container" id='search'>
  <form className="search-bar">
    <input
    className="search-field"
    value={query}
      onChange={handleSearchChange}
      type="text"
      placeholder="Search for a Movie."
      required
       />
          <button className="search-bar-button" onClick={searchQuery} type="submit">Search</button>
        </form>
      </div>
      
 {searchResults.length > 0 && (
<div className='Search-Movie-Gallery'>
<h1>Search Results</h1>
  {searchResults.map((movie) => (
     <div key={movie.id} className="movie-card">
       <button onClick={() => setCardModalData(movie)}>
         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
       </button>
       {/* <p>{movie.title}</p> */}
      <Badge badgeContent={movie.vote_average.toFixed(1)} color={movie.vote_average >6? 'primary':'error'}/>
    </div>
  ))}  </div>
      )}
  {cardModalData && (
       <Modal movie={cardModalData} onClose={() => setCardModalData(null)} />
      )}
    </div>
    </div>
  );
}

export default App;