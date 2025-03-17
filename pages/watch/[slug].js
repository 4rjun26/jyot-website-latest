import React from "react";
import { useRouter } from "next/router";
import { Box,Flex,Text,Skeleton,Tag } from "@chakra-ui/react";
import { useState,useEffect } from "react";

export default function WatchVids(){
    const router = useRouter();
      const { slug } = router.query;
      const [value,setValue]=useState();
      const [loading,setLoading]=useState(true);
       


const fetchVid = async (slug) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/get_yt_vid?category_slug=${slug}`, {
             cache: "no-store", 
          headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
          },
      }); // ✅ Fetch paginated data
        if (!response.ok) throw new Error("Failed to fetch podcasts");
  
        const data = await response.json();
        if ( data.length === 0) {
        //   setHasMore(false); // ✅ Stop fetching if no more data
          return;
        } // ✅ Stop loading if no more data
        // setPodcastMetadata({
        //   title: data.title,
        //   desc:data.desc,
        //   img: data.img,
        //   publish_date: data.publish_date,
        // });
        setValue(data[0]); 
        // setRelated(data.related); 
        
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };
  
  
    useEffect(() => {
      fetchVid(slug); 
    }, []); 

    return(
        <>
        {loading ? <Skeleton w={'full'} maxW={'900px'} h={'400px'} m={'20px auto'} /> :
            <Box p={3} w={'full'} maxW={'900px'} m={'auto'}>
            <iframe
                        style={{ width: "100%", height: "380px" }}
                        src={value.link.includes("watch?v=") ? value.link.replace("watch?v=", "embed/") : value.link}
                        title="Kya Aap Shasan Rasik Hain ? | #Mahasattvashali - 246"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                      <Box mt={'20px'}>
                         {value.category_name?.map((category, index) => (
  <Tag 
    key={index} 
    bg="orange" 
    fontFamily="Oswald, sans-serif" 
    color="white" 
    mr={2} // Adds spacing between tags
  >
    {category}
  </Tag>
))}
</Box>
                             <Text fontSize="40px" fontFamily={'Oswald, sans-serif'} textTransform={'uppercase'}>
                             {value.title}
                             </Text>
                             <Text>
                             {value.publish_date != null
  ? new Date(value.publish_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  : ""}
                             </Text>
                            <Text mt={'20px'} dangerouslySetInnerHTML={{ __html: value.desc }} />
                          
            </Box>
}
        </>
    );
}