import Plus from "../plus";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useMyList } from "../../Context/myList";

function HoveredMovieCard({ movie }) {
  const { myList, setMyList, isInList } = useMyList();
  const [genres, setGenres] = useState([]);

  const inList = isInList(movie);

  const clickedList = () => {
    if (inList) {
      setMyList(myList.filter((m) => m.id !== movie.id));
    } else {
      setMyList([...myList, movie]);
    }
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=49a55f1c128ac8ea04adbe99f8413c09&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  const genreNames = movie.genre_ids
    ? genres
        .filter((g) => movie.genre_ids.includes(g.id))
        .map((g) => g.name)
        .join(", ")
    : "";

  return (
    <div className="flex flex-col items-center shadow-[#951a4f]/80 shadow-lg bg-white w-[306px] h-[336px] rounded-xl p-[3px]">
      {/* Poster Picture */}
      <div className="relative w-full h-[200px]">
        <img
          className="max-w-[300px] w-full h-[200px] rounded-t-xl object-cover"
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : `https://image.tmdb.org/t/p/original${movie.poster_path}`
          }
          alt={movie.title}
        />
        {inList && (
          <span className="absolute top-2 right-2 text-[#FF48AA] text-2xl drop-shadow-lg">
            <FaHeart />
          </span>
        )}
      </div>
      {/* Information Container */}
      <div className="w-full max-h-[130px] h-full flex flex-row items-center p-3 text-black object-cover">
        {/* LeftSide */}
        <div className="w-[50%] h-full flex flex-col gap-2 ">
          <div className="flex flex-col">
            <h1 className="text-[14px] w-full font-bold truncate">
              {movie.title}
            </h1>
            <h1 className="text-[14px]">
              {movie.release_date ? movie.release_date.split("-")[0] : ""}
            </h1>
          </div>
          <p className="text-[14px] w-full line-clamp-3">{genreNames}</p>
        </div>
        {/* RightSide ... */}
        <div className="w-[50%] h-full flex flex-row gap-2 justify-end">
          {/* Rating  */}
          <div className="w-[40px] h-[40px] border-1 rounded-2xl">
            <div className="inline-flex p-2 w-full h-full border-black items-center justify-center">
              <span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>
          </div>

          {/* Plus  */}
          <div
            onClick={clickedList}
            className={`${
              inList ? " text-[#FF48AA]" : " text-black"
            } w-[40px] h-[40px] hover:w-[45px] hover:h-[45px] border-1 rounded-2xl  hover:text-[#FF48AA] transition-all duration-300 flex items-center justify-center cursor-pointer`}
          >
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoveredMovieCard;
