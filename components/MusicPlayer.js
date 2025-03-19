'use client'

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, IconButton, Slide, Text, Flex,Badge,VStack,Skeleton } from "@chakra-ui/react";
import { LuAudioLines } from "react-icons/lu";
import { MdOutlineClose, MdOutlinePlayCircleFilled, MdPauseCircleFilled, MdOutlineRemoveCircle } from "react-icons/md";
import { MdPlaylistPlay } from "react-icons/md";
import { Divider } from "@chakra-ui/react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { Show,Hide } from "@chakra-ui/react";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { FaArrowRotateRight } from "react-icons/fa6";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import Link from "next/link";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFetchingPlaylist,setIsFetchingPlaylist]=useState(false);
  const [duration, setDuration] = useState(0);
  const [showPlayList,setShowPlayList]= useState(false);
  // const [playList, setPlayList] = useState([
  //   {
  //     "_id": "672df8b6b6f33f7cbc69a57a",
  //     "identifier": "SMNEGI",
  //     "title": "Aatmakalyan karvani mosam",
  //     "ep": "1",
  //     "title_format": "null",
  //     "search_title": "આત્મકલ્યાણ કરવાની મોસમ",
  //     "link": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/1.mp3",
  //     "img": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/1-aatmakalyan-karvani-mosam.jpg",
  //     "publish_date": "2024-06-12T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def721f63a0c51a915390"
  //     ],
  //     "category_name": [
  //       "Sambhavjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "aatmakalyan-karvani-mosam",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:38.627Z",
  //     "updatedAt": "2024-11-14T13:19:29.671Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "672df8b3b6f33f7cbc69a555",
  //     "identifier": "SMNDKO",
  //     "title": "Tirthankaro ni bhakti karva prathamik bhumika shu?",
  //     "ep": "2",
  //     "title_format": "null",
  //     "search_title": "તીર્થંકરોની ભક્તિ કરવા પ્રાથમિક ભૂમિકા શું?",
  //     "link": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/2.mp3",
  //     "img": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/2-tirthankaro-ni-bhakti-karva-prathamik-bhumika-shu.jpg",
  //     "publish_date": "2024-06-19T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def721f63a0c51a915390"
  //     ],
  //     "category_name": [
  //       "Sambhavjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "tirthankaro-ni-bhakti-karva-prathamik-bhumika-shu",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:35.893Z",
  //     "updatedAt": "2024-11-14T13:19:27.685Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "672df8b0b6f33f7cbc69a52d",
  //     "identifier": "SMNCWZ",
  //     "title": "Tamne abhay banvu che ?",
  //     "ep": "3",
  //     "title_format": "null",
  //     "search_title": "તમને અભય બનવું છે?",
  //     "link": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/3.mp3",
  //     "img": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/3-tamne-abhay-banvu-che.jpg",
  //     "publish_date": "2024-06-26T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def721f63a0c51a915390"
  //     ],
  //     "category_name": [
  //       "Sambhavjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "tamne-abhay-banvu-che-",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:32.854Z",
  //     "updatedAt": "2024-11-14T13:19:25.567Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "672df8adb6f33f7cbc69a502",
  //     "identifier": "SMNCES",
  //     "title": "Shu tamne hitkari no dvesh che ?",
  //     "ep": "4",
  //     "title_format": "null",
  //     "search_title": "શું તમને હિતકારીનો દ્વેષ છે?",
  //     "link": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/4.mp3",
  //     "img": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/4-shu-tamne-hitkari-no-dvesh-che.jpg",
  //     "publish_date": "2024-07-10T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def721f63a0c51a915390"
  //     ],
  //     "category_name": [
  //       "Sambhavjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "shu-tamne-hitkari-no-dvesh-che-",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:29.125Z",
  //     "updatedAt": "2024-11-14T13:19:23.274Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "672df8aab6f33f7cbc69a4e0",
  //     "identifier": "SMNBSI",
  //     "title": "Jinkathit anushthan ma khed no sampurn abhav",
  //     "ep": "5",
  //     "title_format": "null",
  //     "search_title": "જિંનકથિત અનુષ્ઠાનમા ખેદનો સંપૂર્ણ અભાવ",
  //     "link": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/5.mp3",
  //     "img": "https://jyotapp.in/podcast/sambhavjin-stavan-anandghanji-chovisi/5-jinkathit-anushthan-ma-khed-no-sampurn-abhav.jpg",
  //     "publish_date": "2024-07-18T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def721f63a0c51a915390"
  //     ],
  //     "category_name": [
  //       "Sambhavjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "jinkathit-anushthan-ma-khed-no-sampurn-abhav",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:26.639Z",
  //     "updatedAt": "2025-01-02T08:00:49.522Z",
  //     "__v": 0
  //   }
  // ]);
  const [title,setTitle]=useState("");
  const [albumName,setAlbumName]=useState("");
  const [albumSlug,setAlbumSlug]=useState("");
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const router = useRouter();
  const [playList,setPlayList]=useState([]);
  const ar=[1,2,3,4,5];
  const { pathname } = router; // Get the pathname (e.g., "/song/jyot-stuti")
  
  const firstSegment = pathname.split('/')[1];

  
  const audioRef = useRef(null); // ✅ Reference for native audio element
  
  useEffect(()=>{
    if (typeof window === "undefined") return;
    setAlbumName(localStorage.getItem('audioAlbum'));
    setTitle(localStorage.getItem('audioTitle'));
  },[])

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure client-side execution

    // Load track and time from localStorage on page load
    const savedTrack = localStorage.getItem("currentTrack");
    const savedTime = localStorage.getItem("currentTime");
    
    if (savedTrack && savedTime) {
      setCurrentTrack(savedTrack);
      setIsSlideOpen(localStorage.getItem("isSlideOpen") === "true");
      setCurrentTime(savedTime ? parseFloat(savedTime) : 0);
    }

    // Poll every 500ms for track changes
    const interval = setInterval(() => {
      const newTrack = localStorage.getItem("currentTrack");
      if (newTrack !== currentTrack) {
        setCurrentTrack(newTrack);
        setIsPlaying(true);
        setCurrentTime(0);
        localStorage.setItem("currentTime", "0");
        setIsSlideOpen(true);
        localStorage.setItem("isSlideOpen", "true");
        localStorage.setItem("isPlaying", "true");
        
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;

    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setTitle(localStorage.getItem("audioTitle"));
        setAlbumName(localStorage.getItem("audioAlbum"));
        setAlbumSlug(localStorage.getItem("audioAlbumSlug"));
      } catch (err) {
        console.warn("Autoplay blocked. User interaction required.", err);
        setIsPlaying(false);
      }
    };
    // ✅ Update duration when metadata loads
    const updateMetadata = () => {
      if (audioRef.current && audioRef.current.duration != null) {
      setDuration(audioRef.current.duration);
      }
      if (localStorage.getItem("isPlaying") === "true") {
        setIsPlaying(true);
        // Only play if user has interacted with the page
        if (document.visibilityState === "visible") {
          playAudio();
        }
      }
    };

    // ✅ Update currentTime on timeupdate
    const updateTime = () => {
      if (audioRef.current && audioRef.current.currentTime != null) {
      setCurrentTime(audioRef.current.currentTime);
      localStorage.setItem("currentTime", audioRef.current.currentTime.toString());
      }
      else{
        setCurrentTime(0);
      }
    };

    // ✅ Track play/pause state
    const handlePlay = () => {
      setIsPlaying(true);
      localStorage.setItem("isPlaying", "true");
    };

    const handlePause = () => {
      setIsPlaying(false);
      localStorage.setItem("isPlaying", "false");
    };

    const handleEnd = () => {
      setIsPlaying(false);
      localStorage.setItem("currentTime", "0");
      localStorage.setItem("isPlaying", "false");
      setCurrentTime(0);
      nextPodcast();
    };

    // ✅ Attach event listeners
    audioRef.current.addEventListener("loadedmetadata", updateMetadata);
    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);
    audioRef.current.addEventListener("ended", handleEnd);

    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener("loadedmetadata", updateMetadata);
      audioRef.current.removeEventListener("timeupdate", updateTime);
      audioRef.current.removeEventListener("play", handlePlay);
      audioRef.current.removeEventListener("pause", handlePause);
      audioRef.current.removeEventListener("ended", handleEnd);
    };
  }, [currentTrack]);

  const handlePlayPause = async () => {
    if (!audioRef.current || !currentTrack) return;
  
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("isPlaying", "false");
    } else {
      try {
        await audioRef.current.play(); // Ensure play action is handled properly
        setIsPlaying(true);
        localStorage.setItem("isPlaying", "true");
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const OpenAndCloseSlide = () => {
    localStorage.setItem("isSlideOpen", !isSlideOpen);
    setIsSlideOpen(!isSlideOpen);
  };

  const removePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop playback
      audioRef.current.currentTime = 0; // Reset playback position
    }
  
    localStorage.clear(); // Clear all stored track data
    setCurrentTrack(null); // Reset track state
    setIsPlaying(false); // Ensure UI updates
    setCurrentTime(0); // Reset progress
    setDuration(0); // Reset duration
    setIsSlideOpen(false); // Hide the player
  };
  
  const fetchPlaylist = async () =>{
    if(playList.length===0 && albumName!=null){
    try {
      setIsFetchingPlaylist(true);
      const response = await fetch(`/api/get_podcasts_from_album?albumName=${albumName}&type=${firstSegment}`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
    if (!response.ok) throw new Error("Failed to fetch podcasts");
      const data = await response.json();
      setPlayList(data);
      setIsFetchingPlaylist(false);
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setIsFetchingPlaylist(false);
    }

  }
};

  const findAlbumSlug = async () => {
    try {
      const response = await fetch(`/api/get_album_slug?albumName=${albumName}`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
    if (!response.ok) throw new Error("Failed to fetch podcasts");
      const data = await response.json();
      const slug = data[0].slug;
      const newRoute = `/podcast/${slug}`;
      router.push(newRoute);
      console.log(newRoute);
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }

  };

const nextPodcast = async ()=>{
  const match = title.match(/Ep (\d+)/);

let episodeNumber = match ? parseInt(match[1], 10) : null;
let ind=episodeNumber-1;
if(ind===playList.length-1){
  ind=-1;
}
playNewPodcastFromPlayList(ind+1); 
}

const previousPodcast = async ()=>{
  const match = title.match(/Ep (\d+)/);

const episodeNumber = match ? parseInt(match[1], 10) : null;
let ind=episodeNumber-1;
if(ind===0){
  ind=1;
}
playNewPodcastFromPlayList(ind-1);
}

  const playNewPodcastFromPlayList = async (ind) => {
    localStorage.setItem("currentTrack", playList[ind].link); // ✅ Save to localStorage
    localStorage.setItem("audioId", playList[ind]._id);
    localStorage.setItem("audioTitle", "Ep "+playList[ind].ep+" - "+playList[ind].title);
  }
  useEffect(() => {
    setPlayList([]);
    setShowPlayList(false);
    fetchPlaylist();
  }, [albumName]);
  return (
    <>
      {/* Floating Music Player Toggle Button */}
      {currentTrack!=null ? 
      <>
      {/* Non-phone (Desktop, Tablet) */}
      <Hide below="md">
        <IconButton
          aria-label="Open Music Player"
          icon={<LuAudioLines />}
          size="lg"
          display={isSlideOpen ? "none" : "flex"}
          zIndex="100"
          position="fixed"
          bottom={{ base: 5, md: 100 }}
          right={{ base: 5, md: 10 }}
          fontSize="2xl"
          borderRadius="full"
          boxShadow="dark-lg"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          onClick={OpenAndCloseSlide}
        />
        <Badge
          zIndex="101"
          position="fixed"
          fontSize="md"
          w="25px"
          h="25px"
          justifyContent="center"
          alignItems="center"
          borderRadius="full"
          display={isSlideOpen ? "none" : "flex"}
          bg="red"
          color="white"
          bottom={{ base: 50, md: 135 }}
          right={{ base: 3, md: 8 }}
        >
          !
        </Badge>
      </Hide>
    
      {/* Phone (Mobile) */}
      <Show below="md">
        <Box position="relative" display="inline-block">
          <IconButton
            aria-label="Open Music Player"
            icon={<LuAudioLines />}
            size="lg"
            display={isSlideOpen ? "none" : "flex"}
            zIndex="100"
            fontSize="2xl"
            borderRadius="full"
            boxShadow="dark-lg"
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            onClick={OpenAndCloseSlide}
          />
          <Badge
            position="absolute"
            top="-5px"
            right="-5px"
            fontSize="md"
            w="20px"
              zIndex="101"
            h="20px"
            display={isSlideOpen ? "none" : "flex"}
            justifyContent="center"
            alignItems="center"
            borderRadius="full"
            bg="red"
            color="white"
          >
            !
          </Badge>
        </Box>
      </Show>
    </>
     :
     <></> 
    }
{currentTrack!=null ?
      <Slide boxShadow="dark-lg" direction="bottom" in={isSlideOpen} style={{ zIndex: 20,margin:"auto", position: "fixed", bottom: 0, width: "100%",maxWidth:"600px" }}>
        <Box borderTopRightRadius={'20px'} overflow={'hidden'}  transition="max-height 0.3s" // ✅ Apply transition to max-height
  maxHeight={showPlayList ? "550px" : "200px"}  h={showPlayList ? '550px' : '200px'}  borderTopLeftRadius={'20px'} p={4} bg="orange.300" m={'auto'} w={'100%'} maxW={'600px'} boxShadow="dark-lg" position="relative">
          {/* Close Button */}
         

          {/* Track Name */}
          {/* <Text>{currentTrack ? currentTrack : "No Track Playing"}</Text> */}

          {/* Native Audio Element */}
          <audio ref={audioRef} src={currentTrack} preload="metadata" />

          {/* Audio Player UI */}
          <Box w="full" p="0px 4px 4px 4px" textAlign="center" color="black">
          <Flex w={"100%"} h={'fit-content'}>
            <Box w={'90%'} textAlign={'left'}>
                
                <Text w={'fit-content'} maxW={'full'} p={'2.5px 10px'} borderRadius={'10px'} bg={'white'} fontFamily={'Oswald, sans-serif'} fontSize={"lg"} color={"black"} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                 {title}
                </Text>
                

                <Text cursor={'pointer'} onClick={findAlbumSlug} mt={'5px'} w={'fit-content'} maxW={'full'} p={'2.5px 10px'} borderRadius={'10px'} bg={'brown'} fontFamily={'Oswald, sans-serif'} fontSize={"sm"} color={"white"} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                 {albumName}
                </Text>

                </Box>
                
                <Box w={'10%'} h={'full'}>
                <IconButton
                size={'sm'}
                colorScheme="orange"
                fontSize={'2xl'}
                onClick={() => {setShowPlayList(prev => !prev);fetchPlaylist();}} 
                  icon={<MdPlaylistPlay />}
                />
                </Box>
              </Flex>
              <Flex justify="space-between" fontSize="sm" mt="2">
              <Text fontFamily={'Oswald, sans-serif'}>{formatTime(currentTime)}</Text>
              <Text fontFamily={'Oswald, sans-serif'}>{formatTime(duration)}</Text>
            </Flex>
            <Slider
            mb={'10px'}
  aria-label="music-progress"
  value={currentTime}
  min={0}
  colorScheme="orange"
  max={duration || 1} // Avoid division by zero if duration is 0
  step={0.1}
  onChange={(val) => {
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val; // Seek to new time
    }
  }}
>
  <SliderTrack  bg='gray'>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>
<Flex alignItems={"center"} mt={'-5px'} justifyContent={'center'} w={"full"} gap={"20px"}>
<IconButton
  mr={'auto'}
            aria-label="Remove Player"
            icon={<MdOutlineClose size={24} />}
                colorScheme="red"
                borderRadius="full"
            onClick={removePlayer}
          />
          
<Box textAlign="center" mb={'-20px'}>
<IconButton
                aria-label="play-pause"
                icon={<FaArrowRotateLeft />}
                size="sm"
                fontSize={"xl"}
                colorScheme="orange"
                borderRadius="full"
                boxShadow="xl"
                onClick={() => {
                  if (audioRef.current) {
                    const newTime = Math.max(audioRef.current.currentTime - 10, 0);
                    audioRef.current.currentTime = newTime;
                    setCurrentTime(newTime); // ✅ Updates the slider UI
                  }
                }}
              />
  <Text fontSize="sm" mt="1" color="gray.600">-10</Text>
</Box>


              <IconButton
                aria-label="play-pause"
                icon={<BiSolidSkipPreviousCircle />}
                size="sm"
                fontSize={"2xl"}
                colorScheme="orange"
                borderRadius="full"
                onClick={previousPodcast}
                boxShadow="xl"
              />
            
              <IconButton
                aria-label="play-pause"
                icon={isPlaying ? <MdPauseCircleFilled /> : <MdOutlinePlayCircleFilled />}
                onClick={handlePlayPause}
                size="md"
                fontSize={"3xl"}
                colorScheme="orange"
                borderRadius="full"
                boxShadow="xl"
              />
              <IconButton
                aria-label="play-pause"
                icon={<BiSolidSkipNextCircle />}
                size="sm"
                onClick={nextPodcast}
                fontSize={"2xl"}
                colorScheme="orange"
                borderRadius="full"
                boxShadow="xl"
              />
            <Box textAlign="center" mb={'-20px'}>
  <IconButton
    icon={<FaArrowRotateRight />}
    size="sm"
    fontSize={"xl"}
    colorScheme="orange"
    borderRadius="full"
    boxShadow="xl"
    onClick={() => {
      if (audioRef.current) {
        let newTime = Math.min(audioRef.current.currentTime + 10, duration);
        if(newTime===duration){
          newTime=0;
        }
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime); // ✅ Updates the slider UI
      }
    }}
  />
  <Text fontSize="sm" mt="1" color="gray.600">+10</Text>
</Box>
             
             <IconButton
             ml={'auto'}
            aria-label="Close Player"
            icon={<MdOutlineRemoveCircle size={24} />}
                colorScheme="red"
                borderRadius="full"
            onClick={OpenAndCloseSlide}
          />
             
            </Flex>
           
            {/* Time Display */}
            
          </Box>

          <Divider w={'100%'} m={'auto'} mt={'25px'} border={'1px solid white'} />
          {isFetchingPlaylist ? 
          <VStack overflow={'auto'} w="100%" mt="10px" spacing={2} h={'330px'}>
          {ar.map((a, index) => (
            <Flex w={'full'} justifyContent={'left'}>
              <Skeleton w={'full'} h={'30px'} />
            </Flex>
          ))}
        </VStack>
        
        :
          <VStack overflow={'auto'} w="100%" mt="10px" spacing={2} h={'330px'}>
    {playList.map((song, index) => (
      <Flex w={'full'} justifyContent={'left'}>
      <Text onClick={()=>{playNewPodcastFromPlayList(index)}} color={"Ep "+song.ep+" - "+song.title===title ? "white" : "black"}  _hover={{color:"white"}} cursor={'pointer'} transitionDuration={'0.3s'} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" key={song.title} fontSize="md" fontFamily="Oswald, sans-serif">
        {"Episode "+song.ep+" - "+song.title}
      </Text>
      </Flex>
    ))}
  </VStack>

}

        </Box>
      </Slide>
:
<></>
}
    </>
  );
};

const formatTime = (time) => {
  if (!time || isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default MusicPlayer;
