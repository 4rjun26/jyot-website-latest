import React from "react";
import { useRef } from "react";
import { useState,useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Button,Box,Text,SimpleGrid,Flex,Skeleton,Image,Show } from "@chakra-ui/react";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IconButton } from "@chakra-ui/react";
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";

export default function EventsPage(){
  const [tabData, setTabData] = useState(() =>
    [...[
      { label: "Events - 2019", slug: "events-2019", page_no: 1, posts: [] },
      { label: "Events - 2021", slug: "events-2021", page_no: 1, posts: [] },
      { label: "Events - 2022", slug: "events-2022", page_no: 1, posts: [] },
      { label: "Events - 2023", slug: "events-2023", page_no: 1, posts: [] },
      { label: "Events - 2024", slug: "events-2024", page_no: 1, posts: [] },
      { label: "Events - Surat", slug: "events-surat", page_no: 1, posts: [] },
      { label: "Events - Manilaxmi", slug: "events-manilaxmi", page_no: 1, posts: [] },
      { label: "Events - Ahmedabad", slug: "events-ahmedabad", page_no: 1, posts: [] },
      { label: "Vijay Prasthan Utsav - 2020", slug: "vijay-prasthan-utsav-2020", page_no: 1, posts: [] },
      { label: "Vijay Prasthan Utsav - 2018", slug: "vijay-prasthan-utsav-2018", page_no: 1, posts: [] },
      { label: "Vijay Prasthan Utsav - 2022", slug: "vijay-prasthan-utsav-2022", page_no: 1, posts: [] },
      { label: "Vijay Prasthan Utsav - 2023", slug: "vijay-prasthan-utsav-2023", page_no: 1, posts: [] },
      { label: "Vijay Prasthan Utsav - 2024", slug: "vijay-prasthan-utsav-2024", page_no: 1, posts: [] },
      { label: "Vijay Prasthan Utsav - 2025", slug: "vijay-prasthan-utsav-2025", page_no: 1, posts: [] },
    ]].reverse()
  );
    // const [tabData, setTabData] = useState([
    //   { label: "Events - 2019", slug: "events-2019", page_no: 1,posts:[] },
    //   { label: "Events - 2021", slug: "events-2021", page_no: 1,posts:[] },
    //   { label: "Events - 2022", slug: "events-2022", page_no: 1,posts:[] },
    //   { label: "Events - 2023", slug: "events-2023", page_no: 1,posts:[] },
    //   { label: "Events - 2024", slug: "events-2024", page_no: 1,posts:[] },
    //   { label: "Events - Surat", slug: "events-surat", page_no: 1,posts:[] },
    //   { label: "Events - Manilaxmi", slug: "events-manilaxmi", page_no: 1,posts:[] },
    //   { label: "Events - Ahmedabad", slug: "events-ahmedabad", page_no: 1,posts:[] },
    //   { label: "Vijay Prasthan Utsav - 2020", slug: "vijay-prasthan-utsav-2020", page_no: 1,posts:[] },
    //   { label: "Vijay Prasthan Utsav - 2018", slug: "vijay-prasthan-utsav-2018", page_no: 1,posts:[] },
    //   { label: "Vijay Prasthan Utsav - 2022", slug: "vijay-prasthan-utsav-2022", page_no: 1,posts:[] },
    //   { label: "Vijay Prasthan Utsav - 2023", slug: "vijay-prasthan-utsav-2023", page_no: 1,posts:[] },
    //   { label: "Vijay Prasthan Utsav - 2024", slug: "vijay-prasthan-utsav-2024", page_no: 1,posts:[] },
    //   { label: "Vijay Prasthan Utsav - 2025", slug: "vijay-prasthan-utsav-2025", page_no: 1,posts:[] },
    // ]);
    const [activeTab, setActiveTab] = useState(0); 
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const { slug, page_no } = tabData[activeTab];
    
        try {
          const response = await fetch(
            `/api/get_category_based_posts?category_slug=${slug}&page=${page_no}&limit=3`,
            {
              headers: {
                Authorization: `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch data");
    
          const result = await response.json();
    
          // Ensure posts are only updated if new data is available
          if (result.posts && result.posts.length > 0) {
            setTabData((prevTabData) =>
              prevTabData.map((tab, index) =>
                index === activeTab ? { ...tab, posts: result.posts } : tab
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
            `/api/get_category_based_posts?category_slug=${slug}&page=${newPageNo}&limit=3`,
            {
              headers: {
                Authorization: `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch data");
    
          const result = await response.json();
    
          // Append new posts only if they exist
          if (result.posts && result.posts.length > 0) {
            setTabData((prevTabData) =>
              prevTabData.map((tab, index) =>
                index === activeTab
                  ? { ...tab, posts: [...tab.posts, ...result.posts] }
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
          isFitted
          variant="soft-rounded"
          colorScheme="orange"
          w={"full"}
        >
            <Show breakpoint='(min-width: 500px)'>

         <Flex align="center" justify="center" w="95%" m="auto" gap={2}>
  {/* Left Navigation Button */}
  <IconButton
    className="custom-prev"
    icon={<MdChevronLeft />}
    aria-label="Previous"
    colorScheme="orange"
    borderRadius={'full'}
    fontSize={'3xl'}
    variant="solid"
  />

  {/* Swiper Container */}
  <Swiper
    slidesPerView="auto"
    spaceBetween={10}
    navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
    modules={[Navigation]}
    className="tab-swiper"
    style={{ flex: 1 }} // Allow Swiper to take remaining space
  >
    {tabData.map((tab, index) => (
      <SwiperSlide key={index} style={{ width: "auto" }}>
        <Tab>{tab.label}</Tab>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Right Navigation Button */}
  <IconButton
    className="custom-next"
    icon={<MdChevronRight />}
    aria-label="Next"
    colorScheme="orange"
    variant="solid"
    borderRadius={'full'}
    fontSize={'3xl'}
  />
</Flex>

</Show>
<Show breakpoint='(max-width: 480px)'>
          <TabList overflowX="auto" overflowY="hidden" w="90%" m={'auto'} display="flex" gap={1} whiteSpace="nowrap">
            {tabData.map((tab, index) => (
              <Tab key={index} w="fit-content" display="flex" justifyContent="left" fontSize="sm" whiteSpace="nowrap">
                {tab.label}
              </Tab>
            ))}
          </TabList>
          </Show>
    
          <TabPanels>
            {tabData.map((tab, index) => (
              <TabPanel key={index} w={"full"}>
                <Box w={"full"} p={4}>
                  <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
                    {loading
                      ? Array.from({ length: 9 }).map((_, index) => (
                          <Skeleton key={index} w={"full"} h={"450px"} borderRadius={"15px"} />
                        ))
                      : tab.posts.map((post, index) => (
                          <Box key={index} borderRadius={"15px"} m={"auto"} w={"full"} h={"450px"} border={"1px solid gray"}>
                            <Box w={"full"} h={"70%"} bg={"black"} borderRadius={"15px"}>
                              <Link href={`/${tab.slug}/${post.slug}`}>
                                <Image
                                  alt="sample"
                                  borderRadius={"15px 15px 0px 0px"}
                                  src={post.img}
                                  w={"full"}
                                  _hover={{ boxShadow: "dark-lg" }}
                                  h={"full"}
                                  objectFit={"cover"}
                                  transitionDuration={"0.3s"}
                                />
                              </Link>
                            </Box>
                            <Box p={"5px"} w={"full"} h={"30%"}>
                              <Text fontSize={"large"} fontFamily={"Oswald, sans-serif"}>
                                {post.title}
                              </Text>
                              <Text
                                bg={"orange"}
                                w={"fit-content"}
                                p={"3px 10px"}
                                borderRadius={"10px"}
                                display={"flex"}
                                gap={"5px"}
                                alignItems={"center"}
                                mt={"5px"}
                                fontSize={"md"}
                                fontFamily={"Oswald, sans-serif"}
                              >
                                <MdPerson />
                                <Link style={{ color: "black" }} color={"black"} href="#">
                                  Jyot
                                </Link>
                              </Text>
                              <Text
                                border={"2px solid orange"}
                                w={"fit-content"}
                                p={"3px 10px"}
                                borderRadius={"10px"}
                                display={"flex"}
                                gap={"5px"}
                                alignItems={"center"}
                                mt={"5px"}
                                fontSize={"sm"}
                                fontFamily={"Oswald, sans-serif"}
                              >
                                <MdCalendarMonth /> {post.publish_date.substring(0, 10)}
                              </Text>
                            </Box>
                          </Box>
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