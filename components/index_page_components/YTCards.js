import React from "react";
import { Box, SimpleGrid, Card, CardBody, Heading, Text, Link, Image } from '@chakra-ui/react';
const YTCards = ()=>{
    const releases = [
        {
          vidlink: "https://www.youtube.com/embed/9HSsSXaA9Xs",
        },
        {
            vidlink: "https://www.youtube.com/embed/14We8Loswv8",
         
        },
        {
            vidlink: "https://www.youtube.com/embed/_H3jst41oN4",
         
        },
        {
            vidlink: "https://www.youtube.com/embed/yxhFsIRC0J8",
       
        },
      ];
    return(
        <>
   
      <Box p={4}>
          <SimpleGrid columns={{ base: 1, sm: 2, lg:4 }} spacing={4}>
            {releases.map((release, index) => (
    <Card key={index} maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="md">
    <CardBody p="0">
      <iframe
        style={{ width: "100%", height: "480px" }}
        src={release.vidlink}
        title="Kya Aap Shasan Rasik Hain ? | #Mahasattvashali - 246"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </CardBody>
  </Card>
            ))}
          </SimpleGrid>
        </Box>
   </>
    );
}

export default YTCards;