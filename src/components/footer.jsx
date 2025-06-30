import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";

function Footer() {
  const [numLikes, setNumLikes] = useState(null); // initially null to detect loading

  useEffect(() => {
    const storedLikes = localStorage.getItem("moovieNumLikes");
    if (storedLikes !== null) {
      setNumLikes(Number(storedLikes));
    } else {
      setNumLikes(0); // fallback default if no value
    }
  }, []);

  useEffect(() => {
    if (numLikes !== null) {
      localStorage.setItem("moovieNumLikes", String(numLikes));
    }
  }, [numLikes]);

  const handleLikeClick = () => {
    if (numLikes !== null) {
      setNumLikes(numLikes + 1);
    }
  };

  // Avoid rendering until numLikes is loaded
  if (numLikes === null) return null;

  return (
    <div className="mt-[150px] text-white text-[100px] h-auto w-full bg-gradient-to-r px-20 py-10 from-[#2B0017] to-[#54002D] rounded-t-[20px]">
      <div className="flex flex-col items-center h-full  gap-15">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-[50px] font-bold">
            <span className="text-[#FF48AA] border-b-2 border-[#FF48AA] ">
              Infinite
            </span>{" "}
            Feelings.
          </h1>
        </div>

        {/* // Contact Information Section */}
        <div className="flex flex-col items-center  w-full sm:flex-row">
          <div className="w-[30%] flex flex-col sm:flex-row items-center justify-center">
            <SiMinutemailer className="hover:text-[#FF48AA] transform-all duration-300 ease-in-out scale-70 w-auto h-auto" />
            <div className="flex flex-col  items-center justify-center  ">
              <span className="text-[24px] font-bold ">Email</span>
              <hr className="w-full text-white" />
              <div className="flex flex-row w-full items-center justify-center ">
                <span className="text-[12px] italic w-full truncate">
                  richelledearce@gmail.com
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLikeClick}
            className="w-[40%] h-auto text-[24px]  transform-all duration-300 ease-in-out p-10  flex flex-col items-center justify-center "
          >
            <div className="border-white hover:border-[#FF48AA] hover:text-[#FF48AA] hover:scale-110 transform-all duration-300 ease-in-out p-5 relative rounded-xl border-[1px]  max-w-auto flex items-center justify-center gap-4">
              <FaHeart className="  w-auto z-50 animate-pulse" />
              <span className={`${numLikes > 0 ? "" : "hidden"}`}>
                {numLikes}
              </span>
            </div>
            <span className=" text-[12px] w-[150px] p-5 italic text-center ">
              {numLikes > 0 ? "Thank You >.<" : "Do You Love it?"}
            </span>
          </button>

          <div className="w-[30%] flex items-center flex-col gap-5 md:flex-row ">
            <a
              target="_blank"
              href="https://www.figma.com/design/1c6dLa40mzeMkCMlYNDO8u/UI-UX-Projects?node-id=0-1&t=GoXI8sGR2Z48OkJK-1"
            >
              <GrProjects className="text-[50px] transform-all duration-300 ease-in-out hover:text-[#FF48AA]" />
            </a>
            <div className="flex flex-col items-center justify-center ">
              <span className="text-[24px] font-bold ">Portfolio</span>
              <hr className="w-full text-white" />
              <span className="text-[12px] italic w-full truncate">
                <a target="_blank" href="https://github.com/chelleDrC">
                  github.com/chelleDrC
                </a>
              </span>
            </div>
          </div>
        </div>
        {/* Icons  */}

        {/* Add this line and social icons */}
        <div className="flex flex-col items-center w-full mt-8">
          <hr className="w-full border-white mb-4 opacity-15 p-5" />
          <div className="flex flex-row gap-8 text-white text-4xl">
            <a
              href="https://www.instagram.com/reshel_therc123/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-[#FF48AA] transition-colors duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/richelle-de-arce-6427b22b5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:text-[#FF48AA] transition-colors duration-300" />
            </a>
            <a
              href="https://www.facebook.com/richelle.dearce.1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:text-[#FF48AA] transition-colors duration-300" />
            </a>
            <a
              href="https://x.com/reshel_theRC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-[#FF48AA] transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
