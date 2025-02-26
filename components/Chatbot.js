import React from 'react';
import { useRef } from 'react';
import { useState,useEffect } from 'react';
import { Box, IconButton,Image, Input, Button,Flex, VStack, Text,useToast } from '@chakra-ui/react';
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import { SkeletonText } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { motion } from "framer-motion"; 
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

export default function Chatbot() {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [translatedMessages, setTranslatedMessages] = useState({});
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [userScrolledUp, setUserScrolledUp] = useState(false);
    const messagesEndRef = useRef(null);
  
    const handleSubmit = async () => {
      if (!input.trim()) {
        toast({
          title: "Error",
          description: "Please enter a message.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message first
      setInput("");
      setLoading(true);
    
      try {
        const res = await fetch("/api/askAI", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input }),
        });
    
        const text = await res.text(); // Read response as text first
    
        try {
          const data = JSON.parse(text); // Try parsing JSON
          if (res.ok) {
            const [gujaratiText, englishTranslation] = data.answer.split("T2E").map(str => str.trim());
    
            const botMessage = { 
              text: gujaratiText || data.answer, 
              english_translation: englishTranslation || "" , 
              sender: "bot" 
            };
    
            setMessages((prevMessages) => [...prevMessages, botMessage]); // Append bot response
          } else {
            throw new Error(data.error || "Something went wrong");
          }
        } catch (jsonError) {
          throw new Error(`Unexpected response: ${text}`);
        }
      } catch (error) {
        toast({
          title: "Request Failed",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    
      setLoading(false);
    };
   
  const [messages, setMessages] = useState([
    { text: 'હેલો! હું તમને કેવી રીતે મદદ કરી શકું?',english_translation: 'Hello! How can I help you?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const drawerBodyRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  };
  const handleTranslate = (index) => {
    setTranslatedMessages((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle translation state
    }));
  };

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
      setUserScrolledUp(false); // Reset manual scroll flag
    }
  };

  // Scroll when new message arrives (if user hasn't manually scrolled up)
  useEffect(() => {
    if (!userScrolledUp) {
      scrollToBottom(true);
    }
  }, [messages]);

  // Detect Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      if (drawerBodyRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = drawerBodyRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
        setShowScrollButton(!isAtBottom);
        setUserScrolledUp(!isAtBottom); // Track if user manually scrolled up
      }
    };

    const drawerBodyElement = drawerBodyRef.current;
    if (drawerBodyElement) {
      drawerBodyElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (drawerBodyElement) {
        drawerBodyElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <>
      <IconButton
        aria-label="Open Chatbot"
        icon={isOpen ? <BsFillChatDotsFill /> : <BsFillChatDotsFill />}
        onClick={onOpen}
        size={'lg'}
        zIndex={'100'}
        position={{ base: "static", md: "fixed" }} // "fixed" only on desktop
  bottom={{ md: 10 }} // Only applies on md and above
  right={{ md: 10 }} // Only applies on md and above
        fontSize={'2xl'}
        borderRadius="full"
        boxShadow={{base:"none",md:"dark-lg"}}
        bg="orange.500"
        color="white"
        _hover={{ bg: 'orange.600' }}
      />
       <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        size={'md'}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size={'lg'} mr={'-11px'} bg={'red.200'} mt={'-9px'} />
          <DrawerHeader>
          <Flex p={'10px'} alignItems={'center'} gap={'10px'} justifyContent={'left'} w={'full'} bg='white' borderBottom={'1px solid gray'}>
<Box w={'40px'} h={'100%'}>
             <Image src='/jyot_logo.png' width={1000} height={1000} style={{width:"100%",height:"auto"}} />
            </Box>
  <Text fontWeight={'bold'} fontSize={'2xl'} color={'black'} fontFamily={'Oswald, sans-serif'} >JYOT BOT</Text>
</Flex>
          </DrawerHeader>

          <DrawerBody  ref={drawerBodyRef} overflow={'auto'}>
          <VStack spacing={1} p={4} align="start" overflowY="auto">
          {messages.map((msg, index) => (
  <Box key={index} w="full" position="relative">
  <Flex justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
    {/* Animated Message Bubble */}
    <motion.div
      key={index}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }}
      exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.1 } }}
      style={{ position: "relative", maxWidth: "80%" }}
    >
      <Text
        boxShadow="md"
        mt="10px"
        fontSize="sm"
        w="fit-content"
        color="white"
        p="8px 12px"
        borderRadius="10px"
        bg={msg.sender !== 'user' ? 'orange.500' : 'black'}
        borderBottomRightRadius={msg.sender === 'user' ? '0px' : '10px'}
        borderBottomLeftRadius={msg.sender !== 'user' ? '0px' : '10px'}
      >
        {msg.sender !== 'user' 
          ? translatedMessages[index] ? msg.english_translation : msg.text
          : msg.text}
      </Text>
    </motion.div>
  </Flex>

  {/* Convert to English Button (Only for Bot Messages) */}
  {msg.sender !== 'user' && msg.english_translation.length>0 && (
    <Button size="xs" colorScheme="orange" variant="outline" mt={1} onClick={() => handleTranslate(index)}>
      {translatedMessages[index] ? "Show Gujarati" : "Translate to English"}
    </Button>
  )}
</Box>

  ))}

  { loading ? 
<Box padding='6' w={'full'} bg='white'>
<SkeletonText noOfLines={4} spacing='4' borderRadius={'10px 10px 10px 0px'}  mt='-4' h={'70px'} />
</Box>
: <></>
}
<div ref={messagesEndRef} />
</VStack>
{/* {showScrollButton && (
  <Flex zIndex={999} position="absolute" alignItems={'center'} justifyContent={'center'}  bottom="70px" ml={'-25px'} w={'full'} h={'50px'}>        
      <IconButton
      icon={<MdKeyboardDoubleArrowDown />}
          size="sm"
          colorScheme="purple"
          // variant={'outline'}

          onClick={scrollToBottom}
          boxShadow="lg"
        />
        </Flex>
        )} */}
          </DrawerBody>

          <DrawerFooter>
          <Flex p={2} alignItems={'center'} w={'full'} borderTop="1px solid #ddd">
  <Input
    placeholder="Type a message..."
    value={input}
    w={'90%'}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent default form submission behavior
        handleSubmit(); // Call handleSubmit
      }
    }}
  />
  <IconButton icon={<BiSolidSend />} onClick={handleSubmit} isDisabled={loading} colorScheme="orange" />
</Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </>
  );
}

