import { useState, useEffect } from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { BsChevronUp } from "react-icons/bs";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box position="fixed" bottom="100px" right="20px" zIndex="1000">
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
