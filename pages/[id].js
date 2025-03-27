import React from "react";
import { useRouter } from "next/router";
import CategoriesVideosList from "@/components/category_page_components/CategoriesVideosList";
import { useState,useEffect } from "react";
import SectionTitle from "@/components/index_page_components/SectionTitle";
import { Flex,Text,Tag,Box,SimpleGrid,Card,CardBody,Image,Skeleton,SkeletonText,Button,VStack } from "@chakra-ui/react";
import Link from "next/link";
import { BiSolidChevronRight } from "react-icons/bi";

const CategoryPage = () => {
  const router = useRouter();
  const [contentTypes,setContentTypes]=useState([]);
  const [topicData,setTopicData]=useState([]);
  const { id } = router.query; // Get dynamic ID from URL

        const [loading, setLoading] = useState(true); // Loading state
    // "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
            
        const checkIfCategoryOrTopic = async () => {
          if (!id) return;
          setLoading(true);
          setContentTypes([]);
          setTopicData([]);
          try {
            const res = await fetch(`/api/check_category_or_topic?slug=${id}`, {
              headers: {
                    "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
                  "Cache-Control": "no-cache",
    "Pragma": "no-cache"
              },
            });
        
            const data = await res.json();
            if(data){
        if(data.type==="category"){
          fetchContentTypes();
        }
        else{
          fetchTopicData();
        }
      }
            
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
          finally{
          setLoading(false);
          }
        };

  const fetchContentTypes = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/get_content_type_of_category?category_slug=${id}`, {
        headers: {
          "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
           "Cache-Control": "no-cache",
    "Pragma": "no-cache"
        },
      });
  
      const data = await res.json();
  
      setContentTypes(data)
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    finally{
    setLoading(false);
    }
  };
  const changePageToVideo = async (categoryName,videoSlug)=>{
    try {
        const response = await fetch(`/api/get_slug_from_title?categoryName=${categoryName}`, {
          headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
          },
      }); // ✅ Fetch paginated data
        if (!response.ok) throw new Error("Failed to fetch podcasts");
  
        const data = await response.json();
        if (data.length > 0){
        router.push(`/${data[0].slug}/${videoSlug}`);
            
        }
    } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        // setisLoading(false);
      }
  };
    
       
  const fetchTopicData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      let originalId = id.replace(/-/g, " "); // Convert hyphens back to spaces

// Optionally capitalize each word (if your original album names were capitalized)
originalId = originalId.replace(/\b\w/g, (char) => char.toUpperCase());
      const res = await fetch(`/api/get_topic_data?topic_name=${originalId}`, {
        headers: {
           "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
           "Cache-Control": "no-cache",
    "Pragma": "no-cache"
        },
      });
  
      const data = await res.json();

  if(data && data.length>0){
      setTopicData(data);
      // console.log(data[0][0].posts);
  }
      // alert("asdasdas");
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    finally{
    setLoading(false);
    }
  };

     useEffect(() => {
      checkIfCategoryOrTopic();
        }, [id]);

        return (
          <>
            {loading ? (
              <>
                <Box p={5}>
      {/* Title Skeleton */}
      <Skeleton height="30px" width="200px" mb={4} />

      {/* Cards Skeleton (Responsive: 1 column on small screens, 3 columns on large) */}
      <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} spacing={6}>
        <Skeleton height="200px" borderRadius="10px" />
        <Skeleton height="200px" borderRadius="10px" />
        <Skeleton height="200px" borderRadius="10px" />
      </SimpleGrid>

      {/* Another Title Skeleton */}
      <Skeleton height="30px" width="180px" mt={8} mb={4} />

      {/* Text Skeleton (5 lines of placeholder text) */}
      <VStack spacing={3} align="stretch">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </VStack>
    </Box>
              </>
            ) : contentTypes.length > 0 ? (
              <CategoriesVideosList category={id} contentTypes={contentTypes} />
            )  : topicData.length > 0 ? (
              topicData.map((data, index) => (
                <React.Fragment key={index}>
                  {data[0]?.html_content ? (
                     <div dangerouslySetInnerHTML={{ __html: data[0].html_content }} />
                  ) : data[0].posts[0]?.content_type === "article" ? (
                    <>
                     <SectionTitle text={data[0].name} />
                            <Box p={4}>
                                  <SimpleGrid columns={{ base: 1, sm: 2, lg:3 }} spacing={4}>
                                    {loading ? 
                                      [1,2,3].map((a, index) => (
                                        <Skeleton  key={index} h="200px" boxShadow="md" borderRadius="md" />
                                      ))
                                    
                                  :
                                  data[0].posts.map((article, index) => (
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
                               <Box textAlign={'center'} mt={'20px'}>
          <Link href={'/article'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
                    </>
                  ) : data[0].posts[0]?.content_type === "shorts" ? (
                    <>
                    <SectionTitle text={data[0].name} />
                    <YTCards shorts_loading={loading} shorts={data[0].posts} />
                    <Box textAlign={'center'} mt={'20px'}>
          <Link href={'/shorts'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
                    </>
                  ) : data[0].posts[0]?.content_type === "video" ? (
                      <>
                          <SectionTitle text={data[0].name} />
                          <br/>
           <SimpleGrid columns={{ base: 1, sm: 1, lg:3 }} spacing={4}>
                             {loading
                               ? Array.from({ length: 9 }).map((_, index) => (
                                   <Skeleton key={index} w={"full"} h={"450px"} borderRadius={"15px"} />
                                 ))
                               : data[0].posts.map((post, index) => (
                                 <>
                                 <Card key={index} h="400px" boxShadow="md" borderRadius="md">
                                 <CardBody h={'full'}>
                                 
                                 {/* Image Box */}
                                 <Box w="100%" h="70%" bg={'black'} overflow={"hidden"}>
                                 <Image alt="sample"
                                 src={post.img}
                                 w={"100%"}
                                 h={"100%"}
                                 objectFit={'contain'}
                                 cursor="pointer"
                                 borderRadius={'5px'}
                                 transitionDuration={'0.3s'}
                                 _hover={{ transform: "scale(1.05)",opacity:"0.5" }}
                                 onClick={()=>{changePageToVideo(post.category_name[0],post.slug)}}
                                 />
                                 </Box>
                                 <Flex mt={'10px'} w={'full'} h={'15%'}>
                                 <Text fontSize={'lg'} noOfLines={2} fontFamily={'Oswald, sans-serif'}>{post.title}</Text>
                                 </Flex>
                                 {post.category_name[0]!=null ?
                                 <Flex gap={'10px'} w={'full'} pt={'5px'}>   
                                 <Tag cursor={'pointer'} onClick={()=>{changePage(post.category_name[0])}} colorScheme="orange">{post.category_name[0]}</Tag>
                                 </Flex>
                                 :
                                 <></>  
                                 }
                                 </CardBody>
                                 </Card>
                                 </> 
                                 ))}
                           </SimpleGrid>
                           <Box textAlign={'center'} mt={'20px'}>
          <Link href={'/videos'}>
              <Button transitionDuration={'0.3s'} _hover={{bg:"red.600",boxShadow:"lg",transform:"translateY(-10px)"}} size={'sm'} rightIcon={<BiSolidChevronRight size={30} />} colorScheme="orange">View All</Button>
        </Link>
        </Box>
                      </>
                  ): (
                    <Text>Other content type</Text> 
                  )}
                </React.Fragment>
              ))
            ) : (
              <>
              NOTHING FOUND
              </>
            )}
          </>
        );

}

export default CategoryPage;