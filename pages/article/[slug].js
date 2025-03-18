import React from "react";
import { useEffect,useState } from "react";
import { Text,Box, Flex,Image,Divider,Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ArticlePage(){
const router = useRouter();
  const { slug } = router.query;
  const [value,setValue] = useState([]);
  const [related,setRelated] = useState([]);
  const [loading,setisLoading] = useState(true);

const fetchPodcasts = async (slug) => {
      try {
        setisLoading(true);
        const response = await fetch(`/api/get_article?slug=${slug}`, {
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
        setValue(data.post[0]); 
        setRelated(data.related); 
        
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setisLoading(false);
      }
    };
  
  
    useEffect(() => {
      fetchPodcasts(slug); 
    }, [slug]); 

    return(
        <>
        {!loading ?
        <>
        <Box p={'0px 10px'}  w={'full'} maxW={'700px'} m={'auto'} textAlign={'center'} >
        <Image src={value.img} w={'full'} h={'auto'} boxShadow={'lg'} />
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
                <Flex w={'full'} gap={'10px'}>
              {value.category_name?.map((category, index) => (
                <Tag bg={'orange'} fontFamily={'Oswald, sans-serif'} color={'white'}>{category}</Tag>
              ))}
              </Flex>
                <Text textAlign={'left'} fontSize="30px" fontFamily={'Oswald, sans-serif'} textTransform={'uppercase'}>
                {value.title}
                </Text>
                <Text>
                {value.publish_date != null
  ? new Date(value.publish_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  : ""}                </Text>
              </Flex>
      <Text textAlign={'left'} dangerouslySetInnerHTML={{ __html: value.desc }} />
           
           </Box> 
    <Box p={'0px 10px'}  w={'full'} maxW={'700px'} m={'auto'} >
 <Text fontFamily={'Oswald, sans-serif'} fontSize={'3xl'} mt={'20px'}>YOU MAY ALSO LIKE</Text> 
             <Divider mt={'5px'} mb={'5px'} />
             {related.map((re,index)=>(
                    <Box key={index} padding={'10px 5px'}>
                      <Box w={'100px'} h={'auto'}>
                          <Image 
                            src={re.img}
                            w={'full'}
                            h={'auto'}
                            objectFit={'contain'}
                          />
                      </Box>
                      <Box>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'md'} color={'gray'} textTransform={'uppercase'} _hover={{color:"orange"}}>
                    <Link href={`/article/${re.slug}`}>{re.title}</Link>
                    </Text>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'xs'} color={'gray'} textTransform={'uppercase'}>{re.publish_date != null
            ? new Date(re.publish_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}</Text>
                </Box>
                <Divider mt={'5px'} mb={'5px'} />
                    </Box>      
                ))}
    </Box>
    </>
            :
            <>LOADING...</>
        }
        </>
    );
}