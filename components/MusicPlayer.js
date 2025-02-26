import React, { useState, useEffect } from "react";
import { Box, IconButton, Slide, useDisclosure } from "@chakra-ui/react";
import { LuAudioLines } from "react-icons/lu";
import SoundPlayer from "./index_page_components/SoundPlayer";
import { MdOutlineClose } from "react-icons/md";

const MusicPlayer = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundSrc, setSoundSrc] = useState("/sample_sound.mp3");

  // Function to update sound source from localStorage
  const updateSoundSrc = () => {
    if (typeof window !== "undefined") {
      const newSrc = localStorage.getItem("musicSrc") || "/sample_sound.mp3";
      setSoundSrc(newSrc);
    }
  };

  // Load initial sound source
  useEffect(() => {
    updateSoundSrc();
  }, []);

  // Listen for localStorage changes (cross-tab & same tab)
  useEffect(() => {
    const handleStorageChange = () => updateSoundSrc();

    // Listen for storage change in the same tab (custom event trigger)
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "musicSrc") {
        window.dispatchEvent(new Event("storage"));
      }
    };

    // Listen for storage changes (cross-tab)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem; // Restore original setItem
    };
  }, []);

  return (
    <>
      {!isOpen ? (
        <IconButton
          aria-label="Open Music Player"
          icon={<LuAudioLines />}
          onClick={onToggle}
          size={"lg"}
          zIndex={"100"}
          position="fixed"
          bottom={{ base: 5, md: 100 }}
          right={{ base: 5, md: 10 }}
          fontSize={"2xl"}
          borderRadius="full"
          boxShadow="dark-lg"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
        />
      ) : null}

      {/* Slide In Player */}
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10, position: "fixed", bottom: 0, width: "100%" }}>
        <Box p={4} bg="white" boxShadow="xl" position="relative">
          <IconButton 
            aria-label="Close Player"
            icon={<MdOutlineClose size={24} />}
            position="absolute"
            top={2}
            right={2}
            variant="unstyled"
            onClick={onToggle}
          />
          <SoundPlayer src={soundSrc} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </Box>
      </Slide>
    </>
  );
};

export default MusicPlayer;
