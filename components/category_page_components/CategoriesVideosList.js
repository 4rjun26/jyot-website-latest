import React from "react";
import { Box,SimpleGrid,Flex,Image,Text,Button,Skeleton,Tag } from "@chakra-ui/react";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import PodcastCards from "../index_page_components/PodcastCards";


const CategoriesVideosList = ({category})=>{
  // const router = useRouter();
  // const { category } = router.query;
      const [posts, setPosts] = useState([]); // Stores posts fetched from API
      const [postMetadata, setPostMetaData] = useState([]); // Stores posts fetched from API
      const [category_title,setCategoryTitle]=useState("");
      const [page, setPage] = useState(1); // Track number of "Load More" clicks
      const [loading, setLoading] = useState(false); // Loading state
      const limit = 9; // Number of posts per request
    
      // Fetch posts from API
      const fetchPosts = async (currentPage, currentCategory) => {
        if (!currentCategory) return;
        setLoading(true);
        try {
          const res = await fetch(`/api/get_category_based_posts?category_slug=${category}&page=${page}&limit=${limit}`, {
            headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            },
          });
      
          const data = await res.json();
      
          // Ensure posts is always an array
          const newPosts = Array.isArray(data.podcasts_array) ? data.podcasts_array : [];
          
          setPosts((prev) => (currentPage === 1 ? newPosts : [...prev, ...newPosts]));
          
          setCategoryTitle(data.category_title || ""); // Ensure title is always a string
      
          setPostMetaData({
            title: data.title || "",
            desc: data.desc || "",
            img: data.img || "",
            publish_date: data.publish_date || null,
          });
      
        } catch (error) {
          console.error("Error fetching posts:", error);
          setPosts([]); // Set posts to an empty array in case of error
        }
        setLoading(false);
      };
      
    
      // Initial fetch when component mounts
      useEffect(() => {
        fetchPosts(page, category);
      }, [page, category]);
      
      // 🔄 Reset page when category changes
      useEffect(() => {
        setPage(1);
      }, [category]);
    
    return(
        <>
        <Box w={"90%"} position="relative" overflow="hidden" margin={'auto'}>
            {loading ? (
          <Skeleton w={'100%'} h={'100%'} />
        ) : (
          <>
            {postMetadata.banner_img ? (
              <Image
                alt="Podcast Banner"
                src={postMetadata.banner_img}
                w={"100%"} 
                h={"100%"} 
                objectFit={'contain'} 
              />
            ) : (
              <>
              </>
            )}
          </>
        )}
            </Box>
            {loading ? <>Loading...</> : 
          <>
            <Flex
                align="start" // Align items to the start (left-aligned)
                justify="end" // Push content to the bottom
                w={'full'}
                maxW={'800px'}
                m={'auto'}
                mb={'30px'}
                flexDirection="column" 
                p={2}
              >
              {(posts.length > 0) && (posts[0].content_type === "audio" || posts[0].content_type === "music") ?  
                <Tag bg={'orange'} fontFamily={'Oswald, sans-serif'} color={'white'}>PODCAST</Tag>
              :
              <></>
              }
                <Text fontSize="40px" fontFamily={'Oswald, sans-serif'} textTransform={'uppercase'}>
                {postMetadata.title}
                </Text>
                <Text>
                 {postMetadata.publish_date != null
                    ? new Date(postMetadata.publish_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </Text>
              </Flex>
        
            <Box  p={2} textAlign={'left'} m={'auto'} w={'100%'} maxW={'800px'}>
            <Text fontSize={'lg'}><div dangerouslySetInnerHTML={{ __html: postMetadata.desc }} /></Text>
            </Box>
        
            <Box w={'full'} p={4}>
              {(posts.length > 0) && (posts[0].content_type === "audio" || posts[0].content_type === "music") ?
                 <PodcastCards podcasts_array={posts} pt={"pt"} />
                 :
                 <>
                 <SimpleGrid columns={{ base: 1, sm: 2, lg:3 }} spacing={4}>
                {loading
          ? // Show 9 skeletons while loading
            Array.from({ length: 9 }).map((_, index) => (
              <Box
                key={index}
                borderRadius={"15px"}
                m={"auto"}
                w={"full"}
                h={{ md: "450px" }}
                minH={{ md: "450px" }}
                border={"1px solid gray"}
              >
                <Skeleton w={"full"} h={"70%"} borderRadius={"15px"} />
                <Box p={"5px"} w={"full"} h={"30%"}>
                  <Skeleton height="20px" my="10px" />
                  <Skeleton height="15px" width="50%" />
                  <Skeleton height="15px" width="40%" />
                </Box>
              </Box>
            ))
          : // Show actual posts
               posts.map((post,index)=>(
                    <Box key={index} borderRadius={'15px'} m={'auto'} w={'full'} h={{md:"450px"}} minH={{ md: "450px" }}  border={'1px solid gray'}>
                        <Box w={'full'} h={'70%'} bg={'black'} borderRadius={'15px'}>
                            <Link href={`/${category}/${post.slug}`}><Image alt="sample" borderRadius={'15px 15px 0px 0px'} src={post.img} w={'full'} _hover={{boxShadow:"dark-lg"}} h={'full'} objectFit={'contain'} transitionDuration={'0.3s'} /></Link>
                        </Box>
                        <Box p={'5px'} w={'full'} h={'30%'}>
                            <Text fontSize={'large'} fontFamily={'Oswald, sans-serif'}>{post.title!="null" ? post.title : `Ep ${post.ep} - ${post.category_name[0]}`}</Text>
                            
                            <Text border={'2px solid orange'} w={'fit-content'} p={'3px 10px'} borderRadius={'10px'} display={'flex'} gap={'5px'} alignItems={'center'} mt={'5px'} fontSize={'sm'} fontFamily={'Oswald, sans-serif'}><MdCalendarMonth /> 
                           {post.publish_date != null
            ? new Date(post.publish_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}
                            </Text>
                        </Box>
                    </Box>
                ))}
                </SimpleGrid>
                 </>
              }
                
                <Flex justify="center" mt={6}>
          <Button
            colorScheme="orange"
            onClick={() => setPage(page + 1)}
            isLoading={loading}
            loadingText="Loading..."
          >
            Load More
          </Button>
        </Flex>
            </Box>
            </>
            }
        </>
    );
}

export default CategoriesVideosList;



