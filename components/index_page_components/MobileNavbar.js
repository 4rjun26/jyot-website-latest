import React, { useState } from "react";
import { Box, Flex, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Image } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "@chakra-ui/react";
import Chatbot from "../Chatbot";
import CategoryButton from "./CategoryButton";
import Link from "next/link";
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import MusicPlayer from "../MusicPlayer";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'


import { SiYoutubeshorts } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import { MdPodcasts } from "react-icons/md";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { MdArticle } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";

const MobileNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
 const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
      if (searchValue.trim()) {
        router.push(`/search?s=${encodeURIComponent(searchValue)}`);
        onClose();
        setSearchValue("");

      }
    };

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
          <Link href={'/'}>
          <Image src="/jyot_logo.png" alt="Logo" h="50px" />
          </Link>
        </Box>

        {/* Hamburger Menu */}
        <MusicPlayer />
        <CategoryButton />
        {/* <Chatbot /> */}
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

        <Input type="search"  value={searchValue} onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
        onChange={(e) => setSearchValue(e.target.value)} border={'1px solid gray'} placeholder="Search..." />

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
       <Link  onClick={onClose} className={styles.nextlink} display={'block'} textTransform={"uppercase"} href="/about" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                About Jyot
                </Link>
                <Link  onClick={onClose} className={styles.nextlink}  display={'block'}  textTransform={"uppercase"} href="/acharya-yugbhushansurij" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
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
    <Link  onClick={onClose} className={styles.nextlink} display={'block'} textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
             Reclaim ranakpur
             </Link>
             <Link  onClick={onClose} className={styles.nextlink}   target="_blank" rel="noopener noreferrer"  display={'block'} textTransform={"uppercase"} href="https://savehumanity.jyot.in/?src=jyot" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
              Save humanity
             </Link>
             <Link  onClick={onClose} className={styles.nextlink} target="_blank" rel="noopener noreferrer" display={'block'} textTransform={"uppercase"} href="https://saveshikharji.com/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
              Save shikharji
             </Link>
             <Link  onClick={onClose} className={styles.nextlink} target="_blank" rel="noopener noreferrer" display={'block'} textTransform={"uppercase"} href="/shatrunjay-adinath-mahima-mahotsav" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
               shatrunjay adinath mahima mahotsav
             </Link>
             <Link  onClick={onClose} className={styles.nextlink} target="_blank" rel="noopener noreferrer"  display={'block'} textTransform={"uppercase"} href="/raksha-dharma-abhiyan/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
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

  <Accordion allowMultiple w={'full'}>
  <AccordionItem>
    <h2>
      <AccordionButton textTransform={"uppercase"}  href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" p={'5px 0px'} w={'100%'}>
        <Box as='span' flex={'1'}>
          Watch
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <VStack spacing={4} align="start">
       <Link  onClick={onClose} className={styles.nextlink} display={'block'} textTransform={"uppercase"} href="/shorts" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            <SiYoutubeshorts size={20} />
              Shorts
                </Link>
                <Link  onClick={onClose} className={styles.nextlink}  display={'block'}  textTransform={"uppercase"} href="/videos" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
               <BsYoutube size={20} />
                  Videos
                </Link>
                <Link  onClick={onClose} className={styles.nextlink}  display={'block'}  textTransform={"uppercase"} href="/movies" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
              <MdLocalMovies size={20} />
                  Movies
                </Link>
    </VStack>

    </AccordionPanel>
  </AccordionItem>
  </Accordion>
                        
            <Accordion allowMultiple w={'full'}>
  <AccordionItem>
    <h2>
      <AccordionButton textTransform={"uppercase"}  href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" p={'5px 0px'} w={'100%'}>
        <Box as='span' flex={'1'}>
          Listen
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <VStack spacing={4} align="start">
       <Link  onClick={onClose} className={styles.nextlink} display={'block'} textTransform={"uppercase"} href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
          <MdPodcasts size={20} />
              Podcast
                </Link>
                <Link  onClick={onClose} className={styles.nextlink}  display={'block'}  textTransform={"uppercase"} href="/song" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                <BsMusicNoteBeamed size={20} />
                Music
                </Link>
    </VStack>

    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  <Accordion allowMultiple w={'full'}>
  <AccordionItem>
    <h2>
      <AccordionButton textTransform={"uppercase"}  href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" p={'5px 0px'} w={'100%'}>
        <Box as='span' flex={'1'}>
          Read
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <VStack spacing={4} align="start">
       <Link  onClick={onClose} className={styles.nextlink} display={'block'} textTransform={"uppercase"} href="/article" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
             <MdArticle size={20} />
              Article
                </Link>
                <Link  onClick={onClose} className={styles.nextlink}  display={'block'}  textTransform={"uppercase"} href="/tweet" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                <BsTwitterX size={20} />
                  Tweet
                </Link>
    </VStack>

    </AccordionPanel>
  </AccordionItem>
  </Accordion>
                        <Link  onClick={onClose} className={styles.nextlink} textTransform={"uppercase"} href="https://vk.jyot.in/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                          Vasudhaiva Kutumbakam
                        </Link>
                        <Link  onClick={onClose} className={styles.nextlink} textTransform={"uppercase"} href="/events" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
                          Events
                        </Link>
                        <Link  onClick={onClose} className={styles.nextlink} textTransform={"uppercase"} href="/contact" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
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
