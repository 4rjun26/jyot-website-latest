"use client";
import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const images_pc = ["/c3.jpg", "/c4.jpg", "/c1.jpg", "/c2.jpg"];
const slugs = [
  "podcast/abhinandanjin-stavan-anandghanji-chovisi",
  "/podcast/mokshmarg-ni-shrenio",
  "podcast/manushya-bhav-nu-safalya-shema",
  "podcast/jinshasan-no-sar-namaskar-mahamantra"
];
const images_mobile = ["/c4_mobile.webp"];

const MotionBox = motion(Box);

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(true);
  const images = useBreakpointValue({ base: images_mobile, md: images_pc }) || images_pc;  // Ensure it never returns undefined

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      position="relative"
      width="100vw"
      minHeight="600px" // Ensures visibility even when empty
      height="fit-content"
      overflow="hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(true)}
    >
      <AnimatePresence mode="wait">
        <MotionBox
           key={currentIndex}
           initial={{ opacity: 0, x: 100 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -100 }}
           transition={{ duration: 0.6 }}
           style={{ display: "block", minHeight: "400px" }} // Ensures it occupies space
         position="absolute"
          width="100%"
          height="100%"
        >
          <Link href={slugs[currentIndex]}>
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Link>
        </MotionBox>
      </AnimatePresence>

      {/* Left Button - Visible only on hover */}
      {hovering && (
        <IconButton
          as={motion.button}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          position="absolute"
          left="10px"
          top="50%"
          transform="translateY(-50%)"
          zIndex="10"
          colorScheme="purple"
          variant="solid"
          fontSize="30px"
          icon={<BsChevronLeft />}
          onClick={prevSlide}
          _hover={{ transform: "scale(1.2) translateY(-50%)" }}
        />
      )}

      {/* Right Button - Visible only on hover */}
      {hovering && (
        <IconButton
          as={motion.button}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          position="absolute"
          right="20px"
          top="50%"
          transform="translateY(-50%)"
          zIndex="10"
          colorScheme="purple"
          variant="solid"
          fontSize="30px"
          icon={<BsChevronRight />}
          onClick={nextSlide}
          _hover={{ transform: "scale(1.2) translateY(-50%)" }}
        />
      )}
    </Box>
  );
};

export default Carousel;



// import React, { useState, useEffect } from "react";
// import { Box, IconButton, Flex } from "@chakra-ui/react";
// import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
// import Link from "next/link";
// import Image from "next/image";
// import { useBreakpointValue } from "@chakra-ui/react";

// const images_pc = ["/c3.jpg", "/c4.jpg", "/c1.jpg", "/c2.jpg"];
// const slugs=["podcast/abhinandanjin-stavan-anandghanji-chovisi","/podcast/mokshmarg-ni-shrenio","podcast/manushya-bhav-nu-safalya-shema","podcast/jinshasan-no-sar-namaskar-mahamantra"]
// const images_mobile = ["/c4_mobile.webp"];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   // Auto-slide every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000);
//     return () => clearInterval(interval);
//   }, []);
//   const images = useBreakpointValue({ base: images_mobile, md: images_pc });

//   return (
//     <Box position="relative" width="100vw" margin="auto" overflow="hidden">
//       <Box display="flex" transition="transform 0.5s ease-in-out" transform={`translateX(-${currentIndex * 100}%)`}>
//         {images.map((src, index) => (
//           <Box key={index} flex="0 0 100%" width="100%">
//              <Link href={slugs[index]}>
//             <Image
//               src={src}
//               alt={`Slide ${index + 1}`}
//               width={1000}
//               height={500}
//               style={{ width: "100%", height: "auto", objectFit: "cover" }}
//             />
//             </Link>
//           </Box>
//         ))}
//       </Box>

//       {/* Left Button */}
//       <IconButton
//         position="absolute"
//         left="10px"
//         top="50%"
//         transform="translateY(-50%)"
//         zIndex="10"
//         colorScheme="orange"
//         variant="unstyled"
//         fontSize="30px"
//         icon={<BsChevronLeft />}
//         onClick={prevSlide}
//         _hover={{ transform: "scale(1.2) translateY(-50%)" }}
//       />

//       {/* Right Button */}
//       <IconButton
//         position="absolute"
//         right="10px"
//         top="50%"
//         transform="translateY(-50%)"
//         zIndex="10"
//         colorScheme="orange"
//         variant="unstyled"
//         fontSize="30px"
//         icon={<BsChevronRight />}
//         onClick={nextSlide}
//         _hover={{ transform: "scale(1.2) translateY(-50%)" }}
//       />
//     </Box>
//   );
// };

// export default Carousel;
