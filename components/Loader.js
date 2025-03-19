import { Box, Spinner, Text } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Box 
      position="fixed" 
      top={0} 
      left={0} 
      width="100vw" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      background={'white'}
      color="white" 
      zIndex="10000"
    >
      <Spinner size="xl" color="orange" />
      <Text ml={4} color={'black'} fontSize="xl">Loading...</Text>
    </Box>
  );
}
