import React from "react";
import { Flex,Text,Card,CardBody,IconButton,Show,Image,Box,Avatar,Button,Skeleton,Tag } from "@chakra-ui/react";
import Link from "next/link";
import parse from "html-react-parser";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";

export default function TweetsPage(){
      const [tweets, setTweets] = useState([]);
          const ar=[1,2,3,4,5,6,7,8,9];
          const [loading, setisLoading] = useState(true);
          const [page, setPage] = useState(1); // ✅ Track the current page
          const [hasMore, setHasMore] = useState(true);
          const [tweettags, setTweetTags] = useState([]);
          const [hitBottom, sethitBottom] = useState(false);
          const [selectedTags, setSelectedTags] = useState([]);
          const router = useRouter();
    
          const toggleTag = (tag) => {
            setSelectedTags((prev) =>
              prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
            );
            setPage(1);
          };
          const fetchTags = async (pageNum) => {
            try {
              setisLoading(true);
              const response = await fetch(`/api/get_tweet_tags`, {
                headers: {
                    "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
                },
            }); // ✅ Fetch paginated data
              if (!response.ok) throw new Error("Failed to fetch podcasts");
        
              const data = await response.json();
              if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data

        
              setTweetTags(data); // ✅ Append new data
            } catch (error) {
              console.error("Error fetching podcasts:", error);
            } finally {
              setisLoading(false);
            }
          };
          const fetchPodcasts = async (pageNum) => {
            try {
              setisLoading(true);
              const response = await fetch(`/api/get_all_tweets?page=${pageNum}&limit=9&limit=9&tags=${selectedTags.join(",")}`, {
                headers: {
                    "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
                },
            }); // ✅ Fetch paginated data
              if (!response.ok) throw new Error("Failed to fetch podcasts");
        
              const data = await response.json();
              if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data

              setTweets(data); // ✅ Append new data
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
                const response = await fetch(`/api/get_all_tweets?page=${pageNum}&limit=9`, {
                  headers: {
                      "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
                  },
              }); // ✅ Fetch paginated data
                if (!response.ok) throw new Error("Failed to fetch podcasts");
          
                const data = await response.json();
                if (data.length === 0) setHasMore(false); // ✅ Stop loading if no more data
          
                setTweets((prev) => [...prev, ...data]); // ✅ Append new data
              } catch (error) {
                console.error("Error fetching podcasts:", error);
              } finally {
                setisLoading(false);
                sethitBottom(false);
              }
            }
          };
        
        
          useEffect(() => {
            fetchPodcasts(1); 
          }, [selectedTags]);
          useEffect(() => {
            fetchTags();
          }, []); 
          const renderTextWithLinks = (text) => {
            return parse(text, {
              replace: (domNode) => {
                if (domNode.name === "a" && domNode.attribs?.href) {
                  return (
                    <Link
                      key={domNode.attribs.href}
                      href={domNode.attribs.href}
                      isExternal
                     
                    >
                        <Text  color="blue.500"
                      _hover={{ textDecoration: "underline" }}>
                      {domNode.children[0]?.data}
                      </Text>
                    </Link>
                  );
                }
                if (domNode.type === "text") {
                  const words = domNode.data.split(" ").map((word, index) => {
                    if (word.startsWith("http")) {
                      return (
                        <Link
                          key={index}
                          href={word}
                          isExternal
                        >
                             <Text  color="blue.500"
                      _hover={{ textDecoration: "underline" }}>
                          {word}{" "}
                          </Text>
                        </Link>
                      );
                    } else if (word.startsWith("#") || word.startsWith("@")) {
                      return (
                        <Text key={index} as="span" color="blue.500">
                          {word}{" "}
                        </Text>
                      );
                    }
                    return word + " ";
                  });
          
                  return <>{words}</>;
                }
              },
            });
          };

        //   useEffect(() => {
        //     const handleScroll = () => {
        //       if (
        //         window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
        //         !loading && !hitBottom
        //       ) {
        //         setisLoading(true);
        //         sethitBottom(true);
        //         loadMore(page);
        //         setTimeout(() => setisLoading(false), 1000); // Prevents multiple calls
        //       }
        //     };
        
        //     window.addEventListener("scroll", handleScroll);
        //     return () => window.removeEventListener("scroll", handleScroll);
        //   }, [page, loading]);
      
    return(
        <>
        <Flex justifyContent={'center'} alignItems={'center'} w={'100vw'} h={'100px'} bg={'#de2225'}>
                        <Text fontSize={"30px"} color={'white'} fontFamily={'Oswald, sans-serif'}>
                        Enrich your soul by contributing towards Prabhavana of Jinvachan.
                        </Text>
                      </Flex>
                      <Flex justifyContent={'center'} mt={'10px'} mb={'10px'}>
                      <Text fontSize={'30px'} fontWeight={'bold'} textTransform={'uppercase'} fontFamily={'Oswald, sans-serif'}>Jyot Tweets</Text>
                      </Flex>
                      <Show breakpoint='(min-width: 500px)'>
                      <Flex w={'full'} flexWrap={'wrap'} gap={'10px'} maxW={'700px'} h={'auto'} m={'auto'}>
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
{Array.isArray(tweettags) &&
  tweettags.map((tt, index) => {
    const formattedTag = tt.replace(/-/g, " ");
    const isSelected = selectedTags.includes(tt);

    return (
      <SwiperSlide key={index} style={{ width: "auto" }}>
        <Tag
          cursor={'pointer'}
          textTransform={'capitalize'}
          colorScheme={isSelected ? 'orange' : 'gray'}
          onClick={() => toggleTag(tt)}
          p={3} // Adjust padding for better clickability
        >
          {formattedTag}
        </Tag>
      </SwiperSlide>
    );
  })}

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
<Show breakpoint="(max-width: 480px)">
  <Flex
    overflowX="auto"
    overflowY="hidden"
    w="full"
    maxW="700px"
    h="auto"
    m="auto"
    gap={2}
    p={2}
    flexWrap="nowrap"
    alignItems="center"
    display="flex"
  >
    {tweettags.map((tt, index) => {
      const formattedTag = tt.replace(/-/g, " ");
      const isSelected = selectedTags.includes(tt);

      return (
        <Tag
          key={index}
          cursor="pointer"
          textTransform="capitalize"
          colorScheme={isSelected ? "orange" : "gray"}
          onClick={() => toggleTag(tt)}
          whiteSpace="nowrap"
          minWidth="max-content" // Ensures tag fits its text
          flexShrink={0} // Prevents shrinking
        >
          {formattedTag}
        </Tag>
      );
    })}
  </Flex>
</Show>



<Box p={'2px'}>
                    {loading ? 
                      ar.map((a, index) => (
                        <Skeleton m={'20px auto'} w={'full'} maxW={'700px'}  key={index} h="200px" boxShadow="md" borderRadius="md" />
                      ))
                      :
                tweets.map((tweet, index) => (
                     
                     <Card  p={'0px'}  border={'1px solid lightgray'} w={'full'} maxW={'700px'} m={'20px auto'} boxShadow="none" borderRadius={tweet.reply_to!=null ? "lg" : "md"}>
                  <CardBody h={'full'}>
                    {tweet.reply_to!=null ? 
                  <Box  borderRadius={'lg'} p={'20px'} pb={'30px'} bg={'rgba(249, 133, 0, 0.13)'} w={'full'}>
                    <Flex w={'full'} >
                    <Box p={'5px'} textAlign={'center'} w={'70px'} h={'full'}>
                    <Avatar m={'auto'} name={tweet.reply_post.name} src={tweet.reply_post.logo} />
                    </Box>
                    <Box pt={'5px'} pl={'5px'} w={'full'} h={'full'}>
                        <Text fontWeight={'bold'} fontSize={'lg'} w={'full'}>{tweet.reply_post.name}</Text>
                        <Text w={'full'} fontSize={'sm'}>{tweet.reply_post.handle}</Text>
                    </Box>
                    </Flex>
                    {/* Image Box */}
                    <Box w="100%" overflow={"hidden"}>
                       <Text lineHeight={'20px'} fontSize={'sm'}>
                       {renderTextWithLinks(tweet.reply_post.desc)}
                       </Text>
                    </Box>
                    <Box pt={'10px'}>
                    <Text color={'rgb(100,100,100)'} whiteSpace={'pre-wrap'} fontSize={'sm'}>
                    {tweet.reply_post.publish_date.substring(0,10)}
                       </Text>
                    </Box>
                    </Box>
                    :
                    <></>
                    }

                <Box border={tweet.reply_to!=null ? '1px solid lightgray' : 'none'} mt={tweet.reply_to!=null ? '-20px' : '0px'} ml={tweet.reply_to!=null ? '10px' : '0px'} bg={'white'}borderRadius={tweet.reply_to!=null ? "30px" : "md"} p={tweet.reply_to!=null ? '20px' : '5px'} w={'full'}>
                    <Flex position={'relative'} w={'full'} >
                        {tweet.reply_to!=null ?
                    <Flex w={'full'} top={'-50px'} position={'absolute'} justifyContent={'right'} h={'30px'}>
                    <Box
    w="0"
    h="0"
    mt={'-3px'}
    borderLeft="35px solid transparent"
    borderRight="35px solid transparent"
    borderBottom="35px solid white" // Adjust color as needed
      />
  </Flex>
  :
  <></>
 }
                    <Box p={'5px'} textAlign={'center'} w={'70px'} h={'full'}>
                    <Avatar m={'auto'} name={tweet.name} src={tweet.logo} />
                    </Box>
                    <Box pt={'5px'} pl={'5px'} w={'full'} h={'full'}>
                        <Text fontWeight={'bold'} fontSize={'lg'} w={'full'}>{tweet.name}</Text>
                        <Text w={'full'} fontSize={'sm'}>{tweet.handle}</Text>
                    </Box>
                    </Flex>
                    {/* Image Box */}
                    <Box w="100%" overflow={"hidden"}>
                       <Text lineHeight={'20px'} fontSize={'sm'}>
                       {renderTextWithLinks(tweet.desc)}
                       </Text>
                    </Box>
                    <Box pt={'10px'}>
                    <Text color={'rgb(100,100,100)'} whiteSpace={'pre-wrap'} fontSize={'sm'}>
                    {tweet.publish_date.substring(0,10)}
                       </Text>
                    </Box>
                    </Box>
                    
                  </CardBody>
                </Card>
        ))}

            <Box w={'full'} textAlign={'center'}>
                <Button size={'sm'} onClick={()=>{loadMore(page)}} colorScheme="orange">
                    Load more
                </Button>
            </Box>
                </Box>
        </>
    );
}