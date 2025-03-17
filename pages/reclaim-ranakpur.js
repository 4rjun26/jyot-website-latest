import React from "react";
import { Divider,Box,Text,Image, SimpleGrid,Card, CardBody,Button,Link,Flex,Skeleton } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";
import { LuHand } from "react-icons/lu";
import YTCards from "@/components/index_page_components/YTCards";
import { useState,useEffect } from "react";


export default function ReclaimRanakpur(){

  const [shorts_loading, setShortsLoading] = useState(true);
  const [vids_loading, setVidsLoading] = useState(true);
  
  const [shorts,setShorts]= useState([]);
  const [vids,setVids]= useState([]);

    const timelineData = [
        {
          year: 1431,
          description:
            "The land was dedicated to Shree Ranakpur Tirth by the Rana of Udaipur to Dharnashah by issuing Tamrapatra with stringent conditions of not selling it to anyone.",
        },
        {
          year: 1897,
          description:
            "The management of Shree Ranakpur Tirth was handed over to the Pedhi.",
        },
        {
          year: 1930,
          description:
            "The state of Jodhpur issued a patta confirming the possession and Tirth rights of the Pedhi.",
        },
        {
          year: 1942,
          description:
            "The first revenue settlement; the land of the Tirth was recorded as government khata.",
        },
        {
          year: 1950,
          description:
            "The area of Shree Ranakpur Tirth was declared as a part of the Reserve forest.",
        },
        {
          year: 1971,
          description:
            "The government of Rajasthan declared the area in and around Shree Ranakpur Tirth as Kumbalgarh Wildlife Sanctuary.",
        },
        {
          year: 1985,
          description:
            "Around this time the second settlement, some portion of the tirth was declared under the forest department.",
        },
        {
          year: 1997,
          description:
            "The collector of Pali issued a notice inviting objections from the local inhabitants regarding its declaration.",
        },
        {
          year: 2004,
          description:
            "At this juncture Pedhi attempted to protect the Rights of the Tirth but unfortunately due to lack of proper endeavor it failed.",
        },
        {
          year: 2009,
          description:
            'And Finally, on recommendation of SC, CEC stated that all the recommendations and the conditions stipulated by the CEC are acceptable to the Applicant Trust. "The Trust shall have only permissive possession over the temple complex."',
        },
      ];
      const fetchShorts = async () => {
        try {
          setShortsLoading(true);
          const response = await fetch("/api/get_ranakpur_reels", {
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
          const response = await fetch("/api/get_ranakpur_vids", {
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


      useEffect(() => {
        fetchVideos();
          fetchShorts();
        }, []);
      

    return(
        <>
        <Box w={'full'} maxW={'900px'} m={'20px auto'}>
            <Text fontSize={'3xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>Reclaim Ranakpur</Text>
            <Image 
            src={'https://jyot.in/wp-content/uploads/2022/09/rr-website-banner-3-1024x409.jpg'}
            alt="reclaim ranakpur banner"
            w={'full'}
            h={'auto'}
            objectFit={'contain'}
            />
        </Box>

        <Box p={"40px 5px"} w={'full'} bg={'black'} textAlign={'center'}>
  <Text m={'10px 0px'} fontFamily={"Oswald, sans-serif"} color={'white'} fontSize={'3xl'}>
    HAVE JAINS REALLY LOST RANAKPUR TIRTH?
  </Text>
  <Text m={'10px 0px'} fontFamily={"Oswald, sans-serif"} color={'white'} fontSize={'xl'}>
    Checkout the proofs below & find out yourself!
  </Text>
  <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />

  {/* Centering SimpleGrid */}
  <Flex justifyContent="center">
    <SimpleGrid columns={{ base: 1, sm: 3, lg: 3 }} spacing={4}>
      <Card textAlign={'center'} bg={'none'} maxW="sm" borderRadius="lg" overflow="hidden" >
        <CardBody textAlign={'center'} p="10px">
          <Link href={'https://jyot.in/docs/supreme-court-report-for-ranapkur-and-muchhala-mahavir.pdf'} isExternal>
            <Button _hover={{ transform: "translateY(-5px)" }} fontWeight={'light'} fontFamily={"Oswald, sans-serif"} textTransform={'uppercase'} colorScheme="green">
              SUPREME COURT REPORT
            </Button>
          </Link>
        </CardBody>
      </Card>
      <Card textAlign={'center'} bg={'none'} maxW="sm" borderRadius="lg" overflow="hidden" >
        <CardBody textAlign={'center'} p="10px">
          <Link href={'https://jyot.in/docs/Ranakpur-Report-of-CEC-in-App.-No.-986-A-filed-by-Sheth-Anandji-Kalyanji-Trust.pdf'} isExternal>
            <Button _hover={{ transform: "translateY(-5px)" }} fontWeight={'light'} fontFamily={"Oswald, sans-serif"} textTransform={'uppercase'} colorScheme="green">
              RANAKPUR CEC REPORT
            </Button>
          </Link>
        </CardBody>
      </Card>
      <Card textAlign={'center'} bg={'none'} maxW="sm" borderRadius="lg" overflow="hidden" >
        <CardBody textAlign={'center'} p="10px">
          <Link href={'https://jyot.in/docs/Muchhala-Mahavir-Report-of-CEC-in-App.-No.-986-B-filed-by-Sheth-Anandji-Kalyanji-Trust.pdf'} isExternal>
            <Button _hover={{ transform: "translateY(-5px)" }} fontWeight={'light'} fontFamily={"Oswald, sans-serif"} textTransform={'uppercase'} colorScheme="green">
              MUCHHALA MAHAVIR CEC REPORT
            </Button>
          </Link>
        </CardBody>
      </Card>
    </SimpleGrid>
  </Flex>
</Box>

        <Box p={3} textAlign={'center'} w={'full'} maxW={'900px'} m={'20px auto'}>
            <Text fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>Introduction</Text>
            <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
            <Text color={"rgb(100,100,100)"} w={'full'} textAlign={'left'}>
            Even at the expense of thousands of crores of dollars, it is almost next to impossible to construct the magnificient Mahatirth Shri Ranakpur in the present day, located in the Pali district of Rajasthan. A wealthy and generous merchant, Dharna Shah, constructed this temple and got it consecrated by the 50th Spiritual Sovereign H. H. Tapagacchadhipati Somsundar Suri Maharaja. Muchhala Mahavir, located around the vicinity of Ranakpur, is also an ancient tirth of Jinshasan. It is said that the idol of the presiding Tirthankar Mahavir Swami was made by his brother King Nandi-Vardhan.
            </Text>

            <Text mt={'100px'} fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>ASSAULT ON OWNERSHIP/RIGHTS:</Text>
            <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
            <Text fontSize={'15px'} color={"rgb(100,100,100)"} w={'full'} textAlign={'left'}>
            • In AD 1942, these Mahatirths, which although owned by the Jain Sangh for centuries, were recorded in the name of the government. <br />
• During the years AD 1950/71/85/97-98 govt ownership was established over the two mahatirths by various laws/notifications. However, in any of the mentioned years, Anandji Kalyanji Trust, administrator of the tirths, were inactive and unaware to prevent the passing on of the ownership into Government hands.<br />
• In AD 2004, AKT awoke and initiated efforts for securing rights but did not get any fruitful results. However, in 2009 they accepted permissive possession of the tirths. As a result ownership of government over both our prestigious tirths was accepted by AKT.<br />
            </Text>
 
            <Text mt={'100px'} fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>THE DIRE CONSEQUENCES OF ACCEPTING GOVERNMENT OWNERSHIP:</Text>
            <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
            <Text fontSize={'15px'} color={"rgb(100,100,100)"} w={'full'} textAlign={'left'}>
            • If any construction is to be done, permission from forest department is a must. <br/>
• The doors of large scale interventions by Government stands opened.<br/>
• Mahatirths are now prone to the Government tampering with:<br/>
    – The disciplinary rules of the tirths<br/>
    – Their recognition as ‘Jain Mahatirths’<br/>
    – And their management<br/>
• The activities of other religions, government/social programs, residence of Government officials, hotels & resorts all while involving abhakshya food can’t be ruled out.<br/>
• All in all if Government revokes their permission to possess, will we Jains be able to defend it? Imagining this gives us jitters.<br/>
            </Text>

            <Text mt={'100px'} fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>VIOLENCE ON JAIN TIRTH’S IDENTITY:</Text>
            <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
            <Text color={"rgb(100,100,100)"} w={'full'} textAlign={'left'}>
            Despite being a completely Jain mahatirth, Ranakpur is being promoted by the Government and Pujaris to be a place of Hindu as well. The Pujaris propagate that the tirth as also belonging to Islamic religion.
           </Text>

           <Text mt={'100px'} fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>MAJOR DESTRUCTIVE EVENTS IN TIRTH PREMISES:</Text>
            <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
            <Text color={"rgb(100,100,100)"} w={'full'} textAlign={'left'}>
            • Around the anniversary of our treasured tirth, a tribal fair with the most disgraceful activities take place. A young tribal folk, intending to marry get all drunk and dance. On the same occasion a carnival with commercial activities takes place within the campus of Shri Ranakpur Mahatirth.<br/>
            • Tourists also engage in inappropriate activities.<br/>
           </Text>

           <Text mt={'100px'} fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>How Jains Lost Ownership Of Ranakpur Tirth?</Text>
            <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
          <Box textAlign={'left'} w={'full'}>
          {timelineData.map((item, index) => (
            <>
            <Text fontFamily={"Oswald, sans-serif"} fontSize={'2xl'}>{item.year}</Text>
            <Divider w={'50px'} border={'3px solid brown'} />
            <Text ml={'30px'} mb={'10px'} color={'rgb(100,100,100)'} mt={'10px'}>{item.description}</Text>
            </>
        ))}
            </Box>
        </Box>

        <Box p={"40px 5px"} w={'full'} bg={'black'} textAlign={'center'}>
            <Image 
            src={'https://jyot.in/wp-content/uploads/2022/09/reclaim-ranakpur-website.png'}
            w={'350px'}
            h={'auto'}
            m={'auto'}
            objectFit={'contain'}
            alt="banner" 
             />
  <Text m={'10px 0px'} fontFamily={"Oswald, sans-serif"} color={'white'} fontSize={'3xl'}>
  Jains! Its time to wake up!!
United strength leads to victory!!
Act Now To Reclaim Ranakpur!!
  </Text>
  <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />

  {/* Centering SimpleGrid */}
  <Flex justifyContent="center">
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 2 }} spacing={4}>
      <Card textAlign={'center'} bg={'none'} maxW="sm" borderRadius="lg" overflow="hidden" >
        <CardBody textAlign={'center'} p="10px">
          <Link href={'https://jyot.in/docs/Reclaim-Ranakpur-Memorandum-Final.pdf'} isExternal>
            <Button fontSize={'2xl'} p={'20px 15px'} leftIcon={<AiOutlineDownload />} _hover={{ transform: "translateY(-5px)" }} fontWeight={'light'} fontFamily={"Oswald, sans-serif"} textTransform={'uppercase'} colorScheme="green">
              Download petition
            </Button>
          </Link>
        </CardBody>
      </Card>
      <Card textAlign={'center'} bg={'none'} maxW="sm" borderRadius="lg" overflow="hidden" >
        <CardBody textAlign={'center'} p="10px">
          <Link href={'https://jyot.in/files/rrspe.php?utm_source=web&utm_medium=web&utm_campaign=rr'} isExternal>
            <Button fontSize={'2xl'} p={'20px 15px'} leftIcon={<LuHand />} _hover={{ transform: "translateY(-5px)" }} fontWeight={'light'} fontFamily={"Oswald, sans-serif"} textTransform={'uppercase'} colorScheme="green">
            Sign petition
            </Button>
          </Link>
        </CardBody>
      </Card>
    </SimpleGrid>
  </Flex>
</Box>
<Box m={'auto'} mt={'50px'} textAlign={'center'} p={'0px 5px'} maxW={'900px'}>
        <Text fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>RANAKPUR KI KARUN PUKAR</Text>
        <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
        </Box>
        <Box w={"full"} p={4}>
                          <SimpleGrid columns={{ base: 1, sm: 1, lg:3  }} spacing={4}>
                            {vids_loading
                              ? Array.from({ length: 3 }).map((_, index) => (
                                  <Skeleton key={index} w={"full"} h={"450px"} borderRadius={"15px"} />
                                ))
                              : vids.map((post, index) => (
                                <iframe
                                style={{ width: "100%", height: "380px" }}
                                src={post.link.includes("watch?v=") ? post.link.replace("watch?v=", "embed/") : post.link}
                                title="Kya Aap Shasan Rasik Hain ? | #Mahasattvashali - 246"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                                ))}
                          </SimpleGrid>
                        </Box>

        <Box m={'auto'} mt={'50px'} textAlign={'center'} p={'0px 5px'} maxW={'900px'}>
        <Text fontSize={'4xl'} textTransform={'uppercase'} fontFamily={"Oswald, sans-serif"}>RANAKPUR Reels</Text>
        <Divider m={'40px auto'} w={'100px'} border={'3px solid red'} />
        </Box>
        <YTCards shorts_loading={shorts_loading} shorts={shorts} />
        

        </>
    );
}