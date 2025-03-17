import React from "react";
import { Box, SimpleGrid, Card, CardBody, Image, Text, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { BsPauseCircleFill } from "react-icons/bs";
import { useState,useEffect } from "react";
const PodcastCards = ({podcasts_array}) => {

  const [ls,setLs]=useState(null);

  const handlePlay = (soundSrc,id,str,album,albumSlug) => {
    localStorage.setItem("currentTrack", soundSrc); // ✅ Save to localStorage
    localStorage.setItem("audioId", id);
    localStorage.setItem("audioTitle", str);
    localStorage.setItem("audioAlbum", album);
    localStorage.setItem("audioAlbumSlug", albumSlug);
    setLs(id);
    // dispatch(playAudio(soundSrc)); // ✅ Update Redux store
  };

  useEffect(() => {
    let intervalId;
  
    const checkLocalStorage = () => {
      if (!localStorage.getItem("audioId")) {
        setLs(null);
      }
      else{
        setLs(localStorage.getItem("audioId"));
      }
      intervalId = setTimeout(checkLocalStorage, 500); // Check every 500ms
    };
  
    checkLocalStorage(); // Run initially
  
    return () => {
      clearTimeout(intervalId); // Clean up on unmount
    };
  }, []);
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {podcasts_array.map((ep, index) => (
          <Card key={index} borderRadius="md" overflow="hidden" h="500px" w="100%" >
            <CardBody p={0} cursor="pointer">
              <Box p={4} h="20%">
                <Text fontSize="0.9rem" mb="5px" fontFamily="Oswald, sans-serif">
                Ep {ep.ep} - {ep.title} | {ep.category_name[0]}
                </Text>
                <Link style={{fontSize:"0.7rem",background:"brown",padding:"5px 8px",color:"white"}} href="#" fontSize="0.7rem" bg="brown" p="5px 8px" color="white">
                  {ep.category_name[0]}
                </Link>
              </Box>
              <Box position={'relative'} w="100%" h="fit-content" bg="black" overflow="hidden">
              {ls===ep._id ?
              <>
              {/* <Image alt="sample" 
                src="audio_gif.gif"
                w={'full'}
                h={'auto'}
                top={'50%'}
                opacity={'1'}
                transform={"scale(0.3)"}
                position={'absolute'}
                zIndex={'10'}
              filter="sepia(100%) hue-rotate(-30deg) saturate(500%)"
              /> */}
              <Text fontFamily="Oswald, sans-serif" color={'white'} textAlign={'center'} fontSize={'3xl'} zIndex={'10'}  position={'absolute'} h={'50px'} w={'full'}  top={'45%'} >Now playing</Text>
              </>
               :
               <IconButton onClick={() => handlePlay(ep.link,ep._id,"Ep "+ep.ep+" - "+ep.title,ep.category_name,ep.slug)} zIndex={'10'} position={'absolute'} fontSize={'3xl'} borderRadius={'full'} w={'40px'} h={'40px'} left={'88%'} top={'88%'} icon={<MdOutlinePlayCircleFilled />} colorScheme="orange" />
              }
                <Image src={ep.img} _hover={{opacity:"0.5"}} alt={ep.title} opacity={ls===ep._id ? "0.5" : "1"} objectFit="contain" w="100%" h="100%" transitionDuration="0.5s" />
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PodcastCards;
