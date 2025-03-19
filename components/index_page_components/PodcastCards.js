import React from "react";
import { Box, SimpleGrid, Card, CardBody, Image, Text, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { BsPauseCircleFill } from "react-icons/bs";
import { useState,useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { PiShareFatBold } from "react-icons/pi";
import { useRouter } from "next/router";


const PodcastCards = ({podcasts_array,autoplay,metadataSlug}) => {

  const toast = useToast();
  const router = useRouter();
  const [ls,setLs]=useState(null);
  const copyToClipboard = (album_name, ep) => {
    const rootDomain = `${window.location.protocol}//${window.location.host}`;
    
    let slug = album_name.toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
    
    const textToCopy = `${rootDomain}/${slug}/${ep}`;
  
    // ✅ Check if `navigator.clipboard` is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Copied!", "Text copied to clipboard.");
      }).catch(err => {
        console.error("Clipboard API failed:", err);
        fallbackCopyText(textToCopy); // Fallback if `navigator.clipboard` fails
      });
    } else {
      fallbackCopyText(textToCopy); // Fallback for older browsers
    }
  };
  
  // ✅ Fallback function for unsupported browsers
  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand("copy");
      showToast("Copied!", "Text copied to clipboard.");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
  
    document.body.removeChild(textArea);
  };
  
  // ✅ Toast function for feedback
  const showToast = (title, description) => {
    toast({
      title,
      description,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
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

  useEffect(() => {
    console.log("PodcastCards mounted, autoplay:", autoplay);
  }, []);

  useEffect(() => {
    // alert(autoplay);
    // if (autoplay && podcasts_array.length === 1) {
    //   const ep = podcasts_array[0];
  
    //   // Ensure podcast data is fully loaded before playing
    //   if (ep?.link && ep?._id) {
    //     handlePlay(ep.link, ep._id, `Ep ${ep.ep} - ${ep.title}`, ep.category_name, ep.slug);
    //   }
    // }
  }, [autoplay, podcasts_array]); 


  return (
    <Box p={4} display="flex" justifyContent="center">
    <SimpleGrid
      w={podcasts_array.length === 1 ? "350px" : "100%"} // Width for 4 cards
      margin="auto"
      columns={podcasts_array.length === 1 ? 1 : { base: 1, md: 2, lg: 4 }}
      spacing={6}
    >
        {podcasts_array.map((ep, index) => (
          <Card key={index} borderRadius="md"  overflow="hidden" h={'fit-content'} minH="500px" w="100%" pb={'0px'} >
            <CardBody p={0} cursor="pointer">
              
              <Box position={'relative'} w="100%" h="fit-content" bg="black" overflow="hidden">
              {ls===ep._id ?
              <>
              <Text fontFamily="Oswald, sans-serif" color={'white'} textAlign={'center'} fontSize={'3xl'} zIndex={'10'}  position={'absolute'} h={'50px'} w={'full'}  top={'45%'} >Now playing</Text>
              </>
               :
               <IconButton onClick={() => handlePlay(ep.link,ep._id,"Ep "+ep.ep+" - "+ep.title,ep.category_name,ep.slug)} zIndex={'10'} position={'absolute'} fontSize={'3xl'} borderRadius={'full'} w={'40px'} h={'40px'} left={'88%'} top={'88%'} icon={<MdOutlinePlayCircleFilled />} colorScheme="orange" />
              }
                <Image border={'1px solid rgb(200,200,200)'} src={ep.img} _hover={{opacity:"0.5"}} alt={ep.title} opacity={ls===ep._id ? "0.5" : "1"} objectFit="contain" w="100%" h="100%" transitionDuration="0.5s" />
              </Box>
              <Box p={4} h="100px">
                <Text fontSize="0.9rem" noOfLines={2} mb="5px" fontFamily="Oswald, sans-serif">
                Ep {ep.ep} - {ep.title} | {ep.category_name[0]}
                </Text>
                <Link style={{fontSize:"0.7rem",background:"brown",padding:"5px 8px",color:"white"}} href={`/${metadataSlug}`} fontSize="0.7rem" bg="brown" p="5px 8px" color="white">
                  {ep.category_name[0]}
                </Link>
              </Box>
              <Box textAlign={'right'}>
                <IconButton
                fontSize={'2xl'}
                variant={'ghost'}
                borderRadius={'full'}
                  icon={<PiShareFatBold />}
                  colorScheme="orange"
                  onClick={()=>{copyToClipboard(ep.category_name[0],ep.ep)}}
                />
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PodcastCards;
