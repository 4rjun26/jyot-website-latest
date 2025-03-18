import { useRouter } from "next/router";
import { Box, Text,Flex,SimpleGrid,Card,CardBody,Stack,Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Navbar from "@/components/index_page_components/Navbar";
import { Tag } from "@chakra-ui/react";
import Link from "next/link";
import { useState,useEffect } from "react";
import { Skeleton } from "@chakra-ui/react";
import PodcastCards from "@/components/index_page_components/PodcastCards";

const SongPage = () => {
  const [podcasts_eps, setPodcastEps] = useState([]);
  const [podcast_metadate, setPodcastMetadata] = useState({});
  const ar=[1,2,3,4,5,6,7,8,9,10,11,12];
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Get dynamic ID from URL
  const fetchPodcasts = async (slug) => {
      try {
        setisLoading(true);
        const response = await fetch(`/api/get_song_songs?slug=${slug}`, {
          headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
          },
      }); // ✅ Fetch paginated data
        if (!response.ok) throw new Error("Failed to fetch podcasts");
  
        const data = await response.json();
        if (!data.podcasts_array || data.podcasts_array.length === 0) {
          setHasMore(false); // ✅ Stop fetching if no more data
          return;
        } // ✅ Stop loading if no more data
        setPodcastMetadata({
          title: data.title,
          desc:data.desc,
          img: data.img,
          publish_date: data.publish_date,
        });
        setPodcastEps(data.podcasts_array); 
        
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setisLoading(false);
      }
    };
  
  
    useEffect(() => {
      fetchPodcasts(id); 
    }, []); 

 
  return (
    <>
    <br /><br /><br />
    <Box w={"90%"} position="relative" overflow="hidden" h={'500px'} margin={'auto'}>
      {isLoading ? <Skeleton w={'100%'} h={'100%'} /> : 
      <>
      <Image alt="sample"
      src={podcast_metadate.img}
      w={"100%"} h={"100%"} objectFit={'contain'}  />

        <Flex
        align="start" // Align items to the start (left-aligned)
        justify="end" // Push content to the bottom
        position="absolute"
        bottom="0px" left="0%"
        background= "linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.9))"
        w={'100%'}
        h={'100%'}
        flexDirection="column" 

        p={6} boxShadow="xl"
      >
      
        <Tag bg={'orange'} fontFamily={'Oswald, sans-serif'} color={'white'}>PODCAST</Tag>
        <Text fontSize="40px" fontFamily={'Oswald, sans-serif'} textTransform={'uppercase'} color="white">
        {podcast_metadate.title}
        </Text>
        <Text color="white">
        By <Link href="#" color="orange" fontWeight={'bold'}>jyotadmin</Link> / {podcast_metadate.publish_date != null
            ? new Date(podcast_metadate.publish_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}
        </Text>
      </Flex>
      </>
    }
    </Box>
    <Box p={4} textAlign={'center'} m={'auto'} w={'100%'} maxW={'700px'}>
    <Text fontSize={'lg'}><div dangerouslySetInnerHTML={{ __html: podcast_metadate.desc }} /></Text>
    </Box>


    <Box p={4}>
      <PodcastCards podcasts_array={podcasts_eps} pt={podcast_metadate.title} />
              </Box>

              <Flex justifyContent={'center'} alignItems={'center'} w={'100vw'} h={'100px'} bg={'#de2225'}>
                <Text fontSize={"30px"} color={'white'} fontFamily={'Oswald, sans-serif'}>
                Enrich your soul by contributing towards Prabhavana of Jinvachan.
                </Text>
              </Flex>
    </>
  );
};

export default SongPage;
