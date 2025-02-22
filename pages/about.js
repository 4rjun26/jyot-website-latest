import React from "react";
import { Box,Text,Flex } from "@chakra-ui/react";

export default function AboutJyot() {

    return(
        <>
            <Box w={'100%'} m={'10px auto'} maxW={'1000px'} p={'4'}>
                <Text
                fontWeight={'bold'}
                margin={'auto'}
                 fontFamily={'Oswald, sans-serif'}
                 fontSize={'3xl'}
                >“JYOT IS A PERFECT BLEND OF SCIENTIFIC TEMPERAMENT & RELIGIOUS KNOWLEDGE SYSTEM FOR ALL AGE GROUPS, BELIEFS & LEVELS OF INTELLECT.”</Text>
                <Text mt={'10px'}>
                “Knowledge is power.” “Knowledge is the fuel that drives life.” “It’s the knowledge age.” “It’s all about knowledge.”

These slogans highlight the immense importance of knowledge in our lives. Knowledge truly knows no bounds. Every day, we consciously or subconsciously learn new things. But have we ever considered the true nature of this knowledge? How much of what we learn actually becomes useful to us?

Surprisingly, perhaps not even 10%. When the knowledge we acquire isn’t useful, it becomes a burden. 

Thus, it is rightly said that the knowledge of ‘knowledge’ itself can become the world’s knowledge. For many, ‘knowledge,’ the introducer to the world, remains unknown.

At Jyot, we strive to provide the best of knowledge to help one’s inner vision grow and to guide one’s internal journey in the right direction.

Jyot is a magnanimous effort to create a spiritual revolution within the next generation, shaping them into responsible human beings.
</Text>         
            </Box>
            <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={'10px'} w={'100%'}>
            <Text
                fontWeight={'bold'}
                 fontFamily={'Oswald, sans-serif'}
                 fontSize={'3xl'}
                >
                    THE FUNDAMENTALS OF JYOT
                </Text>
                <Box w={'10%'} h={'5px'} m={'10px 0px'} bg={'brown'}>

                </Box>
                </Flex>
        </>
    );

}