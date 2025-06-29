import HoveredMovieCard from "./hoveredMovieCard";
import MoviePoster from "./moviePoster";
import { useState } from "react";

function MovieCard({ movie, variant = "default" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[306px] h-[336px] flex justify-center items-center z-10 " // set width/height to match card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-[306px] h-[336px] rounded-xl
    transition-all duration-700 ease-in-out flex justify-center items-center 
    ${isHovered ? " scale-90 " : " scale-100"}
  `}
      >
        {variant === "default" && (
          <MoviePoster key={movie.id} movie={movie} variant={variant} />
        )}

        {variant === "trending" && (
          <MoviePoster key={movie.id} movie={movie} variant={variant} />
        )}
      </div>

      <div
        className={`
          absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
           duration-800 transition-all ease-in-out  
          ${
            isHovered
              ? "scale-100 opacity-100 z-50 "
              : "scale-90  opacity-0 z-50 "
          }
          
        `}
      >
        <HoveredMovieCard key={movie.id} movie={movie} />
      </div>
    </div>
  );
}
export default MovieCard;
