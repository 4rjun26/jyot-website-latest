import React from "react";
// import Link from "next/link";
import { useState } from "react";
import { Box, Flex, IconButton, Button,Input,Text,InputGroup, InputRightElement } from "@chakra-ui/react";
import Link from "next/link";
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
    


  return (
    <>
      <Flex justifyContent={'right'} gap={'10px'} m={'auto'} alignItems={'center'} w={'95%'} h={'50px'}>
       
        <Show above="md">
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
