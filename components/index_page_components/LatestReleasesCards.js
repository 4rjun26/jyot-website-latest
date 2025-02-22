import { Box, SimpleGrid, Card, CardBody, Heading, Text, Link, Image } from '@chakra-ui/react';

const releases = [
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Impressions-by-Dr.-Niranjan-Hiranandani-on-Spiritual-Sovereign-H-H-Jainacharya-Yugbhushansuriji-768x499.png",
    title: "Impressions by Dr. Niranjan Hiranandani on Spiritual Sovereign H H Jainacharya Yugbhushansuriji",
    category: "Vasudhaiva Kutumbakam Ki Oar 3.0",
    date: "February 16, 2025"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Updhaan-Tapasvi-Varghoda-@-GSP-Banglore-768x499.png",
    title: "Updhaan Tapasvi Varghoda @ GSP Banglore #jainsim #short #shortsvid",
    category: "Events",
    date: "February 13, 2025"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Musical-symphony-@-YugsharanSwikar-VPU-768x499.png",
    title: "Musical symphony @ YugsharanSwikar (VPU) #diksha #shortsviral #shorts",
    category: "Vijay Prasthan Utsav 2025",
    date: "February 16, 2025"
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Varshidan-Varghodo-YugSharanSwikar-VPU-768x499.png",
    title: "Varshidan Varghodo YugSharanSwikar (VPU) #diksha #shortsviral #shorts",
    category: "Vijay Prasthan Utsav 2025",
    date: "February 14, 2025"
  }
];

const LatestReleasesCards = () => {
  return (
    <>
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
        {releases.map((release, index) => (
          <Card key={index} h="200px" boxShadow="md" borderRadius="md">
            <CardBody display="flex">
              {/* Image Box */}
              <Box w="30%" h="full" p="5px" overflow={"hidden"}>
                <Image
                  src={release.imgSrc}
                  width={1000}
                  height={1000}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  cursor="pointer"
                  borderRadius={'5px'}
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Box>

              {/* Text Content */}
              <Box w="70%" h="full" p="5px">
                <Box w="full" h="80%">
                  <Link
                    fontSize={{ base: "1rem", sm: "1.2rem", md: "1.5rem", lg: "1.5rem" }}
                    fontFamily="Oswald, sans-serif"
                    fontWeight="bold"
                  >
                    {release.title}
                  </Link>
                </Box>
                <Box w="full" h="20%">
                  <Text mt="auto">
                    <Link>{release.category}</Link> | <Link>{release.date}</Link>
                  </Text>
                </Box>
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
    </>
  );
};

export default LatestReleasesCards;
