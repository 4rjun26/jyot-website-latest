import React from "react";
import { Box,Image,Tag,Text,Flex,Button } from "@chakra-ui/react";
import Link from "next/link";
import { useState,useEffect } from "react";

export default function BlogList(){
  const [blogs, setBlogs] = useState([]); // Store blogs
  const [page, setPage] = useState(1); // Track page number
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/get_blogs?page=${page}&limit=5`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
    if (!response.ok) throw new Error("Failed to fetch podcasts");
      const data = await response.json();

      if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data

      setBlogs((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1); // Increase page count
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setIsLoading(false);
  };

  // Load first batch on mount
  useEffect(() => {
    fetchBlogs();
    console.log(blogs);
  }, []);

  
    return(
        <>
        {blogs.map((blog)=>(
         <Box w={"90%"} position="relative" overflow="hidden" h={'500px'} margin={'auto'} mb={'50px'}>
      {/* {isLoading ? <Skeleton w={'100%'} h={'100%'} /> :  */}
      <>

      <Image alt="sample"
      src={blog.img}
      w={"100%"} h={"100%"} objectFit={'contain'}  />
          <Link href={`/${blog.category_name[0]}/${blog.slug}`}>
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
        <Text fontSize="30px" fontFamily={'Oswald, sans-serif'} textTransform={'uppercase'} color="white">
        {blog.title}
        </Text>
        <Text color="white">
        By <Link href="#" color="orange" fontWeight={'bold'}>jyotadmin</Link> / {blog.publish_date!=null ? blog.publish_date.substring(0,10) : ""}
        </Text>
      </Flex>
      </Link>
      </>
    {/* } */}
    </Box>
    ))}
<Box w={'full'} textAlign={'center'} mb={'20px'}>
<Button colorScheme="orange" onClick={fetchBlogs} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load More"}
      </Button>
      </Box>
        </>
    );
}