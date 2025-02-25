import React from "react";
// import Link from "next/link";
import { useState } from "react";
import { Box, Flex,Link, IconButton, Button,Input,Text,InputGroup, InputRightElement } from "@chakra-ui/react";
import { BiCategoryAlt } from "react-icons/bi";
import { Show,Hide } from "@chakra-ui/react";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    DrawerCloseButton,
  } from '@chakra-ui/react'

const CategoriesCarousel = ({category}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
    
  const buttonsArray = [
    "Aakhir Hua Tha Kya?",
    "Aakhir Kyon?",
    "Aatma",
    "Abolish Veto At UN",
    "AKP Representation",
    "Akshay Tritiya",
    "Centuries Long Saga of Struggle – Shikharji Mahatirth",
    "coronavirus",
    "Declaration",
    "Dharmik Sampatti Nu Open Secret",
    "Dharmik Sampatti Nu Rakshan",
    "Diwali 2020",
    "ebook",
    "Ek Wonderful Series",
    "Events",
    "Gachchadhipati",
    "Impressions Vasudhaiva Kutumbakam Ki Oar",
    "Indian Culture",
    "Inkaar Kab Tak",
    "Jo Tare Wo Tirth",
    "Jyot Music",
    "Jyot Special",
    "Kariye Veer Vandana",
    "Karmavaad Reels",
    "khoj",
    "Khoj 5",
    "Konu Manvu",
    "Kya Hum Inpar Bharosa Rakhte Hain ?",
    "Kya Jain Sochenge?",
    "Letters of Jainacharya on World Order",
    "Mahasattvashali",
    "Mahavir Swami Janm Kalyanak",
    "Mann Na Rahasyo",
    "Manobal Aatmabal",
    "Mayna Sundari – The Real Winner",
    "Navpadji 2020",
    "Paryushan Vyakhyan Shreni",
    "Pedhi Kahe Che",
    "Podcast",
    "Posh Dashami",
    "Purvajo Ka Kahena Hai",
    "Purvajo Kahe Che",
    "Ranakpur",
    "Ranakpur Dharmasabha",
    "Ranakpur Ki Karun Pukar",
    "Ranakpur Reels",
    "Sangh Sattak Divas",
    "Save Humanity",
    "Save Religion",
    "Save Shikharji",
    "Sha Mate",
    "Sha Mate Hindi",
    "Shaasan Runn",
    "Shatrunjay Mahima",
    "Shatrunjay Neelkanth Mahadev Temple Case",
    "Shikharji par yeh kya ho raha hai ?",
    "Shripal Mayna Charitra",
    "The Spiritual Jurisdiction",
    "Tirthraksha Ka Bhishma Sanklap – Shikharji",
    "True Representation",
    "Uncategorized",
    "Vasudhaiva Kutumbakam Ki Oar",
    "Vasudhaiva Kutumbakam Ki Oar 3.0",
    "Vijay Prasthan 2024",
    "Vijay Prasthan 4",
    "Vijay Prasthan Utsav 2025",
    "Vision of Dharmacharya",
    "Yogdrashti"
  ];


  return (
    <>
    <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontFamily={'Oswald, sans-serif'}>Caterogies</DrawerHeader>

          <DrawerBody>
            {buttonsArray.map((ba,index)=>(
                <Flex key={index} transitionDuration={'0.3s'}  _hover={{bg:"rgba(236, 142, 0, 0.4)"}} alignItems={'center'} p={'5px'} w={'full'} m={'10px 0px'} borderBottom={'1px solid lightgray'}>
            <Link onClick={onClose}  href={`/category/${ba}`}>{ba}</Link>
            </Flex>
            ))}
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>

      <Flex justifyContent={'right'} gap={'10px'} m={'auto'} alignItems={'center'} w={'95%'} h={'50px'}>
        <Text fontSize={'2xl'} textTransform={'uppercase'} borderBottom={'2px solid brown'} fontFamily={'Oswald, sans-serif'} mr={'auto'}>{category}</Text>
        <Show above="md">
        <Button rightIcon={<BiCategoryAlt />} ref={btnRef} colorScheme="orange" onClick={onOpen} size="sm">
          Categories
        </Button>
        <Button rightIcon={<MdOutlineAccessTime />} colorScheme="orange" size="sm">
          Recent Posts
        </Button>
        <Input
                    _focus={{ boxShadow: "none" }}
                    fontWeight="bold"
                    type="text"
                    w={'150px'}
                    size={'sm'}
                    border={'1px solid gray'}
                    borderTopRightRadius={'0px'}
                    borderBottomRightRadius={'0px'}
                    placeholder="Search..."
                  />
        
                    <Button
                      aria-label="Search"
                      colorScheme="orange"
                      borderRadius="0px"
                      size="sm"
                      ml={'-10px'}
                      padding={'12px'}
                    >
                    SEARCH
                    </Button>
                    </Show>
      
      <Show below="md">
        <IconButton 
          icon={<BiCategoryAlt />} 
          ref={btnRef} 
          colorScheme="orange" 
          onClick={onOpen} 
          size="sm"
          fontSize={'xl'}
          aria-label="Categories"
        />
        <IconButton 
          icon={<MdOutlineAccessTime />} 
          colorScheme="orange" 
          size="sm"
          fontSize={'xl'}
          aria-label="Recent Posts"
        />
      </Show>
                 
      </Flex>
      <Show below="md">
      <Box w={'full'}>
      <InputGroup display={'flex'} alignItems={'center'} p={'10px'} w="100%">
      <Input
        _focus={{ boxShadow: "none" }}
        fontWeight="bold"
        type="text"
        size="md"
        border="1px solid gray"
        placeholder="Search..."
      />
      <InputRightElement>
      <IconButton
                    icon={<MdSearch />}
                      aria-label="Search"
                      colorScheme="orange"
                      h={'full'}
                      mt={'20px'}
                      mr={'22px'}
                      fontSize={'xl'}
                    /> 
      </InputRightElement>
    </InputGroup>
        
                   
      </Box>
      </Show>
    </>
  );
};

export default CategoriesCarousel;
