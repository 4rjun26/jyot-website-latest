import React from "react";
import { Box, Flex, Input, Button, IconButton,Text } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { BsChevronRight,BsChevronDown } from "react-icons/bs";
import Image from "next/image";
import Chatbot from "../Chatbot";
import Link from "next/link";
import styles from '@/styles/Home.module.css'
import CategoryButton from "./CategoryButton";
import { useRouter } from "next/router";
import {
  MenuItem
} from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
  import { Divider } from '@chakra-ui/react'

  import {
    Menu,
    MenuButton,
    MenuList,
  } from '@chakra-ui/react'

const Navbar = () => {
    const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
      if (searchValue.trim()) {
        router.push(`/search?s=${encodeURIComponent(searchValue)}`);
        onSearchClose();
        setSearchValue("");
      }
    };
  return (
    <>
     <Flex position={'fixed'} zIndex={999} bg={'white'} boxShadow={'md'} borderBottom={'1px solid lightgray'} gap={'25px'} alignItems="center" justifyContent={'right'} w={'100vw'} h={'53px'} pr={'20px'}>
        {/* Logo */}
        <Box mr={'auto'} w={'50px'} h={'100%'}>
         <Image alt="sample" src='/jyot_logo.png' width={1000} height={1000} style={{width:"100%",height:"auto"}} />
        </Box>

        {/* <Chatbot /> */}

      
              <CategoryButton />
      
              <Menu>
      <MenuButton
        textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
        color="black"
        _hover={{ textDecoration: "none", color: "orange" }}
        as={Button}
        rightIcon={<BsChevronDown />}
        fontWeight={'light'}
        bg={'none'}
      >
        About
      </MenuButton>
      <MenuList shadow={"lg"}>
        <MenuItem  textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
            color="black"
            _hover={{ textDecoration: "none", color: "orange" }}>
          <Link
           
            href="/article"
           
          >
            About Jyot
          </Link>
        </MenuItem>
        <MenuItem textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
            color="black"
            _hover={{ textDecoration: "none", color: "orange" }}>
          <Link
            href="/acharya-yugbhushansurij"
          >
            Spiritual Sovereign Jainacharya Yugbhushan Suriji
          </Link>
        </MenuItem>
        <MenuItem
        as={'div'}
          onMouseEnter={() => setIsSubMenuOpen(true)}
          onMouseLeave={() => setIsSubMenuOpen(false)}
        >
          <Menu isOpen={isSubMenuOpen} placement="right-start">
            <MenuButton
              w={"full"}
              display={"flex"}
              alignItems={"center"}
              textAlign={"left"}
              rightIcon={<BsChevronRight />}
              variant={"unstyled"}
              fontWeight={"normal"}
              as={Button}
              textTransform={"uppercase"}
              fontFamily={"Oswald, sans-serif"}
              color="black"
              _hover={{ textDecoration: "none", color: "orange" }}
            >
              Initiations
            </MenuButton>
            <MenuList
              p={"10px 10px"}
              ml={"0px"}
              mt={"0px"}
              borderRadius={"0px"}
            >
              <Link
                href="/reclaim-ranakpur"
              >
                <Text textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
            color="black"
            _hover={{ textDecoration: "none", color: "orange" }}>
                Reclaim Ranakpur
                </Text>
              </Link>
              <Divider borderColor={"gray"} mb={"5px"} mt={"5px"} />
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://savehumanity.jyot.in/?src=jyot"
              >
                <Text textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
            color="black"
            _hover={{ textDecoration: "none", color: "orange" }}>
                Save Humanity
                </Text>
              </Link>
              <Divider borderColor={"gray"} mb={"5px"} mt={"5px"} />
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://saveshikharji.com/"
              >
                <Text textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
            color="black"
            _hover={{ textDecoration: "none", color: "orange" }}>
                Save Shikharji
                </Text>
              </Link>
              <Divider borderColor={"gray"} mb={"5px"} mt={"5px"} />
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="/events/shatrunjay-adinath-mahima-mahotsav"
              >
                <Text textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
            color="black"
            _hover={{ textDecoration: "none", color: "orange" }}>
                Shatrunjay Adinath Mahima Mahotsav
                </Text>
              </Link>
              <Divider borderColor={"gray"} mb={"5px"} mt={"5px"} />
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="/events/raksha-dharma-abhiyan/"
              >
                <Text textTransform={"uppercase"}  fontFamily={"Oswald, sans-serif"}
            color="black"
            _hover={{ textDecoration: "none", color: "orange" }}>
                Raksha Dharma Abhiyan
                </Text>
              </Link>
            </MenuList>
          </Menu>
        </MenuItem>
      </MenuList>
    </Menu>    
          <Link className={styles.nextlink} textTransform={"uppercase"} href="/watch" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
          Watch
          </Link>

          <Menu>
  <MenuButton w={'fit-content'} mr={'-25px'} _hover={'none'} as={Button} rightIcon={<BsChevronDown />} bg={'none'} fontWeight={'light'} className={styles.nextlink}>
    Listen
  </MenuButton>
  <MenuList>
    <MenuItem>
    <Link className={styles.nextlink} textTransform={"uppercase"} href="/podcast" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
    Podcast
    </Link>
    </MenuItem>
    <MenuItem>
    <Link className={styles.nextlink} textTransform={"uppercase"} href="/song" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
    Song
    </Link>
    </MenuItem>
  </MenuList>
</Menu>

<Menu>
  <MenuButton  w={'fit-content'}  _hover={'none'} as={Button} rightIcon={<BsChevronDown />} bg={'none'} fontWeight={'light'} className={styles.nextlink}>
    Read
  </MenuButton>
  <MenuList shadow={'lg'}>
    <MenuItem>
    <Link className={styles.nextlink} textTransform={"uppercase"} href="/article" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
    Article
    </Link>
    </MenuItem>
    <MenuItem>
    <Link className={styles.nextlink} textTransform={"uppercase"} href="/tweet" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
    Tweet
    </Link>
    </MenuItem>
  </MenuList>
</Menu>
          <Link className={styles.nextlink} textTransform={"uppercase"} href="https://vk.jyot.in/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            Vasudhaiva Kutumbakam
          </Link>
          <Link className={styles.nextlink} textTransform={"uppercase"} href="/events" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            Events
          </Link>
          <Link className={styles.nextlink} textTransform={"uppercase"} href="/contact" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            Contact
          </Link>


        {/* Search Button */}
        <IconButton
        fontSize={'25px'}
          aria-label="Search"
          icon={<MdSearch />}
          variant="outline"
          _hover={{color:"orange"}}
          onClick={onSearchOpen}
        />
      </Flex>


      <Drawer isOpen={isSearchOpen} onClose={onSearchClose} placement="top">
        <DrawerOverlay />
        <DrawerContent  w={'400px'} borderBottomRightRadius={'10px'} borderBottomLeftRadius={'10px'} marginLeft={'auto'}>
          <DrawerCloseButton />
          <DrawerHeader>Search</DrawerHeader>
          <DrawerBody pb={'30px'}>
            <Flex w={'100%'}>
            <Input 
            type="search"
            border={'1px solid gray'}
             borderTopLeftRadius={'30px'}
        borderBottomLeftRadius={'30px'}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
         placeholder="Type to search..." />
            <IconButton
        fontSize={'25px'}
          aria-label="Search"
          icon={<MdSearch />}
        colorScheme="orange"
        borderTopRightRadius={'50%'}
        onClick={handleSearch}
        borderBottomRightRadius={'50%'}
        />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </>
  );
};

export default Navbar;
