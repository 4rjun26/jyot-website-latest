import { Flex,Text,SimpleGrid,Box,Button } from "@chakra-ui/react";
import PodcastCard from "@/components/podcast_page_components/PodcastCard";
import { useState,useEffect } from "react";
import { Skeleton } from "@chakra-ui/react";

export default function podcast(){
  const [podcasts, setPodcasts] = useState([]);
  const ar=[1,2,3,4,5,6,7,8,9,10,11,12];
  const [isLoading, setisLoading] = useState(true);
  const [page, setPage] = useState(1); // ✅ Track the current page
  const [hasMore, setHasMore] = useState(true);

  const fetchPodcasts = async (pageNum) => {
    try {
      setisLoading(true);
      const response = await fetch(`/api/get_podcast_albums?page=${pageNum}&limit=12`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Fetch paginated data
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data

      setPodcasts((prev) => [...prev, ...data]); // ✅ Append new data
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setisLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
      fetchPodcasts(page + 1); // ✅ Load next set of posts
    }
  };


  useEffect(() => {
    fetchPodcasts(1); 
  }, []); 

    return(
        <>
        {/* <ScrollToTop /> */}
         <Flex justifyContent={'center'} alignItems={'center'} w={'100vw'} h={'100px'} bg={'#de2225'}>
                <Text fontSize={"30px"} color={'white'} fontFamily={'Oswald, sans-serif'}>
                Enrich your soul by contributing towards Prabhavana of Jinvachan.
                </Text>
              </Flex>
              <Flex justifyContent={'center'} mt={'10px'} mb={'10px'}>
              <Text fontSize={'30px'} fontWeight={'bold'} textTransform={'uppercase'} fontFamily={'Oswald, sans-serif'}>Jyot podcasts</Text>
              </Flex>
               <Box p={4}>
                    <SimpleGrid columns={{ base: 1, sm: 2, lg:4 }} spacing={4}>
                      {isLoading ? ( 
                        ar.map((a, index) => (                
                         <Skeleton h={'400px'}/>
                        ))
                       ) : 
                      
                      (
              podcasts.map((podcast, index) => (                
                <PodcastCard key={index} imgSrc={podcast.img} slug={podcast.slug} title={podcast.title} published_date={podcast.publish_date} />
              ))
            )}
              </SimpleGrid>
              </Box>
            <Box onClick={loadMore} disabled={isLoading} w={'full'} textAlign={'center'}>
            <Button colorScheme="orange" m={'20px auto'}>Load more</Button>
            </Box>
        
        </>
    );
}