import React from "react";
import { Box, SimpleGrid, Card, CardBody, Heading, Text, Link, Image } from '@chakra-ui/react';
const YTCards = ({shorts_loading,shorts})=>{

    return(
        <>
   
      <Box p={4}>
          <SimpleGrid columns={{ base: 1, sm: 2, lg:4 }} spacing={4}>
            {shorts_loading ? <>Loading...</> : 
            shorts.map((short, index) => (
    <Card key={index} maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="md">
    <CardBody p="0">
      <iframe
        style={{ width: "100%", height: "480px" }}
        src={short.link.includes("watch?v=") ? short.link.replace("watch?v=", "embed/") : short.link}
        title="Kya Aap Shasan Rasik Hain ? | #Mahasattvashali - 246"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </CardBody>
  </Card>
            ))
          }
          </SimpleGrid>
        </Box>
   </>
    );
}

export default YTCards;