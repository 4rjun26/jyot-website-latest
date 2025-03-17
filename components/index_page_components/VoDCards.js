import { Box, SimpleGrid, Card, CardBody, Heading, Text, Image,Flex } from '@chakra-ui/react';
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import Link from 'next/link';

const releases = [
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/01/Gitarth-Ganga-Vision-and-Mission-Vision-of-Dharmacharya-Shorts-20-768x499.png",
    title: "Shrut Raksha Karti Sanstha Gitarth Ganga | Vision of Dharmacharya #Shorts - 17",
    category: "Vision of Dharmacharya",
    date: "December 31, 2024",
    slug:"vision-of-dharmacharya"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2024/12/Jin-Shasan-No-Vichhed-Thaay-To-Su-Thaay-Vision-of-Dharmacharya-Shorts-19-768x499.png",
    title: "Gitarth Ganga Vision and Mission | Vision of Dharmacharya #Shorts - 20",
    category: "Vision of Dharmacharya",
    date: "December 23, 2024",
        slug:"vision-of-dharmacharya"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2024/12/Vision-Clear-Karvu-Ketlu-Jaroori-Che-Vision-of-Dharmacharya-18-768x499.png",
    title: "Jin Shasan No Vichhed Thaay To Su Thaay? | Vision of Dharmacharya #Shorts - 19",
    category: "Vision of Dharmacharya",
    date: "December 19, 2024",
        slug:"vision-of-dharmacharya"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2024/10/Shrut-Raksha-Karti-Sanstha-Gitarth-Ganga-Vision-of-Dharmacharya-Shorts-17-768x499.png",
    title: "Vision Clear Karvu Ketlu Jaroori Che | Vision of Dharmacharya #Shorts - 18",
    category: "Vision of Dharmacharya",
    date: "October 10, 2024",
        slug:"vision-of-dharmacharya"
  },
];

const VoDCards = () => {
  return (
    <>
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg:4 }} spacing={4}>
        {releases.map((release, index) => (
          <Card p={'0px'} key={index} h="450px" boxShadow="md" borderRadius="0px">
            <CardBody padding={'0px'} flexDirection="column">
              <Box w="100%" h="65%" overflow={"hidden"}>
                <Image alt="sample"
                  src={release.imgSrc}
                  width={1000}
                  height={1000}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  cursor="pointer"
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.1)" }}
                />
              </Box>

              <Box w="100%" flex={"1"} p="5px 10px">
                <Box w="full" h="80%">
                <Link
                  href={`/category/${release.slug}`}
                  >
                    <Text fontSize={{ base: "0.5rem", sm: "1rem", md: "1rem", lg: "1.2rem" }}
                    fontFamily="Oswald, sans-serif"
                    fontWeight="bold">
                    {release.title}
                    </Text>
                  </Link>
                </Box>
              </Box>
              <Flex w="100%" h="fit-content" p={'5px 10px'}>
                    <Link href='/vision-of-dharmacharya' ><Text alignItems={'center'} _hover={{color:"orange"}} display={'flex'} gap={'5px'}><AiOutlineFolderOpen /> {release.category}</Text></Link>      
                </Flex>
                <Flex w="100%" h="fit-content" p={'5px 10px'}>
                   <Text alignItems={'center'} display={'flex'} gap={'5px'}><BiCalendar />{release.date}</Text>     
                </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
    </>
  );
};

export default VoDCards;
