import { useMyList } from "../../Context/myList";
import { FaHeart } from "react-icons/fa";

function MoviePoster({ movie, variant }) {
  const { isInList } = useMyList();
  const inList = isInList(movie);

  return (
    <>
      {variant === "trending" && (
        <div className="relative w-[200px] h-[300px]">
          <img
            className="w-[200px] h-[300px] rounded-xl object-cover"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
          {inList && (
            <span className="absolute top-2 right-2 text-[#FF48AA] text-2xl drop-shadow-lg">
              <FaHeart />
            </span>
          )}
        </div>
      )}

      {variant === "default" && (
        <div className="relative w-[300px] h-[200px]">
          <img
            className="w-[300px] h-[200px] rounded-xl object-cover"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
          {inList && (
            <span className="absolute top-2 right-2 text-[#FF48AA] text-2xl drop-shadow-lg">
              <FaHeart />
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default MoviePoster;
