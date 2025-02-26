import React, { useState } from "react";
import { Box, Flex, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Link, Image } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "@chakra-ui/react";
import Chatbot from "../Chatbot";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

const MobileNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Navbar */}
      <Flex
        as="nav"
        w="100%"
        h="60px"
        boxShadow={'md'}
        px={4}
        bg={'white'}
        color="white"
        align="center"
        justifyContent={'right'}
        position="fixed"
        gap={'20px'}
        top="0"
        zIndex="1000"
      >
        {/* Logo */}
        <Box mr={'auto'}>
          <Image src="/jyot_logo.png" alt="Logo" h="50px" />
        </Box>

        {/* Hamburger Menu */}
        <Chatbot />
        <IconButton
          icon={<GiHamburgerMenu />}
          aria-label="Open Menu"
          variant="outline"
          colorScheme="orange"
          fontSize="24px"
          onClick={onOpen}
        />
      </Flex>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" size={'md'} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent color="black">
          <DrawerCloseButton size={'lg'} />
          <DrawerHeader p={'3px'} borderBottom={'2px solid orange'}>
          <Image src="/jyot_logo.png" alt="Logo" h="50px" />
        </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">

        <Input type="search" border={'1px solid gray'} placeholder="Search..." />

            <Accordion allowMultiple w={'full'}>
  <AccordionItem>
    <h2>
      <AccordionButton textTransform={"uppercase"}  href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" p={'5px 0px'} w={'100%'}>
        <Box as='span' flex={'1'}>
          About
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <VStack spacing={4} align="start">
       <Link display={'block'} textTransform={"uppercase"} href="/about" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                About Jyot
                </Link>
                <Link  display={'block'}  textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                  Spiritual sovreign jainacharya yugbhushan suriji
                </Link>
                <Accordion allowMultiple w={'full'}>
  <AccordionItem>
    <h2>
      <AccordionButton textTransform={"uppercase"}  href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" p={'5px 0px'} w={'100%'}>
        <Box as='span' flex={'1'}>
          Initiatives
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <VStack spacing={4} align="start">
    <Link display={'block'} textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
             Reclaim ranakpur
             </Link>
             <Link   target="_blank" rel="noopener noreferrer"  display={'block'} textTransform={"uppercase"} href="https://savehumanity.jyot.in/?src=jyot" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
              Save humanity
             </Link>
             <Link target="_blank" rel="noopener noreferrer" display={'block'} textTransform={"uppercase"} href="https://saveshikharji.com/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
              Save shikharji
             </Link>
             <Link target="_blank" rel="noopener noreferrer" display={'block'} textTransform={"uppercase"} href="/events/shatrunjay-adinath-mahima-mahotsav" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
               shatrunjay adinath mahima mahotsav
             </Link>
             <Link target="_blank" rel="noopener noreferrer"  display={'block'} textTransform={"uppercase"} href="/events/raksha-dharma-abhiyan/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
               raksha dharma abhiyan
             </Link>
            </VStack>
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
    </VStack>

    </AccordionPanel>
  </AccordionItem>
  </Accordion>
                <Link textTransform={"uppercase"} href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                        Podcast
                        </Link>
                        <Link textTransform={"uppercase"} href="https://vk.jyot.in/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                          Vasudhaiva Kutumbakam
                        </Link>
                        <Link target="_blank" textTransform={"uppercase"} href="https://pages.razorpay.com/stores/gyanjyot" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                          Gyan Jyot Book
                        </Link>
                        <Link textTransform={"uppercase"} href="/category/events" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                          Events
                        </Link>
                        <Link textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                          Blog
                        </Link>
                        <Link textTransform={"uppercase"} href="/contact" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                          Contact
                        </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
