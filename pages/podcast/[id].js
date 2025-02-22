import { useRouter } from "next/router";
import { Box, Text,Flex,Link,SimpleGrid,Card,CardBody,Stack,Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Navbar from "@/components/index_page_components/Navbar";
import { Tag } from "@chakra-ui/react";

const PodcastPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get dynamic ID from URL

  const releases = [
    {
      imgSrc: "https://jyot.in/wp-content/uploads/2024/06/Chaliya-Ame-To-Prabhuji-Na-Panthe-Prashant-bhai.jpg",
      title: "Chaliya Ame To Prabhuji Na Panthe",
      episodeCount: 10,
    },
    {
        imgSrc: "https://jyot.in/wp-content/uploads/2024/06/Chaliya-Ame-To-Prabhuji-Na-Panthe-Prashant-bhai.jpg",
        title: "Chaliya Ame To Prabhuji Na Panthe",
        episodeCount: 10,
      },
      {
        imgSrc: "https://jyot.in/wp-content/uploads/2024/06/Chaliya-Ame-To-Prabhuji-Na-Panthe-Prashant-bhai.jpg",
        title: "Chaliya Ame To Prabhuji Na Panthe",
        episodeCount: 10,
      },
      {
        imgSrc: "https://jyot.in/wp-content/uploads/2024/06/Chaliya-Ame-To-Prabhuji-Na-Panthe-Prashant-bhai.jpg",
        title: "Chaliya Ame To Prabhuji Na Panthe",
        episodeCount: 10,
      },
      {
        imgSrc: "https://jyot.in/wp-content/uploads/2024/06/Chaliya-Ame-To-Prabhuji-Na-Panthe-Prashant-bhai.jpg",
        title: "Chaliya Ame To Prabhuji Na Panthe",
        episodeCount: 10,
      },
  
  ];

  return (
    <>
    <br /><br /><br />
    <Box w={"90%"} position="relative" overflow="hidden" h={'500px'} margin={'auto'}>
      <Image
      src={'https://jyot.in/wp-content/uploads/2024/04/jyot-bhakti-website-banner-1-1024x409.jpg'}
      w={"100%"} h={"100%"} objectFit={'contain'}  />

        <Flex
        align="start" // Align items to the start (left-aligned)
        justify="end" // Push content to the bottom
        position="absolute"
        bottom="0px" left="0%"
        background= "linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.9))"
        w={'100%'}
        h={'100%'}
        flexDirection="column" 

        p={6} boxShadow="xl"
      >
        <Tag bg={'orange'} fontFamily={'Oswald, sans-serif'} color={'white'}>PODCAST</Tag>
        <Text fontSize="40px" fontFamily={'Oswald, sans-serif'} textTransform={'uppercase'} color="white">
        Jyot Bhakti
        </Text>
        <Text color="white">
        By <Link color="orange" fontWeight={'bold'}>jyotadmin</Link> / April 28, 2024
        </Text>
      </Flex>
    </Box>


    <Box p={4}>
                    <SimpleGrid columns={{ base: 1, sm: 2, lg:4 }} spacing={4}>
              {releases.map((release, index) => (
                <Card borderRadius={'0px'} maxW='sm' transitionDuration="0.3s" cursor={"pointer"} _hover={{bg:"rgb(240,240,240)"}}>
                  <CardBody borderRadius={'0px'}>
                    <Image
                      src={release.imgSrc}
                      alt='Green double couch with wooden legs'
                      background={'black'}
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='sm' fontWeight={'light'} fontSize={'sm'} fontFamily={'Oswald, sans-serif'}> {release.title} | {id}</Heading>
                     
                    </Stack>
                  </CardBody>
                </Card>
              ))}
              </SimpleGrid>
              </Box>

              <Flex justifyContent={'center'} alignItems={'center'} w={'100vw'} h={'100px'} bg={'#de2225'}>
                <Text fontSize={"30px"} color={'white'} fontFamily={'Oswald, sans-serif'}>
                Enrich your soul by contributing towards Prabhavana of Jinvachan.
                </Text>
              </Flex>
    </>
  );
};

export default PodcastPage;
