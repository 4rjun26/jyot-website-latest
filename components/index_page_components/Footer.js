import React from "react";
import { Box, SimpleGrid, Card, CardBody, Text,Button,Flex,Image,Link, Skeleton,Tag } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoInstagram } from "react-icons/bi";
import { useState,useEffect } from "react";
import { BsYoutube } from "react-icons/bs";
import {  InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Footer = () => {
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
        const router = useRouter();
    
    const handleSearch = () => {
      if (searchValue.trim()) {
        router.push(`/search?s=${encodeURIComponent(searchValue)}`);
        setSearchValue("");
      }
    };

    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await fetch(`/api/get_latest_post`, {
          headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
          },
      }); // ✅ Fetch paginated data
        if (!response.ok) throw new Error("Failed to fetch podcasts");
  
        const data = await response.json();
        if (data.length === 0){ 
        //  setHasMore(false); // ✅ Stop loading if no more data
        }
        else{
          setData(data[0]); 
        } 
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setisLoading(false);
      }
    };

    useEffect(() => {
      fetchData(); 
    }, []); 
  return (
    <>
    {isLoading ? <></> : 
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
              <Text textTransform={'uppercase'} color={'white'} mb={'10px'} fontSize={'25px'} fontFamily={'Oswald, sans-serif'} >
                Latest Release
              </Text>
              <Divider border={'2px solid white'} />
              {isLoading ? <><Skeleton w={'full'} h={'250px'} /></> :
              <>
              <Box w={'full'}>
                <Image 
                  src={data.img}
                  w={'full'}
                  h={'auto'}
                  objectFit={'contain'}
                />
              </Box>
              <Text textTransform={'uppercase'} color={'white'} mb={'10px'} fontSize={'15px'} fontFamily={'Oswald, sans-serif'} >
                {data.title}
              </Text>
              <Tag colorScheme="orange">{data.category_name[0]}</Tag>
              </>
              }
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
             type="search"
            borderRadius="0px"
            outline="none"
            color="white"
            placeholder="Search..."
            _placeholder={{color:"darkgray"}}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key

          />

            <Button
              aria-label="Search"
              colorScheme="orange"
              borderRadius="0px"
              size="sm"
              w={'150px'}
              h={'40px'}
              padding={'12px'}
              onClick={handleSearch}
            >
            SEARCH
            </Button>
        </InputGroup>

        <Text color={'white'} mt={'30px'} mb={'10px'} fontSize={'30px'} fontFamily={'Oswald, sans-serif'} >FOLLOW US ON:</Text>
        <Divider border={'2px solid white'} />
        <Flex  mt={'30px'} w={'full'} gap={'10px'} h={'40px'}>
              <Link href="https://www.facebook.com/jyotindia" isExternal>
        <IconButton
              icon={<BiLogoFacebook />}
              colorScheme="orange"
              fontSize={'20'}
              size="md"
              borderRadius={'50%'}
            /></Link>

<Link href="https://x.com/indiajyot" isExternal>
             <IconButton
              icon={<BsTwitterX />}
              colorScheme="orange"
              fontSize={'20'}
              size="md"
              borderRadius={'50%'}
            /></Link>

<Link href="https://www.instagram.com/jyotindia/" isExternal>
             <IconButton
             icon={<BiLogoInstagram />}
             colorScheme="orange"
             fontSize={'20'}
             size="md"
             borderRadius={'50%'}
            /></Link>

<Link href="https://www.youtube.com/jyotindia" isExternal>
             <IconButton
              icon={<BsYoutube />}
              colorScheme="orange"
              fontSize={'20'}
              size="md"
              borderRadius={'50%'}
            /></Link>
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
}
    </>
  );
};

export default Footer;
