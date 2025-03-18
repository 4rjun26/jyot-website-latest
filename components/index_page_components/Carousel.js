import React, { useState, useEffect } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const images = ["/c3.jpg", "/c4.jpg", "/c1.jpg", "/c2.jpg"];
const slugs=["podcast/abhinandanjin-stavan-anandghanji-chovisi","/podcast/mokshmarg-ni-shrenio","podcast/manushya-bhav-nu-safalya-shema","podcast/jinshasan-no-sar-namaskar-mahamantra"]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <Box position="relative" width="100vw" margin="auto" overflow="hidden">
      <Box display="flex" transition="transform 0.5s ease-in-out" transform={`translateX(-${currentIndex * 100}%)`}>
        {images.map((src, index) => (
          <Box key={index} flex="0 0 100%" width="100%">
             <Link href={slugs[index]}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1000}
              height={500}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            </Link>
          </Box>
        ))}
      </Box>

      {/* Left Button */}
      <IconButton
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        colorScheme="orange"
        variant="unstyled"
        fontSize="30px"
        icon={<BsChevronLeft />}
        onClick={prevSlide}
        _hover={{ transform: "scale(1.2) translateY(-50%)" }}
      />

      {/* Right Button */}
      <IconButton
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        colorScheme="orange"
        variant="unstyled"
        fontSize="30px"
        icon={<BsChevronRight />}
        onClick={nextSlide}
        _hover={{ transform: "scale(1.2) translateY(-50%)" }}
      />
    </Box>
  );
};

export default Carousel;
