import React from "react";
import { Box, Grid, GridItem, Text, Image } from "@chakra-ui/react";

const cards = [
  { id: 1, title: "Card 1", image: "https://jyot.in/wp-content/uploads/2022/07/shatrunjay-adinath-mahima-mahotsav-4-1024x1024.jpg", colSpan: 2, rowSpan: 1 },
  { id: 2, title: "Card 2", image: "https://jyot.in/wp-content/uploads/2022/07/shatrunjay-adinath-mahima-mahotsav-5-1024x1024.jpg", colSpan: 1, rowSpan: 2 },
  { id: 3, title: "Card 3", image: "https://jyot.in/wp-content/uploads/2022/07/shatrunjay-adinath-mahima-mahotsav-6-1024x1024.jpg", colSpan: 1, rowSpan: 1 },
  { id: 4, title: "Card 4", image: "https://jyot.in/wp-content/uploads/2022/07/shatrunjay-adinath-mahima-mahotsav-7-1024x614.jpg", colSpan: 1, rowSpan: 1 },
  { id: 5, title: "Card 5", image: "https://jyot.in/wp-content/uploads/2022/07/shatrunjay-adinath-mahima-mahotsav-1-1024x1024.jpg", colSpan: 2, rowSpan: 1 },
  { id: 6, title: "Card 6", image: "https://jyot.in/wp-content/uploads/2022/07/shatrunjay-adinath-mahima-mahotsav-2-1024x1024.jpg", colSpan: 1, rowSpan: 1 },
//   { id: 7, title: "Card 7", image: "/https://jyot.in/wp-content/uploads/2022/07/shatrunjay-adinath-mahima-mahotsav-3-1024x1024.jpg", colSpan: 1, rowSpan: 1 },
//   { id: 8, title: "Card 8", image: "/images/card8.jpg", colSpan: 2, rowSpan: 1 },
//   { id: 9, title: "Card 9", image: "/images/card9.jpg", colSpan: 1, rowSpan: 1 },
];

export default function SAMM(){
    return(
        <>
         <Grid 
      templateColumns="repeat(3, 1fr)" 
      gap={4} 
      m={'10px'}
      w="100%" 
      maxW="1200px" 
      mx="auto"
      templateRows="repeat(3, auto)"
    >
      {cards.map((card,index) => (
        <GridItem 
        key={index}
        //   colSpan={card.colSpan} 
        //   rowSpan={card.rowSpan} 
        //   bg="purple.200" 
        w={'fit-content'}
        h={'fit-content'}
          borderRadius="0px"
          bg={'black'}
          overflow={'hidden'}
          _hover={{transitionDuration: "0.3s",boxShadow:"dark-lg" }}
        >
          <Image alt="sample" src={card.image} alt={card.title} _hover={{opacity:"0.5",transform:"scale(1.05)"}} transitionDuration={'0.3s'}  />
        </GridItem>
      ))}
    </Grid>
        </>
    );
}