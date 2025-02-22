import { Box, SimpleGrid, Card, CardBody, Heading, Text, Link, Image } from '@chakra-ui/react';
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";

const releases = [
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2024/07/Ujjinta-Sel-Sihare-Dikkha-Nanam-Nissihiya-Jassa-Jo-Tare-Wo-Tirth-3-768x432.png",
    title: "Ujjinta Sel Sihare, Dikkha Nanam Nissihiya Jassa | Jo Tare Wo Tirth – 3",
    category: "Jo Tare Wo Tirth",
    date: "July 6, 2024"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2024/06/3-Thumbnail-768x432.jpg",
    title: "Kankare Kankare Ananta Siddhya | Jo Tare Wo Tirth – 3",
    category: "Jo Tare Wo Tirths",
    date: "June 25, 2024"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2024/06/2-Thumbnail-768x432.jpg",
    title: "Jim Jim Shikharji Seviyeji | Jo Tare Wo Tirth – 2",
    category: "Jo Tare Wo Tirth",
    date: "June 17, 2024"
  },
];

const JTWTCards = () => {
  return (
    <>
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg:3 }} spacing={4}>
        {releases.map((release, index) => (
          <Card p={'0px'} key={index} h="400px" boxShadow="md" borderRadius="0px">
            <CardBody padding={'0px'} flexDirection="column">
              <Box w="100%" h="65%" overflow={"hidden"} bg={'black'}>
                <Image
                  src={release.imgSrc}
                  width={1000}
                  height={1000}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  cursor="pointer"
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.1)",opacity:"0.5" }}
                />
              </Box>

              <Box w="100%" flex={"1"} p="5px 10px">
                <Box w="full" h="80%">
                  <Link
                    fontSize={{ base: "1rem", sm: "1.2rem", md: "1.5rem", lg: "1.5rem" }}
                    fontFamily="Oswald, sans-serif"
                    fontWeight="bold"
                  >
                    {release.title}
                  </Link>
                </Box>
              </Box>
              <Box w="100%" h="fit-content" p={'5px 10px'}>
                  <Text display={'flex'} gap={'20px'}>
                    <Link display={'flex'} gap={'3px'} alignItems={'center'}><AiOutlineFolderOpen />{release.category}</Link>  
                    <Link display={'flex'} gap={'3px'} alignItems={'center'}><BiCalendar />{release.date}</Link>
                  </Text>
                </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
    </>
  );
};

export default JTWTCards;
