
import Head from "next/head";
import { useRef, useState } from "react";
import Carousel from "@/components/index_page_components/Carousel";
import SectionTitle from "@/components/index_page_components/SectionTitle";
import LatestReleasesCards from "@/components/index_page_components/LatestReleasesCards";
import PodcastCards from "@/components/index_page_components/PodcastCards";
import JTWTCards from "@/components/index_page_components/JTWTCards";
import VoDCards from "@/components/index_page_components/VoDCards";
import Banner from "@/components/index_page_components/Banner";
import YTCards from "@/components/index_page_components/YTCards";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Box,Text,Flex,SimpleGrid,Skeleton,Card,CardBody,Tag,Image,Button,Avatar } from "@chakra-ui/react";
import { useEffect } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { BiSolidChevronRight } from "react-icons/bi";

export default function Home() {

  const [podcasts_array,setPodcastAray]= useState([]);
  const [podcasts_loading, setPodcastsLoading] = useState(true);

  const [songs_array,setSongsArray]= useState([]);
  const [songs_loading, setSongLoading] = useState(true);

  const [shorts_loading, setShortsLoading] = useState(true);
  const [shorts,setShorts]= useState([]);

  const [vids_loading, setVidsLoading] = useState(true);
  const [vids,setVids]= useState([]);

  const [articles_loading, setArticlesLoading] = useState(true);
  const [articles,setArticles]= useState([]);

  const [tweets_loading, setTweetsLoading] = useState(true);
  const [tweets,setTweets]= useState([]);

  const fetchPodcasts = async () => {
    try {
      setPodcastsLoading(true);
      const response = await fetch(`/api/get_latest_podcasts`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Adjust the API route if needed
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      
      setPodcastAray(data); 
      setPodcastsLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setPodcastsLoading(false);
    } finally {
      setPodcastsLoading(false);
    }
  };

  const fetchSongs = async () => {
    try {
      setSongLoading(true);
      const response = await fetch(`/api/get_latest_songs`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Adjust the API route if needed
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      
      setSongsArray(data); 
      setSongLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setSongLoading(false);
    } finally {
      setSongLoading(false);
    }
  };

  const fetchShorts = async () => {
    try {
      setShortsLoading(true);
      const response = await fetch("/api/get_latest_shorts", {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Adjust the API route if needed
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      
      setShorts(data); 
      setShortsLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setShortsLoading(false);
    } finally {
      setShortsLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      setVidsLoading(true);
      const response = await fetch("/api/get_latest_videos", {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Adjust the API route if needed
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      
      setVids(data); 
      setVidsLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setVidsLoading(false);
    } finally {
      setVidsLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      setArticlesLoading(true);
      const response = await fetch(`/api/get_all_articles?page=1&limit=3`, {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Fetch paginated data
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      if (data.length === 0); // ✅ Stop loading if no more data

      setArticles(data.posts); // ✅ Append new data

    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setArticlesLoading(false);
    }
  };

  const fetchTweets = async () => {
    try {
      setTweetsLoading(true);
      const response = await fetch("/api/get_latest_tweets", {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Adjust the API route if needed
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      
      setTweets(data); 
      setTweetsLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setTweetsLoading(false);
    } finally {
      setTweetsLoading(false);
    }
  };

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


  useEffect(() => {
    fetchPodcasts();
    fetchSongs();
    fetchShorts();
    fetchVideos();
    fetchArticles();
    fetchTweets();
  }, []);

  // const podcasts_array=[
  //   {
  //     "_id": "672df8bab6f33f7cbc69a5ab",
  //     "identifier": "SMNFCV",
  //     "title": "To chokkas ame marg pamishu",
  //     "ep": "8",
  //     "title_format": "null",
  //     "search_title": "તો ચોક્કસ અમે માર્ગ પામીશું",
  //     "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/8.mp3",
  //     // "link":"sample_sound_1.mp3",
  //     "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/8-to-chokkas-ame-marg-pamishu.jpg",
  //     "publish_date": "2024-05-29T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def711f63a0c51a915381"
  //     ],
  //     "category_name": [
  //       "Ajitjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "to-chokkas-ame-marg-pamishu",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:42.313Z",
  //     "updatedAt": "2024-11-14T13:19:32.217Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "672df8bbb6f33f7cbc69a5b9",
  //     "identifier": "SMNFID",
  //     "title": "Tuj marg no bhomiyo kon ?",
  //     "ep": "7",
  //     "title_format": "null",
  //     "search_title": "તુજ માર્ગનો ભોમિયો કોણ?",
  //     "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/7.mp3",
  //     // "link":"sample_sound_2.mp3",
  //     "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/7-tuj-marg-no-bhomiyo-kon.jpg",
  //     "publish_date": "2024-05-24T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def711f63a0c51a915381"
  //     ],
  //     "category_name": [
  //       "Ajitjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "tuj-marg-no-bhomiyo-kon-",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:43.306Z",
  //     "updatedAt": "2024-11-14T13:19:32.849Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "672df8bcb6f33f7cbc69a5cc",
  //     "identifier": "SMNFTI",
  //     "title": "Marg che ajanyo",
  //     "ep": "6",
  //     "title_format": "null",
  //     "search_title": "માર્ગ છે અજાણ્યો",
  //     "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/6.mp3",
  //     // "link":"sample_sound_3.mp3",
  //     "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/6-marg-che-ajanyo.jpg",
  //     "publish_date": "2024-05-15T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def711f63a0c51a915381"
  //     ],
  //     "category_name": [
  //       "Ajitjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "marg-che-ajanyo",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:44.677Z",
  //     "updatedAt": "2024-11-14T13:19:33.809Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "672df8bdb6f33f7cbc69a5dc",
  //     "identifier": "SMNG4R",
  //     "title": "Prabhu ne pamvano marg shu ?",
  //     "ep": "5",
  //     "title_format": "null",
  //     "search_title": "પ્રભુને પામવાનો માર્ગ શું?",
  //     "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/5.mp3",
  //     // "link":"sample_sound_4.mp3",
  //     "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/5-prabhu-ne-pamvano-marg-shu.jpg",
  //     "publish_date": "2024-05-08T00:00:00.000Z",
  //     "content_type": "audio",
  //     "visibility": true,
  //     "category_id": [
  //       "672def711f63a0c51a915381"
  //     ],
  //     "category_name": [
  //       "Ajitjin Stavan Anandghanji Chovisi"
  //     ],
  //     "topic_name": [
  //       "Tirthankar"
  //     ],
  //     "topic_id": [
  //       "672df1c1b6f33f7cbc69a2be"
  //     ],
  //     "slug": "prabhu-ne-pamvano-marg-shu-",
  //     "like_count": 0,
  //     "interest": [
  //       "Spiritual"
  //     ],
  //     "createdAt": "2024-11-08T11:40:45.999Z",
  //     "updatedAt": "2024-11-14T13:19:34.615Z",
  //     "__v": 0
  //   },
  // ]
  const MotionBox = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };
  const MotionIcon = motion(BiSolidChevronRight);
  return (
    <>
      <div style={{ overflow: "hidden", paddingBottom: "10px" }}>
        <Head>
          <title>Home</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Carousel />
        
        <MotionBox>
          <SectionTitle text={"Jyot Podcast"} />
          <PodcastCards podcasts_array={podcasts_array.slice(0,4)} metadataSlug={"ajitjin-stavan-anandghanji-chovisi"} />
          <Box textAlign={'center'}>
          <Link href={'/podcast'}>
            <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
          </Link>
        </Box>
        </MotionBox>
      
        <MotionBox>
          <SectionTitle text={"Jyot Music"} />
          <PodcastCards podcasts_array={songs_array.slice(0,4)} metadataSlug={"ajitjin-stavan-anandghanji-chovisi"} />
          <Box textAlign={'center'}>
          <Link href={'/song'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
        </MotionBox>

        <br /><br />
        <MotionBox>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100vw"}
            h={"100px"}
            bg={"#de2225"}
          >
            <Text fontSize={"30px"} color={"white"} fontFamily={"Oswald, sans-serif"}>
              Enrich your soul by contributing towards Prabhavana of Jinvachan.
            </Text>
          </Flex>

        </MotionBox>

        <MotionBox>
          <SectionTitle text={"Jyot Shorts"} />
          <YTCards shorts_loading={shorts_loading} shorts={shorts} />
          <Box textAlign={'center'}>
          <Link href={'/shorts'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
        </MotionBox>

        <MotionBox>
          <SectionTitle text={"Jyot Videos"} />
          <YTCards shorts_loading={vids_loading} shorts={vids} />
          <Box textAlign={'center'}>
          <Link href={'/videos'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
        </MotionBox>

       <MotionBox>
       <SectionTitle text={"Jyot Articles"} />
        <Box p={4}>
              <SimpleGrid columns={{ base: 1, sm: 2, lg:3 }} spacing={4}>
                {articles_loading ? 
                  [1,2,3].map((a, index) => (
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
           </Box>
           <Box textAlign={'center'}>
          <Link href={'/article'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
           </MotionBox>


           <br /><br />
           <MotionBox>
           <SectionTitle text={"Jyot Tweets"} />
<Box p={'2px'}>
  <SimpleGrid columns={{ base: 1, sm: 1, lg:3 }} m={'auto'} spacing={4}>
                    {tweets_loading ? 
                      [1,2].map((a, index) => (
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
                    {tweet.reply_post.publish_date != null
            ? new Date(tweet.reply_post.publish_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}
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
                    {tweet.publish_date != null
            ? new Date(tweet.publish_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}
                       </Text>
                    </Box>
                    </Box>
                    
                  </CardBody>
                </Card>
        ))}
            </SimpleGrid>
                </Box>
                <Box textAlign={'center'}>
          <Link href={'/tweet'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
                </MotionBox>

        {/* <MotionBox>
          <Banner />
        </MotionBox> */}

      
      </div>
    </>
  );
}
