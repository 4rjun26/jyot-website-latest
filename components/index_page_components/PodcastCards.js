import React from "react";
import { Box, SimpleGrid, Card, CardBody, Image, Text, Link, Button } from "@chakra-ui/react";

const podcasts = [
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/02/31-chupo-traas.jpg", // Replace with actual images
    title: "Ep 31 - Chupo traas | Mokshmarg ni shrenio",
    src: "Mokshmarg ni shrenio",
    soundcloudUrl:"https://soundcloud.com/jyotindia/ep-30-shu-tame-man-thi-sukhi-thava-mango-cho-mokshmarg-ni-shrenio",
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/02/30-shu-tame-man-thi-sukhi-thava-mango-cho.jpg",
    title: "Ep 30- Shu tame man thi sukhi thava mango cho | Mokshmarg ni shrenio",
    src: "Mokshmarg ni shrenio",
    soundcloudUrl:"https://soundcloud.com/jyotindia/ep-30-shu-tame-man-thi-sukhi-thava-mango-cho-mokshmarg-ni-shrenio",
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/01/11-sangharsh-koni-sathe-karay.jpg",
    title: "Ep 11 - Sangharsh koni sathe karay | Jinshasan No Sar - Namaskar Mahamantra",
    src: "Jinshasan No Sar - Namaskar Mahamantra",
    soundcloudUrl:"https://soundcloud.com/jyotindia/ep-30-shu-tame-man-thi-sukhi-thava-mango-cho-mokshmarg-ni-shrenio",
  },
  {
    imgSrc: "https://jyot.in/wp-content/uploads/2025/01/10-jitvana-3-rasta.jpg",
    title: "Ep 10 - Jitvana 3 rasta | Jinshasan No Sar - Namaskar Mahamantra",
    src: "Jinshasan No Sar - Namaskar Mahamantra",
    soundcloudUrl:"https://soundcloud.com/jyotindia/ep-30-shu-tame-man-thi-sukhi-thava-mango-cho-mokshmarg-ni-shrenio",
  },
];

const PodcastCards = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {podcasts.map((podcast, index) => (
          <Card key={index} borderRadius="md" overflow="hidden" h="500px" w="100%">
            <CardBody p={0} 
                  cursor={'pointer'}>
              {/* Image Section */}
              <Box p={4} h="20%">
                <Text fontSize="0.9rem" mb={'5px'} fontFamily="Oswald, sans-serif">
                  {podcast.title}
                </Text>
                <Link fontSize="0.7rem" bg={'brown'} p={'5px 8px'} color="white">
                  {podcast.src}
                </Link>
              </Box>
              <Box w="100%" h="80%" bg={'black'} overflow={"hidden"}>
                <Image
                  src={podcast.imgSrc}
                  alt={podcast.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  transitionDuration={"0.5s"}
                  _hover={{opacity:"0.3",transform:"scale(1.1)"}}
                />
                  <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  w="100%"
                  h="20%"
                  bg="rgba(0, 0, 0, 0.6)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  opacity={0}
                  transition="opacity 0.3s ease"
                  _hover={{ opacity: 1 }}
                >
                  <Button fontSize="1.2rem" fontWeight="bold">
                    🎧 Listen Now
                  </Button>
                </Box>
              </Box>

              {/* <Box w="100%" h="40%">
                <iframe
                  width="100%"
                  height="100%"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={podcast.soundcloudUrl}
                ></iframe>
              </Box> */}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PodcastCards;
