import { useState, useEffect } from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { BsChevronUp } from "react-icons/bs";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show button only if scrolling UP and past 300px
      if (currentScrollY < lastScrollY && currentScrollY > 300) {
        setIsVisible(true);
      }
      else{
        setIsVisible(false);
        setScrollTimeout(null);
      }

      setLastScrollY(currentScrollY);

      // Clear any existing timeout and set a new one
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const newTimeout = setTimeout(() => {
        setIsVisible(false); // Hide button after 3 seconds of no scrolling
      }, 2500);
      setScrollTimeout(newTimeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, scrollTimeout]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="1000">
      {isVisible && (
        <IconButton
          aria-label="Scroll to top"
          icon={<BsChevronUp />}
          onClick={scrollToTop}
          colorScheme="orange"
          borderRadius="full"
          size="lg"
          boxShadow="md"
        />
      )}
    </Box>
  );
};

export default ScrollToTop;
