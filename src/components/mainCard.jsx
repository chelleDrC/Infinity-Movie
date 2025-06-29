import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";

//Icons
import { AiOutlineLoading } from "react-icons/ai";

function MainCard({ movie }) {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [visible, setVisible] = useState(true);

  // Fade out when movie changes, then fade in after content updates
  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 500); // 300ms fade out, then fade in

    return () => clearTimeout(timeout);
  }, [movie]);

  useEffect(() => {
    if (!movie) return;
    const fetchLogo = async () => {
      const details = await getMovieDetails(movie.id);
      if (
        details.production_companies &&
        details.production_companies.length > 0 &&
        details.production_companies[0].logo_path
      ) {
        setCompanyLogo(
          `https://image.tmdb.org/t/p/original${details.production_companies[0].logo_path}`
        );
      } else {
        setCompanyLogo(null);
      }
    };
    fetchLogo();
  }, [movie]);

  if (!movie)
    return (
      <>
        <div className="w-full h-screen text-white flex justify-center items-center text-2xl">
          <AiOutlineLoading className="animate-spin" />
        </div>
      </>
    );

  return (
    <div
      className={`transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      } text-white relative w-full h-[90vh] mt-10`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,0),rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,1))",
        maskImage:
          "linear-gradient(to top,  rgba(0,0,0,0),rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,1))",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
      }}
    >
      {/* Background Image */}
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full absolute top-0 left-0 object-cover "
      />

      {/* Content Container */}
      <div className="flex flex-col gap-5 h-full md:w-[40%] lg:p-20 w-[60%] p-10 justify-center relative z-10 bg-gradient-to-r from-[#FF48AA]/80 to-[#FF48AA]/0">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt="Company Logo"
            className="max-h-[200px] h-auto mb-4"
            style={{ width: "auto", objectFit: "contain" }}
          />
        ) : (
          <div className="max-h-[300px] mb-4 text-white text-5xl font-bold line-clamp-3">
            {movie.title}
          </div>
        )}

        <p className="text-[14px] line-clamp-4 w-full">
          {movie.overview || "No overview available."}
        </p>

        <div className="w-full h-auto flex flex-col text-[14px] font-bold">
          <span>{movie.title}</span>
          <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default MainCard;
