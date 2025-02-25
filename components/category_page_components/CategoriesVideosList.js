import React from "react";
import { Box,SimpleGrid,Flex,Image,Text,Link } from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";

const CategoriesVideosList = ({category})=>{
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

    return(
        <>
            <Box w={'full'} p={4}>
                <SimpleGrid columns={{ base: 1, sm: 2, lg:3 }} spacing={4}>
                {releases.map((res,index)=>(
                    <Box key={index} borderRadius={'15px'} m={'auto'} w={'full'} h={{md:"450px"}} minH={{ md: "450px" }}  border={'1px solid gray'}>
                        <Box w={'full'} h={'70%'} bg={'black'} borderRadius={'15px'}>
                            <Link href={`/category/${category}/${res.title}`}><Image borderRadius={'15px 15px 0px 0px'} src={res.imgSrc} w={'full'} _hover={{boxShadow:"dark-lg"}} h={'full'} objectFit={'cover'} transitionDuration={'0.3s'} /></Link>
                        </Box>
                        <Box p={'5px'} w={'full'} h={'30%'}>
                            <Text fontSize={'large'} fontFamily={'Oswald, sans-serif'}>{res.title}</Text>
                            <Text bg={'orange'} w={'fit-content'} p={'3px 10px'} borderRadius={'10px'} display={'flex'} gap={'5px'} alignItems={'center'} mt={'5px'} fontSize={'md'} fontFamily={'Oswald, sans-serif'}><MdPerson /> 
                            <Link color={'black'} href="#">{res.by}</Link>
                            </Text>
                            <Text border={'2px solid orange'} w={'fit-content'} p={'3px 10px'} borderRadius={'10px'} display={'flex'} gap={'5px'} alignItems={'center'} mt={'5px'} fontSize={'sm'} fontFamily={'Oswald, sans-serif'}><MdCalendarMonth /> 
                           {res.date}
                            </Text>
                        </Box>
                    </Box>
                ))}
                </SimpleGrid>
            </Box>
        </>
    );
}

export default CategoriesVideosList;