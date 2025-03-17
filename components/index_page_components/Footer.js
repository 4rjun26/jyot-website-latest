import React from "react";
import { Box, SimpleGrid, Card, CardBody, Text,Button,Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoInstagram } from "react-icons/bi";
import { BsYoutube } from "react-icons/bs";
import {  InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box w="100%" bg="#1f2125" color="white">
      {/* Flex to divide Footer into two halves */}
      <Box h="50%" display="flex" alignItems="center" justifyContent="center">
        {/* Grid with 3 columns on large screens, 1 on small */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} w="90%">
            <Card
            h={'350px'}
            bg="none"
            borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              p={4}
            >
              <CardBody>
              <Text textTransform={'uppercase'} color={'white'} mb={'10px'} fontSize={'25px'} fontFamily={'Oswald, sans-serif'} >Ep 1 - Tirthraksha ka bhishma sankalp - Shikharji
              </Text>
              <Divider border={'2px solid white'} />
              </CardBody>
            </Card>
            
            <Card
            h={'350px'}
              bg="none"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              p={4}
            >
       <CardBody>
        <InputGroup>
          <Input
            _focus={{ boxShadow: "none" }}
            bg="gray"
            fontWeight="bold"
            border={'none'}
            type="text"
            borderRadius="0px"
            outline="none"
            color="white"
            placeholder="Search..."
            _placeholder={{color:"darkgray"}}
          />

            <Button
              aria-label="Search"
              colorScheme="orange"
              borderRadius="0px"
              size="sm"
              w={'150px'}
              h={'40px'}
              padding={'12px'}
            >
            SEARCH
            </Button>
        </InputGroup>

        <Text color={'white'} mt={'30px'} mb={'10px'} fontSize={'30px'} fontFamily={'Oswald, sans-serif'} >FOLLOW US ON:</Text>
        <Divider border={'2px solid white'} />
        <Flex  mt={'30px'} w={'full'} gap={'10px'} h={'40px'}>
        <IconButton
              icon={<BiLogoFacebook />}
              colorScheme="orange"
              fontSize={'20'}
              size="md"
              borderRadius={'50%'}
            />
             <IconButton
              icon={<BsTwitterX />}
              colorScheme="orange"
              fontSize={'20'}
              size="md"
              borderRadius={'50%'}
            />
             <IconButton
             icon={<BiLogoInstagram />}
             colorScheme="orange"
             fontSize={'20'}
             size="md"
             borderRadius={'50%'}
            />
             <IconButton
              icon={<BsYoutube />}
              colorScheme="orange"
              fontSize={'20'}
              size="md"
              borderRadius={'50%'}
            />
        </Flex>
      </CardBody>
            </Card>

            <Card
            h={'350px'}
            bg="none"
                          borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              p={4}
            >
              <CardBody>
              <Text color={'white'} mb={'10px'} fontSize={'30px'} fontFamily={'Oswald, sans-serif'} >Shikharji par ye kya ho raha hai ?
              </Text>
              <Divider border={'2px solid white'} />
              </CardBody>
            </Card>
        
        </SimpleGrid>
      </Box>

      {/* Lower half (empty for now) */}
      <Box h="50%"></Box>
    </Box>
  );
};

export default Footer;
