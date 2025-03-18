import React from 'react';
import { Box, SimpleGrid, Card, CardBody, Heading, Text, Image,Flex } from '@chakra-ui/react';
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import Link from 'next/link';
import { useState,useEffect } from 'react';

const JTWTCards = () => {


  const [releases,setReleases]=useState([]);
const [isLoading,setIsLoading]=useState(false);

const category="jo-tare-wo-tirth";

const fetchPosts = async (currentPage, currentCategory) => {
  if (!currentCategory) return;
  setIsLoading(true);
  try {
    const res = await fetch(`/api/get_category_based_posts?category_slug=${category}&page=${1}&limit=${3}`, {
      headers: {
          "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
      },
  });
    const data = await res.json();
    setReleases(data.posts);
   
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  setIsLoading(false);
};

// Initial fetch when component mounts
useEffect(() => {
  fetchPosts(1, category);
}, []);


  return (
    <>
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 1, lg:3 }} spacing={4}>
        {isLoading ? <>Loading...</> :
        releases.map((release, index) => (
          <Card p={'0px'} key={index} h="400px" boxShadow="md" borderRadius="0px">
            <CardBody padding={'0px'} flexDirection="column">
              <Box w="100%" h="65%" overflow={"hidden"} bg={'black'}>
              <Link
                  href={`/${category}/${release.slug}`} 
                  >
                <Image alt="sample"
                  src={release.img}
                  width={1000}
                  height={1000}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  cursor="pointer"
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.1)",opacity:"0.5" }}
                />
                      </Link>
              </Box>

              <Box w="100%" flex={"1"} p="5px 10px">
                <Box w="full" h="80%">
                  <Link
                  href={`/${category}/${release.slug}`} 
                  >
                    <Text fontSize={{ base: "1rem", sm: "1rem", md: "1rem", lg: "1.2rem" }}
                    fontFamily="Oswald, sans-serif"
                    fontWeight="bold">
                    {release.title}
                    </Text>
                  </Link>
                </Box>
              </Box>
              <Flex w="100%" h="fit-content" p={'5px 10px'}>
                    <Link href={`/${category}`} ><Text alignItems={'center'} _hover={{color:"orange"}} display={'flex'} gap={'5px'}><AiOutlineFolderOpen /> {release.category_name[0]}</Text></Link>      
                </Flex>
                <Flex w="100%" h="fit-content" p={'5px 10px'}>
                   <Text alignItems={'center'} display={'flex'} gap={'5px'}><BiCalendar />{release.publish_date != null
            ? new Date(release.publish_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}</Text>      
                </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
    </>
  );
};

export default JTWTCards;
