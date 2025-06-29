import { useSearch } from "../Context/search";
import MovieCard from "../components/Cards/movieCard";

function Search() {
  const { searchResults } = useSearch();

  //for all search results

  return (
    <div className=" px-20 w-full  text-white flex flex-col items-center min-h-screen py-10 pt-20 justify-center">
      <span>Search Results...</span>
      {searchResults && searchResults.length > 0 ? (
        <div className="flex flex-wrap justify-center  px-4">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} variant="trending" />
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center w-full h-screen">
          No results found.
        </p>
      )}
    </div>
  );
}

export default Search;
