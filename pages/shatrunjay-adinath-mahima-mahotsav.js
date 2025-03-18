import React from "react";
import { Box, Grid, GridItem, Text, Image,SimpleGrid } from "@chakra-ui/react";

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
       <SimpleGrid 
             p={'30px'}
             columns={{ base: 1, sm: 2, md: 3, lg: 4 }} // Responsive column count
             spacing={4} // Space between items
             justifyContent="center"
           >
             {cards.map((card) => (
               <Box key={card.id} overflow="hidden" borderRadius="8px">
                 <Image 
                   src={card.image} 
                   alt={card.title} 
                   objectFit="contain" // Ensures image fits without cropping
                   width="100%" 
                   height="auto" // Maintains aspect ratio
                 />
               </Box>
             ))}
           </SimpleGrid>
        </>
    );
}