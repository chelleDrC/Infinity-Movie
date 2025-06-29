import { useEffect, useState } from "react";
//Api Services
import {
  getPopularMovies,
  getTop10TrendingMoviesThisWeek,
} from "../services/api";

//Components
import Footer from "../components/footer";
import CarouselTrending from "../components/carouselTrending";
import MainCard from "../components/mainCard";
import Carousel from "../components/carousel";

//Icons
import { AiOutlineLoading } from "react-icons/ai";

// Genre IDs from TMDb
const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 16, name: "Animation" },
];

//Context
import { useMyList } from "../Context/myList";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  //Fetch trending movies on component mount
  useEffect(() => {
    const loadTrendingmovies = async () => {
      try {
        const trendingMovies = await getTop10TrendingMoviesThisWeek();
        setTrendingMovies(trendingMovies);
      } catch (err) {
        setError("Failed to fetch trending movies");
      } finally {
        setLoading(false);
      }
    };
    loadTrendingmovies();
  }, []);

  // Fetch popular movies on component mount
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to fetch popular movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // Automatically change the main movie every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [movies]);

  const mainMovie = movies[currentIndex];
  const carouselMovies = movies.filter((_, index) => index !== currentIndex);

  // Filter movies for each genre
  const genreCarousels = GENRES.map((genre) => ({
    name: genre.name,
    movies: carouselMovies.filter(
      (movie) => movie.genre_ids && movie.genre_ids.includes(genre.id)
    ),
  }));

  if (loading)
    return (
      <>
        <div className="w-full h-screen text-white flex justify-center items-center text-2xl">
          <AiOutlineLoading className="animate-spin" />
        </div>
      </>
    );
  if (error)
    return <div className="text-white text-[14px] text-center">{error}</div>;

  return (
    <>
      <MainCard movie={mainMovie} />

      <CarouselTrending movies={trendingMovies} />
      {genreCarousels.map(
        (carousel) =>
          carousel.movies.length > 0 && (
            <Carousel
              key={carousel.name}
              movies={carousel.movies}
              genre={carousel.name}
            />
          )
      )}

      <Footer />
    </>
  );
}

export default Home;
