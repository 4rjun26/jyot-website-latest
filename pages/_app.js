import "@/styles/globals.css";
import { ChakraProvider, Show, Hide, Box } from "@chakra-ui/react";
import Footer from "@/components/index_page_components/Footer";
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/index_page_components/Navbar";
import MobileNavbar from "@/components/index_page_components/MobileNavbar";
import MusicPlayer from "@/components/MusicPlayer";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {/* Show MobileNavbar only on small screens */}
      <Show below="lg">
        <MobileNavbar />
      </Show>

      {/* Show Navbar only on large screens */}
      <Hide below="lg">
        <Navbar />
      </Hide>

      <Box pt="60px"> {/* Avoid content overlap */}
        {/* <Chatbot /> */}
        <MusicPlayer />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
