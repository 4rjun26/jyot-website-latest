import React from "react";
import { Box,SimpleGrid,Flex,Image,Text,Button,Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";


const CategoriesVideosList = ({category})=>{
  // const router = useRouter();
  // const { category } = router.query;
      const [posts, setPosts] = useState([]); // Stores posts fetched from API
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
          setPosts((prev) => (currentPage === 1 ? data.posts : [...prev, ...data.posts]));
          setCategoryTitle(data.category_title) // ✅ Reset when fetching new category// Append new posts
        } catch (error) {
          console.error("Error fetching posts:", error);
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
        <Box w={'fit-content'} pl={'20px'}>
           <Text fontSize={'2xl'} textTransform={'uppercase'} borderBottom={'2px solid brown'} fontFamily={'Oswald, sans-serif'} mr={'auto'}>{category_title}</Text>
        </Box>
            <Box w={'full'} p={4}>
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
                            <Link href={`/${category}/${post.slug}`}><Image alt="sample" borderRadius={'15px 15px 0px 0px'} src={post.img} w={'full'} _hover={{boxShadow:"dark-lg"}} h={'full'} objectFit={'cover'} transitionDuration={'0.3s'} /></Link>
                        </Box>
                        <Box p={'5px'} w={'full'} h={'30%'}>
                            <Text fontSize={'large'} fontFamily={'Oswald, sans-serif'}>{post.title}</Text>
                            
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
    );
}

export default CategoriesVideosList;