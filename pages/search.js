import { useSearchParams } from "next/navigation";
import React from "react";
import { Box,Text,Flex,Button } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup,SimpleGrid,Card,CardBody,Tag,Image,Skeleton,SkeletonCircle } from '@chakra-ui/react'
import { useState,useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { BsChevronDoubleRight } from "react-icons/bs";
import PodcastCards from "@/components/index_page_components/PodcastCards";
import YTCards from "@/components/index_page_components/YTCards";

export default function SearchPage(){

    const searchParams = useSearchParams();
  const searchValue = searchParams.get("s"); 
    const [searchCategories,setSearchCategories]=useState([]);
    const [showCategories,setShowCategories]=useState(0);

    const [searchTopics,setSearchTopics]=useState([]);
    const [showTopics,setShowTopics]=useState(0);
    
    const [searchPodcasts,setSearchPodcasts]=useState([]);
    const [showPodcasts,setShowPodcasts]=useState(0);

    const [searchSongs,setSearchSongs]=useState([]);
    const [showSongs,setShowSongs]=useState(0);

    const [searchArticle,setSearchArticle]=useState([]);
    const [showArticle,setShowArticle]=useState(0);

    const [searchShorts,setSearchShorts]=useState([]);
    const [showShorts,setShowShorts]=useState(0);

    const [searchVideos,setSearchVideos]=useState([]);
    const [showVideos,setShowVideos]=useState(0);

    const [isLoading,setisLoading]=useState(false);
    const toast = useToast();
  const fectchSearchResults = async (searchValue) => {
    try {
      setisLoading(true);
      setSearchCategories([]);
      setSearchTopics([]);
      setSearchPodcasts([]);
      setSearchSongs([]);
      setSearchArticle([]);
      setSearchShorts([]);
      setSearchVideos([]);

      const response = await fetch(`/api/get_search_results?searchValue=${searchValue}`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    });
      if (!response.ok){
        toast({
          title: "Internal Server Error",
          description: "Something went wrong while fetching results. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }

      const data = await response.json();
      
      if (data.categories && data.categories.length > 0) {
        setSearchCategories(data.categories);
        if(data.categories.length>4){
            setShowCategories(4);
        }
      }
      if(data.topics && data.topics.length>0){
        setSearchTopics(data.topics);
        if(data.topics.length>4){
            setShowTopics(4);
        }
      }
      if(data.podcasts && data.podcasts.length>0){
        setSearchPodcasts(data.podcasts);
        if(data.podcasts.length>4){
            setShowPodcasts(4);
        }
      }
      if(data.songs && data.songs.length>0){
        setSearchSongs(data.songs);
        if(data.songs.length>4){
            setShowSongs(4);
        }
    }
    if(data.articles && data.articles.length>0){
        setSearchArticle(data.articles);
        if(data.articles.length>3){
            setShowArticle(3);
        }
    }
    if(data.shorts && data.shorts.length>0){
        setSearchShorts(data.shorts);
        if(data.shorts.length>3){
            setShowShorts(4);
        }
    }
    
    if(data.videos && data.videos.length>0){
      setSearchVideos(data.videos);
      if(data.videos.length>3){
          setShowVideos(4);
      }
  }
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      toast({
        title: "Internal Server Error",
        description: "Something went wrong while fetching results. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setisLoading(false);
    }
  };

    useEffect(() => {
        fectchSearchResults(searchValue); 
    }, [searchValue]); 
      
    const changePage = async (categoryName)=>{
        try {
            const response = await fetch(`/api/get_slug_from_title?categoryName=${categoryName}`, {
              headers: {
                  "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
          }); // ✅ Fetch paginated data
            if (!response.ok) throw new Error("Failed to fetch podcasts");
      
            const data = await response.json();
            if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data
            router.push(`/${data[0].slug}`);
          } catch (error) {
            console.error("Error fetching podcasts:", error);
          } finally {
            // setisLoading(false);
          }
      };
    return(
        <>
         <br />
        {/* Categories */}
        {searchCategories.length>0 ? 
        <Flex  justifyContent={'center'} pb={2} w={'full'} maxW={'900px'} m={'auto'}  >
            <Text mt={'20px'} mb={'10px'} pb={'10px'} fontSize={'2xl'}  fontFamily={'Oswald, sans-serif'}  borderBottom={'5px solid brown'} w={'fit-content'}>Categories</Text>
        </Flex>
        :
        <></>    
    }   
        { searchCategories.length<1 ?
        
        <Flex alignItems={'start'} overflowY={'hidden'} overflowX={'auto'} gap={'15px'} p={3} w={'full'}  maxW={'900px'} m={'auto'} justifyContent={'center'}>
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCircle key={index} size={'70'} />
        ))}
        </Flex>
        :
        <>
            <Flex alignItems={'start'} overflowY={'hidden'} overflowX={'auto'} gap={'15px'} p={3} w={'full'}  maxW={'900px'} m={'auto'} justifyContent={'center'}>
            {(searchCategories.length > 4 ?  searchCategories.slice(0,showCategories) : searchCategories).map((value, index) => (
  <Link href={`/${value.slug}`}>
 <Flex key={index} direction="column" align="center" w="90px">
   
    <Avatar size="md" src={value.img} />
    <Box w="full" textAlign="center" mt={2}>
      <Text fontSize="sm" fontWeight="bold" noOfLines={4}>{value.title}</Text>
    </Box>
  </Flex>
  
  </Link>
))}
        </Flex>

       {showCategories<=4 && searchCategories.length>4 ? <Box w={'full'} textAlign={'center'}><Button _hover={{transform:"translateY(-10px)"}} variant={'outline'} colorScheme={'orange'} onClick={() => setShowCategories(searchCategories.length)} size={'sm'} rightIcon={<BsChevronDoubleRight />}>View all</Button></Box> : <></>}
        </>
            }
            {/* <br /><br /> */}
             {/* Topics */}
             {/* {searchTopics.length>0 ? 
        <Flex  justifyContent={'center'} pb={2} w={'full'} maxW={'900px'} m={'auto'}  >
            <Text mt={'20px'} mb={'10px'} pb={'10px'} fontSize={'2xl'}  fontFamily={'Oswald, sans-serif'}  borderBottom={'5px solid brown'} w={'fit-content'}>Topics</Text>
        </Flex>
        :
        <></>    
    }   
        { searchTopics.length<1 ? 
        <Flex alignItems={'start'} overflowY={'hidden'} overflowX={'auto'} gap={'15px'} p={3} w={'full'}  maxW={'900px'} m={'auto'} justifyContent={'center'}>
       
       
        </Flex>
        :
 <>
 <Flex alignItems={'start'} gap={'15px'} p={3} w={'full'}  maxW={'900px'} m={'auto'} justifyContent={'center'}>
            {(searchTopics.length > 4 ?  searchTopics.slice(0, -(searchTopics.length-showTopics)) : searchTopics).map((value, index) => (
  <Flex key={index} direction="column" align="center" w="90px">
    <Avatar size="md" src={value.img} />
    <Box w="full" textAlign="center" mt={2}>
      <Text fontSize="sm" fontWeight="bold" noOfLines={4}>{value.title}</Text>
    </Box>
  </Flex>
))}
        </Flex>
         {showTopics<=4 && searchTopics.length>4 ? <Box w={'full'} textAlign={'center'}><Button _hover={{transform:"translateY(-10px)"}} variant={'outline'} colorScheme={'orange'} onClick={() => setShowTopics(searchTopics.length)} size={'sm'} rightIcon={<BsChevronDoubleRight />}>View all</Button></Box> : <></>}
      </>
            } */}
             {/* <br /><br /> */}

            {/*Podcasts  */}
    {searchPodcasts.length>0 ? 
        <Flex  justifyContent={'center'} pb={2} w={'full'} maxW={'900px'} m={'auto'}  >
            <Text mt={'20px'} mb={'10px'} pb={'10px'} fontSize={'2xl'}  fontFamily={'Oswald, sans-serif'}  borderBottom={'5px solid brown'} w={'fit-content'}>Podcasts</Text>
        </Flex>
        :
        <></>    
    }  

   <PodcastCards podcasts_array={searchPodcasts.length > 4 ? searchPodcasts.slice(0, showPodcasts) : searchPodcasts} />
   {showPodcasts<=4  && searchPodcasts.length>4 ? <Box w={'full'} textAlign={'center'}><Button  _hover={{transform:"translateY(-10px)"}} variant={'outline'} onClick={() => setShowPodcasts(searchPodcasts.length)} colorScheme={'orange'} size={'sm'} rightIcon={<BsChevronDoubleRight />}>View all</Button></Box> : <></>}
   {/* <br /><br /> */}

   {/*Songs  */}
   {searchSongs.length>0 ? 
        <Flex  justifyContent={'center'} pb={2} w={'full'} maxW={'900px'} m={'auto'}  >
            <Text mt={'20px'} mb={'10px'} pb={'10px'} fontSize={'2xl'}  fontFamily={'Oswald, sans-serif'}  borderBottom={'5px solid brown'} w={'fit-content'}>Songs</Text>
        </Flex>
        :
        <></>    
    }  

   <PodcastCards podcasts_array={searchSongs.length > 4 ? searchSongs.slice(0, showSongs) : searchSongs} />
   {showSongs<=4  && searchSongs.length>4 ? <Box w={'full'} textAlign={'center'}><Button  _hover={{transform:"translateY(-10px)"}} variant={'outline'} onClick={() => setShowSongs(searchSongs.length)} colorScheme={'orange'} size={'sm'} rightIcon={<BsChevronDoubleRight />}>View all</Button></Box> : <></>}
   {/* <br /><br /> */}

 {/*Articles  */}
 {searchArticle.length>0 ? 
        <Flex  justifyContent={'center'} pb={2} w={'full'} maxW={'900px'} m={'auto'}  >
            <Text mt={'20px'} mb={'10px'} pb={'10px'} fontSize={'2xl'}  fontFamily={'Oswald, sans-serif'}  borderBottom={'5px solid brown'} w={'fit-content'}>Articles</Text>
        </Flex>
        :
        <></>    
    }

      <Box p={4}>
              <SimpleGrid columns={{ base: 1, sm: 2, lg:3 }} spacing={4}>
            
              { searchArticle ? 
              
              (searchArticle.length > 4 ?  searchArticle.slice(0,showArticle) : searchArticle).map((article, index) => (
                <Card key={index} h="400px" boxShadow="md" borderRadius="md">
                  <CardBody h={'full'}>
                   

                    <Box w="100%" h="70%" bg={'black'} overflow={"hidden"}>
                        <Link href={`/article/${article.slug}`}>
                      <Image alt="sample"
                        src={article.img}
                        w={"100%"}
                        h={"100%"}
                        objectFit={'cover'}
                        cursor="pointer"
                        borderRadius={'5px'}
                        transitionDuration={'0.3s'}
                        _hover={{ transform: "scale(1.05)",opacity:"0.5" }}
                      />
                      </Link>
                    </Box>
                    <Flex w={'full'} h={'15%'}>
                    <Text fontSize={'lg'} noOfLines={2} fontFamily={'Oswald, sans-serif'}>{article.title}</Text>
                    </Flex>
                    {article.category_name[0]!=null ?
                    <Flex gap={'10px'} w={'full'} pt={'5px'}>   
                    <Tag cursor={'pointer'} onClick={()=>{changePage(article.category_name[0])}} colorScheme="orange">{article.category_name[0]}</Tag>
                    </Flex>
                   :
                    <></>   
                        }
                  </CardBody>
                </Card>
              ))
              :
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} w={"full"} h={"450px"} borderRadius={"15px"} />
              ))
                }
                
              </SimpleGrid>
            </Box> 
            {showArticle<=3 && searchArticle.length>3 ? <Box w={'full'} textAlign={'center'}><Button _hover={{transform:"translateY(-10px)"}} variant={'outline'} colorScheme={'orange'} onClick={() => setShowArticle(searchArticle.length)} size={'sm'} rightIcon={<BsChevronDoubleRight />}>View all</Button></Box> : <></>}

            
            {/* <br /><br /> */}

 {/*Articles  */}
 {searchVideos.length>0 ? 
        <Flex  justifyContent={'center'} pb={2} w={'full'} maxW={'900px'} m={'auto'}  >
            <Text mt={'20px'} mb={'10px'} pb={'10px'} fontSize={'2xl'}  fontFamily={'Oswald, sans-serif'}  borderBottom={'5px solid brown'} w={'fit-content'}>Shorts</Text>
        </Flex>
        :
        <></>    
    }
    {/* <div style={{marginTop:"20px"}}> */}
    <YTCards shorts_loading={isLoading} shorts={searchShorts.length > 4 ?  searchShorts.slice(0,showShorts) : searchShorts} />
    {showShorts<=3 && searchShorts.length>3 ? <Box w={'full'} textAlign={'center'}><Button _hover={{transform:"translateY(-10px)"}} variant={'outline'} colorScheme={'orange'} onClick={() => setShowVideos(searchVideos.length)} size={'sm'} rightIcon={<BsChevronDoubleRight />}>View all</Button></Box> : <></>}

    {/* </div> */}
  {/*Videos  */}
  {searchVideos.length>0 ? 
       <Flex  justifyContent={'center'} pb={2} w={'full'} maxW={'900px'} m={'auto'}  >
           <Text mt={'20px'} mb={'10px'} pb={'10px'} fontSize={'2xl'}  fontFamily={'Oswald, sans-serif'}  borderBottom={'5px solid brown'} w={'fit-content'}>Videos</Text>
       </Flex>
       :
       <></>    
   }

<Box w={"full"} p={4}>
                  <SimpleGrid columns={{ base: 1, sm: 2, lg:3  }} spacing={4}>
                    {isLoading 
                      ? Array.from({ length: 3 }).map((_, index) => (
                          <Skeleton key={index} w={"full"} h={"450px"} borderRadius={"15px"} />
                        ))
                      : 
                      (searchVideos.length > 4 ?  searchVideos.slice(0,showVideos) : searchVideos).map((post, index) => (
                        <>
                        <Card key={index} h="400px" boxShadow="md" borderRadius="md">
                  <CardBody h={'full'}>
                   
                    {/* Image Box */}
                    <Box w="100%" h="70%" bg={'black'} overflow={"hidden"}>
                        <Link href={`/watch/${post.slug}`}>
                      <Image alt="sample"
                        src={post.img}
                        w={"100%"}
                        h={"100%"}
                        objectFit={'cover'}
                        cursor="pointer"
                        borderRadius={'5px'}
                        transitionDuration={'0.3s'}
                        _hover={{ transform: "scale(1.05)",opacity:"0.5" }}
                      />
                      </Link>
                    </Box>
                    <Flex mt={'10px'} w={'full'} h={'15%'}>
                    <Text fontSize={'lg'} noOfLines={2} fontFamily={'Oswald, sans-serif'}>{post.title}</Text>
                    </Flex>
                  </CardBody>
                </Card>
                        </>
                       
                        ))}
                  </SimpleGrid>
                </Box>
                {showVideos<=3 && searchVideos.length>3 ? <Box w={'full'} textAlign={'center'}><Button _hover={{transform:"translateY(-10px)"}} variant={'outline'} colorScheme={'orange'} onClick={() => setShowVideos(searchVideos.length)} size={'sm'} rightIcon={<BsChevronDoubleRight />}>View all</Button></Box> : <></>}

         

        </>
    );
}