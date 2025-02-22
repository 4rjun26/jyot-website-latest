import React from "react";
import { Box,Text } from "@chakra-ui/react";
const SectionTitle = ({text}) => {

    return(
        <>
            <Box pl={'10px'} mt={"30px"} h={"50px"}>
                <Text fontSize={"35px"}  borderBottom={"7px solid brown"} w={'fit-content'} textTransform={"uppercase"} fontFamily={'Oswald, sans-serif'} color="black">
                    {text}
                </Text>
            </Box>
        </>
    );

}

export default SectionTitle;