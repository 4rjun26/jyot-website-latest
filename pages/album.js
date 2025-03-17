import React from "react";
import { Box, SimpleGrid, Card, CardBody, Image, Text, Link } from "@chakra-ui/react";
// import SoundPlayer from "../components/SoundPlayer";
// import MusicPlayer from "../components/MusicPlayer";
import SoundPlayer from "@/components/index_page_components/SoundPlayer";


const podcasts = [
  { title: "Song 1", imgSrc: "/song1.jpg", soundSrc: "/sample_sound_1.mp3" },
  { title: "Song 2", imgSrc: "/song2.jpg", soundSrc: "/sample_sound_2.mp3" },
  { title: "Song 3", imgSrc: "/song3.jpg", soundSrc: "/sample_sound_3.mp3" },
];

const AlbumPage = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {podcasts.map((podcast, index) => (
          <Card key={index} borderRadius="md" overflow="hidden">
            <CardBody>
              <Image alt="sample" src={podcast.imgSrc} alt={podcast.title} />
              <Text>{podcast.title}</Text>
              <SoundPlayer src={podcast.soundSrc} />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Global Music Player */}
      <MusicPlayer />
    </Box>
  );
};

export default AlbumPage;
