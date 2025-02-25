import { Box, Button,Flex,IconButton, FormControl, FormLabel, Input, Textarea, VStack, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { BsFacebook } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";

const ContactForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box mb={'20px'} maxW={{ base: "90%", md: "500px" }} mx="auto" mt={10} p={6} borderRadius="10px" boxShadow="lg" bg="white">
      <Heading size="lg" fontWeight={'light'} fontFamily={'Oswald, sans-serif'} textAlign="center" mb={4} color="orange.600">Contact Us</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" focusBorderColor="purple.400"/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" focusBorderColor="purple.400"/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" focusBorderColor="purple.400"/>
          </FormControl>
          <Button type="submit" colorScheme="orange" width="full" _hover={{ bg: "orange.500" }}>Send Message</Button>
        </VStack>
      </form>
      <Flex w={'full'} mt={'30px'} justifyContent={'space-around'}>
    <IconButton onClick={()=>{window.open("https://www.facebook.com/jyotindia", "_blank");}} fontSize={'2xl'} colorScheme="orange"  icon={<BsFacebook/>} />
    <IconButton onClick={()=>{window.open("https://x.com/jyotindia", "_blank");}} fontSize={'2xl'} colorScheme="orange"  icon={<BsTwitterX/>} />
    <IconButton onClick={()=>{window.open("https://www.instagram.com/jyotindia/", "_blank");}} fontSize={'2xl'} colorScheme="orange"  icon={<BsInstagram/>} />
    
    <IconButton onClick={()=>{window.open("https://www.facebook.com/jyotindia", "_blank");}} fontSize={'2xl'} colorScheme="orange"  icon={<BsWhatsapp/>} />
    <IconButton onClick={()=>{window.open("https://www.facebook.com/jyotindia", "_blank");}} fontSize={'3xl'} colorScheme="orange"  icon={<MdOutlineMailOutline/>} />
    <IconButton onClick={()=>{window.open("https://www.youtube.com/jyotindia", "_blank");}} fontSize={'3xl'} colorScheme="orange"  icon={<AiOutlineYoutube/>} />
      </Flex>

      <Divider m={'30px auto'} w={'70%'} border={'1px solid orange'} />
      <Flex>
        <Text display={'flex'} p={'5px'} gap={'10px'} alignItems={'center'}><MdLocationPin fontSize={'50px'} color='orange' /> 5, Shrutdevta Bhavan,
Jain Merchant Society,
Paldi – 380007, Ahmedabad – India.</Text>
      </Flex>
      <Flex>
        <Text display={'flex'} p={'5px'} gap={'10px'} alignItems={'center'}><MdLocalPhone fontSize={'35px'} color='orange' /> +91 9930 011 400</Text>
      </Flex>
      <Flex>
        <Text display={'flex'} p={'5px'} gap={'10px'} alignItems={'center'}><MdOutlineMailOutline fontSize={'35px'} color='orange' /> info@jyot.in</Text>
      </Flex>
    </Box>
    
  );
};

export default ContactForm;