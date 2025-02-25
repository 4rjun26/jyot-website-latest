import React from "react";
import { Box, Flex, Link, Input, Button, IconButton } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { BsChevronRight,BsChevronDown } from "react-icons/bs";
import Image from "next/image";
import CategoriesCarousel from "../category_page_components/CategoriesCarousel";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
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

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  return (
    <>
     <Flex boxShadow={'md'} borderBottom={'1px solid lightgray'} gap={'30px'} alignItems="center" justifyContent={'right'} w={'100vw'} h={'53px'} pr={'20px'}>
        {/* Logo */}
        <Box mr={'auto'} w={'50px'} h={'100%'}>
         <Image src='/jyot_logo.png' width={1000} height={1000} style={{width:"100%",height:"auto"}} />
        </Box>

            <Box>
          <Button rightIcon={<BsChevronDown/>} display={'flex'} alignItems={'center'} ref={btnRef} onClick={onOpen} variant={'unstyled'} fontWeight={'normal'} textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            About
          </Button>

          </Box>
          {/* <CategoriesCarousel /> */}
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

      <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w={'300px'} margin={'auto'}>
          <DrawerCloseButton />
          <DrawerHeader fontFamily={'Oswald, sans-serif'} textDecoration={'underline'} fontWeight={'normal'}>ABOUT</DrawerHeader>

          <DrawerBody>
          <Link display={'block'} textTransform={"uppercase"} href="/about" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
          About Jyot
          </Link>
          <Divider borderColor={'gray'} mb={'5px'} mt={'5px'} />
          <Link  display={'block'}  textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            Spiritual sovreign jainacharya yugbhushan suriji
          </Link>
          <Divider borderColor={'gray'} mt={'5px'} />
          <Menu>
  <MenuButton w={'full'} display={'flex'} alignItems={'center'} textAlign={'left'} rightIcon={<BsChevronRight/>} variant={'unstyled'} fontWeight={'normal'} as={Button} textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }} >
    Initiations
  </MenuButton>
  <MenuList p={'10px 10px'} ml={'270px'} mt={'-50px'} borderRadius={'0px'}>
  <Link display={'block'} textTransform={"uppercase"} href="#" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
          Reclaim ranakpur
          </Link>
          <Divider borderColor={'gray'} mb={'5px'} mt={'5px'} />
          <Link   target="_blank" rel="noopener noreferrer"  display={'block'} textTransform={"uppercase"} href="https://savehumanity.jyot.in/?src=jyot" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
           Save humanity
          </Link>
          <Divider borderColor={'gray'} mb={'5px'} mt={'5px'} />
          <Link target="_blank" rel="noopener noreferrer" display={'block'} textTransform={"uppercase"} href="https://saveshikharji.com/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
           Save shikharji
          </Link>
          <Divider borderColor={'gray'} mb={'5px'} mt={'5px'} />
          <Link target="_blank" rel="noopener noreferrer" display={'block'} textTransform={"uppercase"} href="/events/shatrunjay-adinath-mahima-mahotsav" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            shatrunjay adinath mahima mahotsav
          </Link>
          <Divider borderColor={'gray'} mb={'5px'} mt={'5px'} />
          <Link target="_blank" rel="noopener noreferrer"  display={'block'} textTransform={"uppercase"} href="/events/raksha-dharma-abhiyan/" fontFamily={'Oswald, sans-serif'} color="black" _hover={{ textDecoration: "none", color: "orange" }}>
            raksha dharma abhiyan
          </Link>
         

    {/* <MenuItem>
    
    </MenuItem> */}
  </MenuList>
</Menu>
          </DrawerBody>

        </DrawerContent>
      </Drawer>

      <Drawer isOpen={isSearchOpen} onClose={onSearchClose} placement="top">
        <DrawerOverlay />
        <DrawerContent  w={'300px'} borderBottomRightRadius={'10px'} borderBottomLeftRadius={'10px'} marginLeft={'auto'}>
          <DrawerCloseButton />
          <DrawerHeader>Search</DrawerHeader>
          <DrawerBody pb={'30px'}>
            <Flex w={'100%'}>
            <Input 
            border={'1px solid gray'}
             borderTopLeftRadius={'30px'}
        borderBottomLeftRadius={'30px'}
         placeholder="Type to search..." />
            <IconButton
        fontSize={'25px'}
          aria-label="Search"
          icon={<MdSearch />}
        colorScheme="orange"
        borderTopRightRadius={'50%'}
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
