import { Box, SimpleGrid, Card, CardBody, Heading, Text, Image,Flex,Skeleton } from '@chakra-ui/react';
import Link from 'next/link';

const LatestReleasesCards = ({releases,loading}) => {
  const ar=[1,2,3,4];
  return (
    <>
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
        {loading ? 
          ar.map((a, index) => (
            <Skeleton  key={index} h="200px" boxShadow="md" borderRadius="md" />
          ))
        
      :
      releases.map((release, index) => (
        <Card key={index} h="200px" boxShadow="md" borderRadius="md">
          <CardBody display="flex" h={'full'}>
            {/* Image Box */}
            <Box w="30%" h="100%" overflow={"hidden"}>
              <Image alt="sample"
                src={release.img}
                w={"100%"}
                h={"100%"}
                objectFit={'cover'}
                cursor="pointer"
                borderRadius={'5px'}
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Box>

            {/* Text Content */}
            <Box w="70%" h="full" p="5px">
              <Box fontSize={{ base: "1rem", sm: "1.2rem", md: "1.5rem", lg: "1.5rem" }} w="full" h="80%">
                <Link
           href={release.le_type==='podcast' ? `/podcast/${release.slug}` : `/events/${release.slug}`}
                  fontSize={{ base: "1rem", sm: "1.2rem", md: "1.5rem", lg: "1.5rem" }}
                  fontFamily="Oswald, sans-serif"
                  fontWeight="bold"
                  style={{fontWeight:"bold",fontFamily:"Oswald, sans-serif"}}
                >
                  {release.title}
                </Link>
              </Box>
              <Flex w="full" h="20%" gap={'10px'}>
                        <Link  href={release.le_type==='podcast' ? '/podcast' : '/events'} passHref>
        <Text textTransform={'capitalize'} as="span" _hover={{ color: "orange" }}>
          {release.le_type}
        </Text>
      </Link>
|

        <Text as="span" _hover={{ color: "orange" }}>
        {release.publish_date != null
            ? new Date(release.publish_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}
        </Text>
              
              </Flex>
            </Box>
          </CardBody>
        </Card>
      ))
        }
        
      </SimpleGrid>
    </Box>
    </>
  );
};

export default LatestReleasesCards;
