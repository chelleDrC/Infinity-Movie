import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";
import { useState, useEffect } from "react";

function NavBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    }; // Check if the window width is less than 800px

    // Call it once on mount
    handleResize();

    window.addEventListener("resize", handleResize); // Add event listener for window resize

    //Return will not be executed since it is always on the DOM
    return () => {
      window.removeEventListener("resize", handleResize);
    }; // Cleanup the event listener on component unmount
  }, []);

  return (
    <>
      {isMobile ? (
        // Smaller screen size
        <MobileNav />
      ) : (
        // Desktop view
        <DesktopNav />
      )}
    </>
  );
}

export default NavBar;
