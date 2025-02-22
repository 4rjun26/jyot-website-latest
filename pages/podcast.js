import Navbar from "@/components/index_page_components/Navbar";
import { Flex,Text,SimpleGrid,Box } from "@chakra-ui/react";
import PodcastCard from "@/components/podcast_page_components/PodcastCard";
import Footer from "@/components/index_page_components/Footer";
import ScrollToTop from "@/components/index_page_components/ScrollToTop";

export default function podcast(){

    const releases = [
        {
          imgSrc: "https://jyot.in/wp-content/uploads/2024/12/1-manushya-bhav-nu-safalya-shema.jpg",
          title: "Manushya Bhav Nu Safalya Shema ?",
          episodeCount: 10,
        },
        {
            imgSrc: "https://jyot.in/wp-content/uploads/2024/12/1-manushya-bhav-nu-safalya-shema.jpg",
            title: "Manushya Bhav Nu Safalya Shema ?",
            episodeCount: 10,
          },
          {
            imgSrc: "https://jyot.in/wp-content/uploads/2024/12/1-manushya-bhav-nu-safalya-shema.jpg",
            title: "Manushya Bhav Nu Safalya Shema ?",
            episodeCount: 10,
          },
          {
            imgSrc: "https://jyot.in/wp-content/uploads/2024/12/1-manushya-bhav-nu-safalya-shema.jpg",
            title: "Manushya Bhav Nu Safalya Shema ?",
            episodeCount: 10,
          },
          {
            imgSrc: "https://jyot.in/wp-content/uploads/2024/12/1-manushya-bhav-nu-safalya-shema.jpg",
            title: "Manushya Bhav Nu Safalya Shema ?",
            episodeCount: 10,
          },
      
      ];

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
              {releases.map((release, index) => (
                <PodcastCard imgSrc={release.imgSrc} title={release.title} episodeCount={release.episodeCount} />
              ))}
              </SimpleGrid>
              </Box>

        
        </>
    );
}