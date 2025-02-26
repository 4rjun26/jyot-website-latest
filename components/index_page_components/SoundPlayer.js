import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, Text, IconButton, Link } from "@chakra-ui/react";
import { MdOutlinePlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";
import { BsPlayFill } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";


const SoundPlayer = ({ src }) => {
  
const toast = useToast();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedSrc = localStorage.getItem("musicSrc");
    const savedTime = parseFloat(localStorage.getItem("musicTime")) || 0;
    const savedPlaying = localStorage.getItem("musicPlaying") === "true";
  
    if (savedSrc === src) {
      setCurrentTime(savedTime);
      setIsPlaying(savedPlaying);
      // toast({
      //   title: "Playback Restored",
      //   description: `Resumed at ${savedTime.toFixed(2)}s`,
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      // });
    }
  }, [src]);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "rgb(0, 0, 0)",
      progressColor: "orange",
      cursorColor: "red",
      cursorWidth: 4,
      barWidth: 2.5,
      height: 50,
      responsive: true,
    });

    wavesurfer.current.load(src);

    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current.getDuration());
      wavesurfer.current.seekTo(currentTime / wavesurfer.current.getDuration());
      if (isPlaying) {
        wavesurfer.current.play();
      }
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
      localStorage.setItem("musicTime", wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on("finish", () => {
      wavesurfer.current.seekTo(0);
      setCurrentTime(0);
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    });

    return () => {
      localStorage.setItem("musicTime", wavesurfer.current.getCurrentTime());
      localStorage.setItem("musicPlaying", isPlaying.toString());
      wavesurfer.current.destroy();
    };
  }, [src]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      const newState = !isPlaying;
      setIsPlaying(newState);
      localStorage.setItem("musicSrc", src);
      localStorage.setItem("musicPlaying", newState.toString());
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Box w="full" p="0px 4px 4px 4px" bg="rgba(220,220,220,1)" textAlign="center" color="black">
      {/* Title */}
      <Flex alignItems={"center"} w={"full"} p={"10px"} gap={"5px"}>
        <IconButton
          aria-label="play-pause"
          icon={isPlaying ? <MdPauseCircleFilled /> : <MdOutlinePlayCircleFilled />}
          onClick={togglePlayPause}
          size="md"
          fontSize={"3xl"}
          colorScheme="orange"
          borderRadius="5px"
          boxShadow="xl"
        />
        <Box w={"50%"} textAlign={"left"}>
          <Link>
            <Text textDecor={"underline"} fontSize={"13px"} _hover={{ color: "black" }} color={"gray"}>
              Jyot
            </Text>
          </Link>
          <Text fontSize={"md"} color={"black"} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" display="block" w="full" pb={"2px"}>
            jakshd asdjkhasasdasdasdasdd asfsafa ssadasd
          </Text>
        </Box>
        <Flex alignItems={"center"} h={"fit-content"} w={"50%"} color={"gray"}>
          <Text justifyContent={"right"} w={"full"} display={"flex"} alignItems={"center"} fontSize={"md"}>
            <BsPlayFill size={30} /> 160
          </Text>
        </Flex>
      </Flex>

      {/* Waveform Container */}
      <Box ref={waveformRef} color={"black"} m={"auto"} w="75%" h="50px" borderRadius="md" />

      {/* Time Display */}
      <Box display="flex" color={"white"} justifyContent="space-between" fontSize="sm" mt="-5">
        <Text fontSize={"xs"} bg={"black"} p={"2px 5px"} borderRadius={"5px"} fontWeight={"bold"}>
          {formatTime(currentTime)}
        </Text>
        <Text fontSize={"xs"} bg={"black"} p={"2px 5px"} borderRadius={"5px"} fontWeight={"bold"}>
          {formatTime(duration)}
        </Text>
      </Box>
    </Box>
  );
};

export default SoundPlayer;
