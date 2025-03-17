import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Box,Text,Divider } from "@chakra-ui/react";
import Link from "next/link";
import CategoriesCarousel from "@/components/category_page_components/CategoriesCarousel";
const VideoPage = ()=>{
     const router = useRouter();
      const { slug } = router.query; // Get dynamic ID from URL
      const pathSegments = router.asPath.split("?")[0].split("/").filter(Boolean);

// Decode the category name while preserving special characters like '?'
const category = pathSegments.length > 1 ? decodeURIComponent(pathSegments[pathSegments.length - 2]) : null;


      const [loading, setLoading] = useState(true);
      const [video,setVideo]= useState();
      const [desc,setDesc]= useState();
      const [related,setRelated]= useState([]);

      useEffect(() => {
        const fetchPodcasts = async () => {
          try {
            const response = await fetch(`/api/get_post_from_category?category_slug=${category}&post_slug=${slug}`, {
              headers: {
                  "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
                  "Cache-Control": "no-cache, no-store, must-revalidate",
                  Pragma: "no-cache",
                  Expires: "0",
              },
          });
            if (!response.ok) throw new Error("Failed to fetch podcasts");
    
            const data = await response.json();
            
            setVideo(data.link); 
            setDesc(data.desc); 
            setRelated(data.related_posts);

          } catch (error) {
            console.error("Error fetching podcasts:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPodcasts();
      }, [category,slug]);
    

      return (
        <>
        {/* <CategoriesCarousel /> */}
        {video ? 
        <Box
          w="100%" 
          maxW="774px" 
          h="auto" 
          border="1px solid #ccc"
          borderRadius="10px"
          overflow="hidden"
          boxShadow="lg"
          p={2}
          m={'10px auto'}
          bg="white"
        >
          <iframe
            width="100%"
            height="400px"
            src={video.includes("watch?v=") ? video.replace("watch?v=", "embed/") : video}
            title="Updhaan Tapasvi Varghoda @ GSP Bangalore #jainsim #short #shortsvideo"
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Box>
:
<></>
}
        <Box w="100%" 
          maxW="774px"    m={'10px auto'} >
          <Text dangerouslySetInnerHTML={{ __html: desc }} />
        </Box>
            <Box p={'10px'} m={'20px auto'} w={"100%"} maxW="774px" >
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'3xl'} >YOU MAY ALSO LIKE</Text>
                <Divider mt={'5px'} mb={'5px'} />
                {related.map((re,index)=>(
                    <Box key={index} padding={'10px 5px'}>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'md'} color={'gray'} textTransform={'uppercase'} _hover={{color:"orange"}}>
                    <Link href={`/${category}/${re.slug}`}>{re.title}</Link>
                    </Text>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'sm'} color={'gray'} textTransform={'uppercase'}>by <Link href={'#'} fontWeight={'bold'}>Jyot</Link></Text>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'xs'} color={'gray'} textTransform={'uppercase'}>{re.publish_date.substring(0,10)}</Text>
                <Divider mt={'5px'} mb={'5px'} />
                    </Box>      
                ))}
            </Box>
        
        </>
      );
    }

export default VideoPage;