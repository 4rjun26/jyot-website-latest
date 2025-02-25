import React from "react";
import { Box, SimpleGrid, Card, CardBody, Heading, Text, Link, Image } from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";

const Banner = ({text}) => {

    return(
        <>
           <Box p={4} bg={'black'}>
                <SimpleGrid columns={{ base: 1, sm: 1, lg:2 }} spacing={4}>
                    <Card  bg={'black'} p={'0px'} h="450px" boxShadow="md" borderRadius="0px">
                      <CardBody>
                        <Box w={'full'} h={'full'} bg={'black'}>
                          <Image src="https://jyot.in/wp-content/uploads/2024/06/Pavagadh-Tirthraksha-letter-to-cm-yugbhushansuri-1024x576.jpg"
                          width={1000}
                          height={1000}
                          objectFit={'contain'}
                          w={'100%'}
                          h={'100%'}
                          />
                        </Box>

                      </CardBody>
                    </Card>
                    <Card  bg={'black'} p={'0px'} minh="30px" boxShadow="md" borderRadius="0px">
                      <CardBody>
                      <Box w={'full'} h={'full'} bg={'black'}>
                        <Text fontWeight={'bold'} fontSize={'2rem'} color={'white'} fontFamily={'Oswald, sans-serif'}>
                        PAVAGADH TIRTHRAKSHA - GACHCHADHIPATI YUGBHUSHANSURI'S LETTER TO GUJARAT CM
                        </Text>
                        <Box w={'30%'} h={'7px'} mt={'20px'} mb={'20px'} bg={'brown'}>

                        </Box>
                        <Text fontSize={'1.05rem'} mb={'20px'} fontWeight={'bold'} color={'white'}>
                        Subject:  Sanctity and Security of All Tirths of the Shwetambar Murtipujak Jain Sangh
                        </Text>
                        <Text fontSize={'1.05rem'} mb={'20px'} fontWeight={'bold'} color={'white'}>
                        Dharmlabh,
                        </Text>
                        <Text fontSize={'1.05rem'} color={'white'}>
                        You would be aware of the recent sacrilegious act allegedly done by the Mandir trust of Pavagadh to disrespectfully dismantle and damage ancient Jain Shwetamber murtis on <b>Pavagadh</b> Hill. The entire 'Shwetambar Murtipujak Jain Sangh' (Jains) is shocked by this activity…
                        </Text>

                        <Button _hover={'none'} fontWeight={'light'} variant={'solid'} fontFamily={'Oswald, sans-serif'} mt={'25px'} as={'button'} bg={'brown'} p={'10px'} borderRadius={'5px'} color={'white'} >Read more</Button>

                        </Box>
                        
                      </CardBody>
                    </Card>

                </SimpleGrid>
              </Box>
        </>
    );

}

export default Banner;
