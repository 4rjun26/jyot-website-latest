
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
import { Box,Text,Flex } from "@chakra-ui/react";
import { useEffect } from "react";


export default function Home() {
  const pt="Ajitjin Stavan Anandghanji Chovisi";

  // const [podcasts_array,setPodcastAray]= useState([]);
  const [loading, setLoading] = useState(true);
  const [shorts_loading, setShortsLoading] = useState(true);
  const [latest_releases,setLatestReleaseArray]= useState([]);
  const [shorts,setShorts]= useState([]);
  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get_latest_events", {
        headers: {
            "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
    }); // ✅ Adjust the API route if needed
      if (!response.ok) throw new Error("Failed to fetch podcasts");

      const data = await response.json();
      
      setLatestReleaseArray(data); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchShorts = async () => {
    try {
      setShortsLoading(true);
      const response = await fetch("/api/get_index_shorts", {
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
  
  useEffect(() => {
    fetchPodcasts();
    fetchShorts();
  }, []);

  const podcasts_array=[
    {
      "_id": "672df8bab6f33f7cbc69a5ab",
      "identifier": "SMNFCV",
      "title": "To chokkas ame marg pamishu",
      "ep": "8",
      "title_format": "null",
      "search_title": "તો ચોક્કસ અમે માર્ગ પામીશું",
      "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/8.mp3",
      // "link":"sample_sound_1.mp3",
      "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/8-to-chokkas-ame-marg-pamishu.jpg",
      "publish_date": "2024-05-29T00:00:00.000Z",
      "content_type": "audio",
      "visibility": true,
      "category_id": [
        "672def711f63a0c51a915381"
      ],
      "category_name": [
        "Ajitjin Stavan Anandghanji Chovisi"
      ],
      "topic_name": [
        "Tirthankar"
      ],
      "topic_id": [
        "672df1c1b6f33f7cbc69a2be"
      ],
      "slug": "to-chokkas-ame-marg-pamishu",
      "like_count": 0,
      "interest": [
        "Spiritual"
      ],
      "createdAt": "2024-11-08T11:40:42.313Z",
      "updatedAt": "2024-11-14T13:19:32.217Z",
      "__v": 0
    },
    {
      "_id": "672df8bbb6f33f7cbc69a5b9",
      "identifier": "SMNFID",
      "title": "Tuj marg no bhomiyo kon ?",
      "ep": "7",
      "title_format": "null",
      "search_title": "તુજ માર્ગનો ભોમિયો કોણ?",
      "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/7.mp3",
      // "link":"sample_sound_2.mp3",
      "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/7-tuj-marg-no-bhomiyo-kon.jpg",
      "publish_date": "2024-05-24T00:00:00.000Z",
      "content_type": "audio",
      "visibility": true,
      "category_id": [
        "672def711f63a0c51a915381"
      ],
      "category_name": [
        "Ajitjin Stavan Anandghanji Chovisi"
      ],
      "topic_name": [
        "Tirthankar"
      ],
      "topic_id": [
        "672df1c1b6f33f7cbc69a2be"
      ],
      "slug": "tuj-marg-no-bhomiyo-kon-",
      "like_count": 0,
      "interest": [
        "Spiritual"
      ],
      "createdAt": "2024-11-08T11:40:43.306Z",
      "updatedAt": "2024-11-14T13:19:32.849Z",
      "__v": 0
    },
    {
      "_id": "672df8bcb6f33f7cbc69a5cc",
      "identifier": "SMNFTI",
      "title": "Marg che ajanyo",
      "ep": "6",
      "title_format": "null",
      "search_title": "માર્ગ છે અજાણ્યો",
      "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/6.mp3",
      // "link":"sample_sound_3.mp3",
      "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/6-marg-che-ajanyo.jpg",
      "publish_date": "2024-05-15T00:00:00.000Z",
      "content_type": "audio",
      "visibility": true,
      "category_id": [
        "672def711f63a0c51a915381"
      ],
      "category_name": [
        "Ajitjin Stavan Anandghanji Chovisi"
      ],
      "topic_name": [
        "Tirthankar"
      ],
      "topic_id": [
        "672df1c1b6f33f7cbc69a2be"
      ],
      "slug": "marg-che-ajanyo",
      "like_count": 0,
      "interest": [
        "Spiritual"
      ],
      "createdAt": "2024-11-08T11:40:44.677Z",
      "updatedAt": "2024-11-14T13:19:33.809Z",
      "__v": 0
    },
    {
      "_id": "672df8bdb6f33f7cbc69a5dc",
      "identifier": "SMNG4R",
      "title": "Prabhu ne pamvano marg shu ?",
      "ep": "5",
      "title_format": "null",
      "search_title": "પ્રભુને પામવાનો માર્ગ શું?",
      "link": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/5.mp3",
      // "link":"sample_sound_4.mp3",
      "img": "https://jyotapp.in/podcast/ajitjin-stavan-anandghanji-chovisi/5-prabhu-ne-pamvano-marg-shu.jpg",
      "publish_date": "2024-05-08T00:00:00.000Z",
      "content_type": "audio",
      "visibility": true,
      "category_id": [
        "672def711f63a0c51a915381"
      ],
      "category_name": [
        "Ajitjin Stavan Anandghanji Chovisi"
      ],
      "topic_name": [
        "Tirthankar"
      ],
      "topic_id": [
        "672df1c1b6f33f7cbc69a2be"
      ],
      "slug": "prabhu-ne-pamvano-marg-shu-",
      "like_count": 0,
      "interest": [
        "Spiritual"
      ],
      "createdAt": "2024-11-08T11:40:45.999Z",
      "updatedAt": "2024-11-14T13:19:34.615Z",
      "__v": 0
    },
  ]
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

  return (
    <>
      <div style={{ overflow: "hidden", paddingBottom: "10px" }}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Carousel />
        
        {/* <MotionBox> */}
          <SectionTitle text={"Latest Releases"} />
          <LatestReleasesCards releases={latest_releases} loading={loading} />
        {/* </MotionBox> */}

        <MotionBox>
          <SectionTitle text={"Jyot Podcast"} />
          <PodcastCards podcasts_array={podcasts_array} pt={pt} />
        </MotionBox>

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
          <SectionTitle text={"Jo Tare Wo Tirth"} />
          <JTWTCards />
        </MotionBox>

        <MotionBox>
          <SectionTitle text={"Vision of Dharmacharya"} />
          <VoDCards />
        </MotionBox>

        <br />
        <br />
        <br />

        <MotionBox>
          <Banner />
        </MotionBox>

        <MotionBox>
          <SectionTitle text={"Mahasattvashali"} />
          <YTCards shorts_loading={shorts_loading} shorts={shorts} />
        </MotionBox>
      </div>
    </>
  );
}
