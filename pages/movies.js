import React from "react";
import { Flex,Text,Tag,Box,SimpleGrid,Skeleton,Button,Card,CardBody,Image } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function YTMovies(){

const [shorts,setShorts]=useState([]);
const [page, setPage] = useState(1); // ✅ Track the current page
    const [loading, setLoading] = useState(false);
const router=useRouter();

    const changePageToVideo = async (categoryName,videoSlug)=>{
        try {
            const response = await fetch(`/api/get_slug_from_title?categoryName=${categoryName}`, {
              headers: {
                  "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
          }); // ✅ Fetch paginated data
            if (!response.ok) throw new Error("Failed to fetch podcasts");
      
            const data = await response.json();
            if (data.length > 0){
            router.push(`/${data[0].slug}/${videoSlug}`);
                
            }
        } catch (error) {
            console.error("Error fetching podcasts:", error);
          } finally {
            // setisLoading(false);
          }
      };

      const changePage = async (categoryName)=>{
        try {
            const response = await fetch(`/api/get_slug_from_title?categoryName=${categoryName}`, {
              headers: {
                  "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
          }); // ✅ Fetch paginated data
            if (!response.ok) throw new Error("Failed to fetch podcasts");
      
            const data = await response.json();
            if (data.length > 0){
            router.push(`/${data[0].slug}`);
                
            }
        } catch (error) {
            console.error("Error fetching podcasts:", error);
          } finally {
            // setisLoading(false);
          }
      };


const fetchData = async (pageNum) => {
        setLoading(true);
    
        try {
          const response = await fetch(
            `/api/get_shorts_and_videos?category_slug=movie&page=${pageNum}&limit=6`,
            {
              headers: {
                Authorization: `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch data");
    
          const result = await response.json();

    
          // Ensure posts are only updated if new data is available
          if (result && result.length > 0) {
            setShorts(result);
            setPage((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      // Append new data when "Load More" is clicked
      const addData = async (pageNum) => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/get_shorts_and_videos?category_slug=movie&page=${pageNum}&limit=6`,
            {
              headers: {
                Authorization: `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch data");
    
          const result = await response.json();
    
          // Append new posts only if they exist
          if (result && result.length > 0) {
            setShorts((prev) => [...prev, ...result]);
            setPage((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
    
  
    
      // Fetch data when the active tab changes
      useEffect(() => {
          fetchData(page);
      }, []);


    return(
        <>
         <Flex justifyContent={'center'} alignItems={'center'} w={'100vw'} h={'100px'} bg={'#de2225'}>
                        <Text fontSize={"30px"} color={'white'} fontFamily={'Oswald, sans-serif'}>
                        Enrich your soul by contributing towards Prabhavana of Jinvachan.
                        </Text>
                      </Flex>
                      <Flex justifyContent={'center'} mt={'10px'} mb={'10px'}>
                      <Text fontSize={'30px'} fontWeight={'bold'} textTransform={'uppercase'} fontFamily={'Oswald, sans-serif'}>Jyot Videos</Text>
                      </Flex>

              <Box p={4}>
              <SimpleGrid columns={{ base: 1, sm: 1, lg:3 }} spacing={4}>
                    {loading
                      ? Array.from({ length: 9 }).map((_, index) => (
                          <Skeleton key={index} w={"full"} h={"450px"} borderRadius={"15px"} />
                        ))
                      : shorts.map((post, index) => (
                        <>
                        <Card key={index} h="400px" boxShadow="md" borderRadius="md">
                        <CardBody h={'full'}>
                        
                        {/* Image Box */}
                        <Box w="100%" h="70%" bg={'black'} overflow={"hidden"}>
                        <Image alt="sample"
                        src={post.img}
                        w={"100%"}
                        h={"100%"}
                        objectFit={'contain'}
                        cursor="pointer"
                        borderRadius={'5px'}
                        transitionDuration={'0.3s'}
                        _hover={{ transform: "scale(1.05)",opacity:"0.5" }}
                        onClick={()=>{changePageToVideo(post.category_name[0],post.slug)}}
                        />
                        </Box>
                        <Flex mt={'10px'} w={'full'} h={'15%'}>
                        <Text fontSize={'lg'} noOfLines={2} fontFamily={'Oswald, sans-serif'}>{post.title}</Text>
                        </Flex>
                        {post.category_name[0]!=null ?
                        <Flex gap={'10px'} w={'full'} pt={'5px'}>   
                        <Tag cursor={'pointer'} onClick={()=>{changePage(post.category_name[0])}} colorScheme="orange">{post.category_name[0]}</Tag>
                        </Flex>
                        :
                        <></>  
                        }
                        </CardBody>
                        </Card>
                        </> 
                        ))}
                  </SimpleGrid>
<Flex justify="center" mt={6}>
                    <Button colorScheme="orange" onClick={()=>{addData(page)}} isLoading={loading} loadingText="Loading...">
                      Load More
                    </Button>
                  </Flex>
              </Box>
        </>
    );
}

