import ContactForm from "@/components/contact_page_components/ContactForm";
import { Box } from "@chakra-ui/react";
export default function ContactUs(){
    return(
            <>
            <ContactForm />
            <Box
            
      w="90%"
      m={'10px auto'}
      bg={'gray.100'}
      border={'1px solid black'}
    h={'400px'}
      cursor="url('https://maps.gstatic.com/mapfiles/openhand_8_8.cur'), auto"
    >

    </Box>
             </>
    );
}