import React from "react";
import { Box, Grid, GridItem, Text, Image,SimpleGrid } from "@chakra-ui/react";

const cards = [
  { id: 1, title: "Card 1", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-18.jpg", colSpan: 2, rowSpan: 1 },
  { id: 2, title: "Card 2", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-20.jpg", colSpan: 1, rowSpan: 2 },
  { id: 3, title: "Card 3", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-21.jpg", colSpan: 1, rowSpan: 1 },
  { id: 4, title: "Card 4", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-22.jpg", colSpan: 1, rowSpan: 1 },
  { id: 5, title: "Card 5", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-23.jpg", colSpan: 2, rowSpan: 1 },
  { id: 6, title: "Card 6", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-24.jpg", colSpan: 1, rowSpan: 1 },
  { id: 7, title: "Card 7", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-25-1024x614.jpg", colSpan: 2, rowSpan: 1 },
  { id: 8, title: "Card 8", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-1.jpg", colSpan: 1, rowSpan: 2 },
  { id: 9, title: "Card 9", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-3.jpg", colSpan: 1, rowSpan: 1 },
  { id: 10, title: "Card 10", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-2.jpg", colSpan: 1, rowSpan: 1 },
  { id: 11, title: "Card 11", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-6.jpg", colSpan: 2, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-5.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-7.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-4.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-8.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-9.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-10.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-11.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-12.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-13.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-14.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-15.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-16.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-17.jpg", colSpan: 1, rowSpan: 1 },
  { id: 12, title: "Card 12", image: "https://jyot.in/wp-content/uploads/2022/07/raksha-dharma-abhiyan-19.jpg", colSpan: 1, rowSpan: 1 },

];


export default function RDA(){
  const cols = 4; // Number of columns
  const rowHeight = 200;
  const layout = cards.map((card, index) => ({
    i: card.id.toString(),
    x: index % cols,  // Distribute items across columns
    y: Math.floor(index / cols), // Arrange rows automatically
    w: 1, // Each item takes one column
    h: 1  // Each item takes one row
  }));

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