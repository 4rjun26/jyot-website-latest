import React from "react";
import { useRef } from "react";
import { useState,useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Button,Box,Text,SimpleGrid,Flex,Skeleton,Image,Show,Card,CardBody } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

export default function WatchReelsAndVideos(){

    const [tabData, setTabData] = useState([
      { label: "Shorts", slug: "shorts",inarow:4, page_no: 1,posts:[] },
      { label: "Videos", slug: "video",inarow:3, page_no: 1,posts:[] },
      { label: "Movies", slug: "movie",inarow:3, page_no: 1,posts:[] },
    ]);
    const [activeTab, setActiveTab] = useState(0); 
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const { slug, page_no } = tabData[activeTab];
    
        try {
          const response = await fetch(
            `/api/get_shorts_and_videos?category_slug=${slug}&page=${page_no}&limit=6`,
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
            setTabData((prevTabData) =>
              prevTabData.map((tab, index) =>
                index === activeTab ? { ...tab, posts: result } : tab
              )
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      // Append new data when "Load More" is clicked
      const addData = async (newPageNo) => {
        setLoading(true);
        const { slug } = tabData[activeTab];
    
        try {
          const response = await fetch(
            `/api/get_shorts_and_videos?category_slug=${slug}&page=${newPageNo}&limit=6`,
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
            setTabData((prevTabData) =>
              prevTabData.map((tab, index) =>
                index === activeTab
                  ? { ...tab, posts: [...tab.posts, ...result] }
                  : tab
              )
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      // Handle Load More (Increase page_no and trigger API call)
      const handleLoadMore = () => {
        setTabData((prevData) =>
          prevData.map((tab, i) =>
            i === activeTab ? { ...tab, page_no: tab.page_no + 1 } : tab
          )
        );
    
        const newPageNo = tabData[activeTab].page_no + 1;
        addData(newPageNo);
      };
    
      // Fetch data when the active tab changes
      useEffect(() => {
        if (tabData[activeTab].posts.length === 0) {
          fetchData();
        }
      }, [activeTab]);
    
      return (
        <Tabs
          index={activeTab}
          onChange={setActiveTab}
          mt={"10px"}
        >
       
          <TabList m={'auto'} justifyContent={'space-around'} display="flex" gap={4} >
            {tabData.map((tab, index) => (
              <Tab key={index} fontSize={'xl'} fontFamily={'Oswald, sans-serif'}>
                {tab.label}
              </Tab>
            ))}
          </TabList>
       
          <TabPanels>
            {tabData.map((tab, index) => (
              <TabPanel key={index} w={"full"}>
                <Box w={"full"} p={4}>
                  <SimpleGrid columns={{ base: 1, sm: 2, lg:tab.inarow  }} spacing={4}>
                    {loading
                      ? Array.from({ length: 9 }).map((_, index) => (
                          <Skeleton key={index} w={"full"} h={"450px"} borderRadius={"15px"} />
                        ))
                      : tab.posts.map((post, index) => (
                        activeTab<1 ? 
                        <>
                        <iframe
                        style={{ width: "100%", height: "380px" }}
                        src={post.link.includes("watch?v=") ? post.link.replace("watch?v=", "embed/") : post.link}
                        title="Kya Aap Shasan Rasik Hain ? | #Mahasattvashali - 246"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                      </>
                        :
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
                    {/* {tab.category_name[0]!=null ?
                    <Flex gap={'10px'} w={'full'} pt={'5px'}>   
                    <Tag cursor={'pointer'} onClick={()=>{changePage(tab.category_name[0])}} colorScheme="orange">{tab.category_name[0]}</Tag>
                    </Flex>
                    :
                    <></>  
                        } */}
                  </CardBody>
                </Card>
                        </>
                       
                        ))}
                  </SimpleGrid>
                  <Flex justify="center" mt={6}>
                    <Button colorScheme="orange" onClick={handleLoadMore} isLoading={loading} loadingText="Loading...">
                      Load More
                    </Button>
                  </Flex>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      );
    }