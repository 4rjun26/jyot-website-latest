import React from "react";
import { Flex,Text,Box,Card,CardBody,Image,SimpleGrid,Skeleton,Tag, Button } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ArticlesPage(){

      const [articles, setArticles] = useState([]);
      const ar=[1,2,3,4,5,6,7,8,9];
      const [loading, setisLoading] = useState(true);
      const [page, setPage] = useState(1); // ✅ Track the current page
      const [hasMore, setHasMore] = useState(true);
      const router = useRouter();

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

      const fetchPodcasts = async (pageNum) => {
        try {
          setisLoading(true);
          const response = await fetch(`/api/get_all_articles?page=${pageNum}&limit=9`, {
            headers: {
                "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            },
        }); // ✅ Fetch paginated data
          if (!response.ok) throw new Error("Failed to fetch podcasts");
    
          const data = await response.json();
          if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data
    
          setArticles(data); // ✅ Append new data
        } catch (error) {
          console.error("Error fetching podcasts:", error);
        } finally {
          setisLoading(false);
        }
      };
    
      const loadMore = async (pageNum) => {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
          try {
            setisLoading(true);
            const response = await fetch(`/api/get_all_articles?page=${pageNum}&limit=9`, {
              headers: {
                  "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
          }); // ✅ Fetch paginated data
            if (!response.ok) throw new Error("Failed to fetch podcasts");
      
            const data = await response.json();
            if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data
      
            setArticles((prev) => [...prev, ...data]); // ✅ Append new data
          } catch (error) {
            console.error("Error fetching podcasts:", error);
          } finally {
            setisLoading(false);
          }
        }
      };
    
    
      useEffect(() => {
        fetchPodcasts(1); 
      }, []); 
    
    return(
        <>
        <Flex justifyContent={'center'} alignItems={'center'} w={'100vw'} h={'100px'} bg={'#de2225'}>
                        <Text fontSize={"30px"} color={'white'} fontFamily={'Oswald, sans-serif'}>
                        Enrich your soul by contributing towards Prabhavana of Jinvachan.
                        </Text>
                      </Flex>
                      <Flex justifyContent={'center'} mt={'10px'} mb={'10px'}>
                      <Text fontSize={'30px'} fontWeight={'bold'} textTransform={'uppercase'} fontFamily={'Oswald, sans-serif'}>Jyot Articles</Text>
                      </Flex>

          <Box p={4}>
              <SimpleGrid columns={{ base: 1, sm: 2, lg:3 }} spacing={4}>
                {loading ? 
                  ar.map((a, index) => (
                    <Skeleton  key={index} h="200px" boxShadow="md" borderRadius="md" />
                  ))
                
              :
              articles.map((article, index) => (
                <Card key={index} h="400px" boxShadow="md" borderRadius="md">
                  <CardBody h={'full'}>
                   
                    {/* Image Box */}
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
                }
                
              </SimpleGrid>
              <Box p={'10px'} w={'full'} textAlign={'center'}><Button onClick={()=>{loadMore(page)}} colorScheme="orange">Load more</Button></Box>
            </Box>
        </>
    );
}