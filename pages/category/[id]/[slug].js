import React from "react";
import { useRouter } from "next/router";
import { Box,Text,Divider,Link } from "@chakra-ui/react";
import CategoriesCarousel from "@/components/category_page_components/CategoriesCarousel";
const VideoPage = ()=>{
     const router = useRouter();
      const { slug } = router.query; // Get dynamic ID from URL
      const pathSegments = router.asPath.split("/").filter(Boolean); // Split path into parts

      // Get the previous segment (if exists)
      const category = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : null;
    
      const releases = [
        {
          imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Updhaan-Tapasvi-Varghoda-@-GSP-Banglore-1024x665.png",
          title: "Updhaan Tapasvi Varghoda @ GSP Banglore #jainsim #short #shortsvideo",
          by: "Jyot",
          date: "December 31, 2024"
        },
        {
            imgSrc: "https://jyot.in/wp-content/uploads/2025/02/GSP-Updhaan-Malaropan-@-Banglore-1024x665.png",
            title: "GSP Updhaan Malaropan @ Banglore #religion #jainsim #spirituality",
            by: "Jyot",
            date: "February 10, 2025"
          },
          {
            imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Diksharthi-vrushtiben-Na-Gruh-aangane-Pu.-GachchadhipatiShri-1024x576.jpg",
            title: "Diksharthi vrushtiben Na Gruh aangane Pu. GachchadhipatiShri #jainsim #sprituality #diksha #saiyam",
            by: "Jyot",
            date: "February 2, 2025"
          },
          {
            imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Updhaan-Tapasvi-Varghoda-@-GSP-Banglore-1024x665.png",
            title: "Updhaan Tapasvi Varghoda @ GSP Banglore #jainsim #short #shortsvideo",
            by: "Jyot",
            date: "December 31, 2024"
          },
          {
              imgSrc: "https://jyot.in/wp-content/uploads/2025/02/GSP-Updhaan-Malaropan-@-Banglore-1024x665.png",
              title: "GSP Updhaan Malaropan @ Banglore #religion #jainsim #spirituality",
              by: "Jyot",
              date: "February 10, 2025"
            },
            {
              imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Diksharthi-vrushtiben-Na-Gruh-aangane-Pu.-GachchadhipatiShri-1024x576.jpg",
              title: "Diksharthi vrushtiben Na Gruh aangane Pu. GachchadhipatiShri #jainsim #sprituality #diksha #saiyam",
              by: "Jyot",
              date: "February 2, 2025"
            },
            {
                imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Updhaan-Tapasvi-Varghoda-@-GSP-Banglore-1024x665.png",
                title: "Updhaan Tapasvi Varghoda @ GSP Banglore #jainsim #short #shortsvideo",
                by: "Jyot",
                date: "December 31, 2024"
              },
              {
                  imgSrc: "https://jyot.in/wp-content/uploads/2025/02/GSP-Updhaan-Malaropan-@-Banglore-1024x665.png",
                  title: "GSP Updhaan Malaropan @ Banglore #religion #jainsim #spirituality",
                  by: "Jyot",
                  date: "February 10, 2025"
                },
                {
                  imgSrc: "https://jyot.in/wp-content/uploads/2025/02/Diksharthi-vrushtiben-Na-Gruh-aangane-Pu.-GachchadhipatiShri-1024x576.jpg",
                  title: "Diksharthi vrushtiben Na Gruh aangane Pu. GachchadhipatiShri #jainsim #sprituality #diksha #saiyam",
                  by: "Jyot",
                  date: "February 2, 2025"
                },
      ];

      return (
        <>
        <CategoriesCarousel />
        <Box
          w="100%" 
          maxW="774px" 
          h="auto" 
          border="1px solid #ccc"
          borderRadius="10px"
          overflow="hidden"
          boxShadow="lg"
          p={2}
          m={'10px auto'}
          bg="white"
        >
          <iframe
            width="100%"
            height="400px"
            src="https://www.youtube.com/embed/XKmcFqO1xhY"
            title="Updhaan Tapasvi Varghoda @ GSP Bangalore #jainsim #short #shortsvideo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Box>
            <Box m={'20px auto'} w={"100%"} maxW="774px" >
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'3xl'} >YOU MAY ALSO LIKE</Text>
                <Divider mt={'5px'} mb={'5px'} />
                {releases.map((re)=>(
                    <Box padding={'10px 5px'}>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'md'} color={'gray'} textTransform={'uppercase'} _hover={{color:"orange"}}>
                    <Link href={`/category/${category}/${re.title}`}>{re.title}</Link>
                    </Text>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'sm'} color={'gray'} textTransform={'uppercase'}>by <Link fontWeight={'bold'}>{re.by}</Link></Text>
                <Text fontFamily={'Oswald, sans-serif'} fontSize={'xs'} color={'gray'} textTransform={'uppercase'}>{re.date}</Text>
                <Divider mt={'5px'} mb={'5px'} />
                    </Box>      
                ))}
            </Box>
        
        </>
      );
    }

export default VideoPage;