import React from "react";
// import Link from "next/link";
import { useState,useEffect } from "react";
import { Box, Flex, IconButton, Button,Input,Text,InputGroup, InputRightElement } from "@chakra-ui/react";
import Link from "next/link";
import { Spinner } from '@chakra-ui/react'
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

const CategoryButton = ({category}) => {
  const [loading, setLoading] = useState(true);
  const [categories,setCategories]= useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/get_all_categories", {
          headers: {
              "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
          },
      }); // ✅ Adjust the API route if needed
        if (!response.ok) throw new Error("Failed to fetch podcasts");

        const data = await response.json();
        setCategories(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
    


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
            {loading ? 
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='orange.500'
            size='xl'
          />
          :
          categories.map((category,index)=>(
                <Flex key={category.title} transitionDuration={'0.3s'}  _hover={{bg:"rgba(236, 142, 0, 0.4)"}} alignItems={'center'} p={'5px'} w={'full'} m={'10px 0px'} borderBottom={'1px solid lightgray'}>
            <Link onClick={onClose}  href={`/${category.slug}`}>{category.title}</Link>
            </Flex>
            ))

        }
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>

      
      <Hide below="lg">
      <Button _hover={{color:"orange"}} textTransform={'uppercase'} fontWeight={'lighter'} rightIcon={<BiCategoryAlt />} ref={btnRef} variant={'unstyled'} fontFamily={'Oswald, sans-serif'} colorScheme="orange" onClick={onOpen}>
          Categories
        </Button>
      </Hide>
      <Show below="lg">
      <IconButton icon={<BiCategoryAlt />} ref={btnRef} colorScheme="orange" onClick={onOpen} fontSize={'2xl'} size="md" />
      </Show>

       
       </>
  );
};

export default CategoryButton;
