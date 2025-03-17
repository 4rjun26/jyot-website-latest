'use client'
import "@/styles/globals.css";
import { ChakraProvider, Show, Hide, Box } from "@chakra-ui/react";
import Footer from "@/components/index_page_components/Footer";
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/index_page_components/Navbar";
import MobileNavbar from "@/components/index_page_components/MobileNavbar";
import MusicPlayer from "@/components/MusicPlayer";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";


export default function App({ Component, pageProps }) {

  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (!router.events) return; // Ensure router is available

    const handleStart = () => setProgress(30);
    const handleComplete = () => setProgress(100);
    const handleError = () => setProgress(100);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);
  return (
    <>
     <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
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
    </>
  );
}
