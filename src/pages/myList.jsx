//Component
import MovieCard from "../components/Cards/movieCard";
import Footer from "../components/footer";

//Context
import { useMyList } from "../Context/myList";
function MyList() {
  const { myList } = useMyList();

  return (
    <>
      <div className="w-full text-white flex flex-col items-center min-h-screen py-10 pt-20 justify-center">
        <span>My List...</span>
        {myList && myList.length > 0 ? (
          <div className="w-full flex flex-wrap justify-center  px-4">
            {myList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="trending" />
            ))}
          </div>
        ) : (
          <p className="flex items-center justify-center w-full h-screen">
            No results found.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
export default MyList;
