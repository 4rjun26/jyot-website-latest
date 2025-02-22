import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import ScrollToTop from "@/components/index_page_components/ScrollToTop";
import Footer from "@/components/index_page_components/Footer";
// import useSmoothScroll from "@/hooks/useSmoothScroll";
import Navbar from "@/components/index_page_components/Navbar";

export default function App({ Component, pageProps }) {
  
  return (
  <ChakraProvider>
    <ScrollToTop />
    <Navbar />
    <Component {...pageProps} />
    <Footer />
    </ChakraProvider>
    );
}
