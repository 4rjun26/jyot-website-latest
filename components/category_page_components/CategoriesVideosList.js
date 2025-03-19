import React from "react";
import { Box,SimpleGrid,Flex,Image,Text,IconButton,Button,Skeleton,Tag,Divider } from "@chakra-ui/react";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { useState,useEffect } from "react";
import { PiShareFatBold } from "react-icons/pi";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import PodcastCards from "../index_page_components/PodcastCards";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const CategoriesVideosList = ({category,contentTypes})=>{
    const toast = useToast();
  
  // const router = useRouter();
  // const { category } = router.query;
      const [posts, setPosts] = useState([]); // Stores posts fetched from API
      const [postMetadata, setPostMetaData] = useState([]); // Stores posts fetched from API
      const [category_title,setCategoryTitle]=useState("");
      const [page, setPage] = useState(1); // Track number of "Load More" clicks
      const [loading, setLoading] = useState(true); // Loading state
      const limit = 9; // Number of posts per request
      const [activeIndex, setActiveIndex] = useState(0);
      const [tabData, setTabData] = useState([]);
      useEffect(() => {
        if (contentTypes.length > 0) {
          setTabData(contentTypes.map(() => ({ posts: [], page_no: 1 })));
        }
      }, [contentTypes]);
      
    
      // Fetch posts from API
      const fetchPosts = async (currentPage, currentCategory) => {
        const { page_no } = tabData[activeIndex];
        setLoading(true);
        try {
          const res = await fetch(`/api/get_category_based_posts?category_slug=${category}&page=${page_no}&limit=${limit}&current_content_type=${contentTypes[activeIndex]}`, {
            headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            },
          });
      
          const data = await res.json();
      
          // Ensure posts is always an array
          const newPosts = Array.isArray(data.podcasts_array) ? data.podcasts_array : [];
          
          setTabData(prevTabData => 
            prevTabData.map((tab, index) => 
              index === activeIndex ? { ...tab, posts: newPosts } : tab
            )
          );
          
          setCategoryTitle(data.category_title || ""); // Ensure title is always a string
      
          setPostMetaData({
            title: data.title || "",
            desc: data.desc || "",
            img: data.img || "",
            publish_date: data.publish_date || null,
          });
          console.log(newPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setPosts([]); // Set posts to an empty array in case of error
        }
        setLoading(false);
      };

      const addPosts = async (newPageNo) => {
        setLoading(true);
        try {
          const res = await fetch(`/api/get_category_based_posts?category_slug=${category}&page=${newPageNo}&limit=${limit}&current_content_type=${contentTypes[activeIndex]}`, {
            headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            },
          });
      
          const data = await res.json();
      
          // Ensure posts is always an array
          const newPosts = Array.isArray(data.podcasts_array) ? data.podcasts_array : [];
          
          setTabData(prevTabData => 
            prevTabData.map((tab, index) => 
              index === activeIndex 
                ? { ...tab, posts: [...tab.posts, ...newPosts] } // ✅ Append new posts
                : tab
            )
          );
          
        
          
        } catch (error) {
          console.error("Error fetching posts:", error);
          setPosts([]); // Set posts to an empty array in case of error
        }
        setLoading(false);
      };
      
      
    
      // Initial fetch when component mounts

      useEffect(() => {
        if(tabData.length>0){
        if(tabData[activeIndex].posts.length<1){
        fetchPosts(tabData[activeIndex].page_no, category);
        }
      }
      }, [activeIndex, category,tabData]);

      
      const handleLoadMore = () => {
        setTabData(prevTabData => 
          prevTabData.map((tab, index) => 
            index === activeIndex ? { ...tab, page_no: tab.page_no + 1 } : tab
          )
        );
        const newPageNo = tabData[activeIndex].page_no + 1;
        addPosts(newPageNo);
      }

      
      const copyToClipboard = (album_name, ep) => {
        const rootDomain = `${window.location.protocol}//${window.location.host}`;
        let slug1 = album_name.toLowerCase();  // Convert to lowercase
        slug1 = slug1.replace(/\s+/g, "-");     // Replace spaces with '-'
        slug1 = slug1.replace(/[^a-z0-9-]/g, ""); // Remove special characters except '-'
        slug1 = slug1.replace(/-+/g, "-");      // Remove multiple consecutive '-'
      
        let slug2 = ep.toLowerCase();  // Convert to lowercase
        slug2 = slug2.replace(/\s+/g, "-");     // Replace spaces with '-'
        slug2 = slug2.replace(/[^a-z0-9-]/g, ""); // Remove special characters except '-'
        slug2 = slug2.replace(/-+/g, "-");      // Remove multiple consecutive '-'
        
        const textToCopy = `${rootDomain}/${slug1}/${slug2}`;
      
        // ✅ Check if `navigator.clipboard` is available
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast("Copied!", "Text copied to clipboard.");
          }).catch(err => {
            console.error("Clipboard API failed:", err);
            fallbackCopyText(textToCopy); // Fallback if `navigator.clipboard` fails
          });
        } else {
          fallbackCopyText(textToCopy); // Fallback for older browsers
        }
      };
      
      // ✅ Fallback function for unsupported browsers
      const fallbackCopyText = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
          document.execCommand("copy");
          showToast("Copied!", "Text copied to clipboard.");
        } catch (err) {
          console.error("Fallback copy failed:", err);
        }
      
        document.body.removeChild(textArea);
      };

      const showToast = (title, description) => {
        toast({
          title,
          description,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      };

    return(
        <>
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
           
        <Tabs isFitted variant='solid-rounded' colorScheme="orange" index={activeIndex} onChange={(index) => setActiveIndex(index)}>
     {contentTypes.length>1 ?
      <TabList>
        {contentTypes.map((item, index) => (
          <Tab key={index}>{item}</Tab>
        ))}
      </TabList>
    :
    <></>
  }
  <Divider border={"1px solid gray"} mt={'5px'} />
      <TabPanels>
        {contentTypes.map((item, index) => (
          <TabPanel key={index}>
        <Box w={'full'} p={4}>
              {( tabData[activeIndex].posts.length > 0) && (contentTypes[activeIndex] === "audio" || contentTypes[activeIndex]  === "music") ?
                 <PodcastCards podcasts_array={tabData[activeIndex].posts} autoplay={false} metadataSlug={category}/>
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
               tabData[activeIndex].posts.map((post,index)=>(
                    <Box key={index} borderRadius={'15px'} m={'auto'} w={'full'} pb={'0px'} h={{md:"450px"}} minH={{ md: "450px" }}  border={'1px solid gray'}>
                        <Box w={'full'} h={'300px'} bg={'black'} borderRadius={'15px 15px 0px 0px'}>
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
                            <Box textAlign={'right'}>
                                        <IconButton
                                        fontSize={'2xl'}
                                        variant={'ghost'}
                                        borderRadius={'full'}
                                          icon={<PiShareFatBold />}
                                          colorScheme="orange"
                                          onClick={()=>{copyToClipboard(post.category_name[0],post.title)}}
                                        />
                                      </Box>
                        </Box>
                       
                    </Box>
                ))}
                </SimpleGrid>
                 </>
              } 
              </Box>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
      
                
                <Flex justify="center" mt={6}>
          <Button
            colorScheme="orange"
            onClick={handleLoadMore}
            isLoading={loading}
            loadingText="Loading..."
          >
            Load More
          </Button>
        </Flex>
        </>
          }
         </>
    );
}

export default CategoriesVideosList;



  {/* <Box w={"90%"} position="relative" overflow="hidden" margin={'auto'}>
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
                 <PodcastCards podcasts_array={posts} autoplay={false} metadataSlug={category}/>
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
                    <Box key={index} borderRadius={'15px'} m={'auto'} w={'full'} pb={'0px'} h={{md:"450px"}} minH={{ md: "450px" }}  border={'1px solid gray'}>
                        <Box w={'full'} h={'300px'} bg={'black'} borderRadius={'15px 15px 0px 0px'}>
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
                            <Box textAlign={'right'}>
                                        <IconButton
                                        fontSize={'2xl'}
                                        variant={'ghost'}
                                        borderRadius={'full'}
                                          icon={<PiShareFatBold />}
                                          colorScheme="orange"
                                          onClick={()=>{copyToClipboard(post.category_name[0],post.title)}}
                                        />
                                      </Box>
                        </Box>
                       
                    </Box>
                ))}
                </SimpleGrid>
                 </>
              } */}