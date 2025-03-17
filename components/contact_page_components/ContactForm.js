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
import { BsGlobe } from "react-icons/bs";

const ContactForm = () => {
  const toast = useToast();
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        toast({
          title: "Message Sent!",
          description: "We'll get back to you soon.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: result.error || "Error sending message" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Something went wrong" });
    }

    setLoading(false);
  };

  return (
    <Box mb={'20px'} maxW={{ base: "90%", md: "500px" }} mx="auto" mt={10} p={6} borderRadius="10px" boxShadow="lg" bg="white">
      <Heading size="lg" fontWeight={'light'} fontFamily={'Oswald, sans-serif'} textAlign="center" mb={4} color="orange.600">Contact Us</Heading>
    
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
      <Divider m={'20px auto'} w={'70%'} border={'1px solid orange'} />
      <Text fontSize={'3xl'} mb={'10px'} fontFamily={'Oswald, sans-serif'} color={'orange.400'} display={'flex'} w={'full'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>International Contact <BsGlobe /></Text>
      
      <Text fontSize={'md'} fontFamily={'Oswald, sans-serif'} display={'flex'} textDecoration={'underline'} w={'full'} pl={'10px'} justifyContent={'left'} alignItems={'center'} gap={'5px'}>Hemant M.Shah</Text>  
      <Text fontSize={'md'} fontFamily={'Oswald, sans-serif'} display={'flex'} w={'full'} pl={'10px'} justifyContent={'left'} alignItems={'center'} gap={'5px'}>Mobile (India) : +91 9820 053 530</Text>
      <Text fontSize={'md'} fontFamily={'Oswald, sans-serif'} display={'flex'} w={'full'} pl={'10px'} justifyContent={'left'} alignItems={'center'} gap={'5px'}>Mobile (Canada) : 001 204 229 5445</Text>
    
    </Box>
    
  );
};

export default ContactForm;