'use client'
import { useState } from 'react';
import { Box, IconButton,Image, Input, Button,Flex, VStack, Text } from '@chakra-ui/react';
import { BsChat } from "react-icons/bs";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you?', sender: 'bot' },
    { text: 'What services do you offer?', sender: 'user' },
    { text: 'We provide AI-powered chatbot solutions.', sender: 'bot' },
    { text: 'That sounds interesting!', sender: 'user' },
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <Box zIndex={'100'} position="fixed" bottom={10} right={10}>
      <IconButton
        aria-label="Open Chatbot"
        icon={isOpen ? <MdOutlineClose /> : <BsFillChatDotsFill />}
        onClick={toggleChat}
        size={'lg'}
        fontSize={'2xl'}
        borderRadius="full"
        boxShadow="dark-lg"
        bg="orange.500"
        color="white"
        _hover={{ bg: 'orange.600' }}
      />
      
      <Box
        position="absolute"
        bottom={12}
        right={10}
        width="320px"
        bg="white"
        boxShadow="dark-lg"
        borderRadius="lg"
        borderBottomRightRadius={'0px'}
        transform={isOpen ? 'scale(1)' : 'scale(0)'}
        transformOrigin="bottom right"
        transition="transform 0.2s ease-in-out"
        // display={isOpen ? 'block' : 'none'
      >
        <Flex p={'10px'} alignItems={'center'} gap={'10px'} justifyContent={'left'} borderRadius={'10px 10px 0px 0px'} w={'full'} bg='orange' borderBottom={'1px solid gray'}>
        <Box w={'40px'} h={'100%'}>
                     <Image src='/jyot_logo.png' width={1000} height={1000} style={{width:"100%",height:"auto"}} />
                    </Box>
          <Text fontWeight={'bold'} fontSize={'lg'} color={'black'} fontFamily={'Oswald, sans-serif'} >JYOT BOT</Text>
        </Flex>
        <VStack spacing={1} p={4} align="start" height="300px" overflowY="auto">
          {messages.map((msg, index) => (
            <Flex key={index} position={'relative'} w={'full'} justifyContent={msg.sender != 'user' ? 'left' : 'right'}>
            {msg.sender!='user' ?
            <>
              <Box position={'absolute'} left={-3} mr={'auto'} w={'35px'} h={'100%'}>
                     <Image src='/jyot_logo.png' width={1000} height={1000} style={{width:"100%",height:"auto"}} />
                    </Box>
                    </>

                    :
                    <></>

            }
            <Text boxShadow={'md'} mt={'10px'} fontSize={'sm'} color={'white'} p={'5px 5px'} pt={msg.sender != 'user' ? '25px' : ''} borderRadius={'10px'}
            borderBottomRightRadius={msg.sender === 'user' ? '0px' : ''}
            borderBottomLeftRadius={msg.sender != 'user' ? '0px' : ''}
            bg={msg.sender != 'user' ? 'orange.500' : 'black'} key={index} alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
              {msg.text}
            </Text>
            </Flex>
          ))}
        <Box padding='6' w={'full'} bg='white'>
  <SkeletonCircle ml={-4} size='10' />
  <SkeletonText noOfLines={4} spacing='4' borderRadius={'10px 10px 10px 0px'}  mt='-4' h={'70px'} />
</Box>
        </VStack>
        <Flex p={2} alignItems={'center'} w={'full'} borderTop="1px solid #ddd">
          <Input
            placeholder="Type a message..."
            value={input}
            w={'90%'}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <IconButton icon={<BiSolidSend />} onClick={sendMessage} colorScheme="orange" />
        </Flex>
      </Box>
    </Box>
  );
}

