import React from "react";
import { Box,Text,Flex,Image } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";

export default function AboutJyot() {

    const arr=[
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/narendra-modi.jpg",
        name:"Narendra Modi",
        title:"(Prime Minister, India)",
        phrase:"I appreciate Team JYOT & Pandit Maharaja,for connecting our faith and traditions with knowledge stream which enlightens the true journey of life. (on Jyot Exhibit)."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/manish-mokshagundam.jpg",
        name:"Dr. Manish Mokshagundam",
        title:"(Lead Faculty – NDTV)",
        phrase:"Such an educational and value based movie should be screened across various educational institutions."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/T.-Chandrashekar.jpg",
        name:"T. Chandrashekar",
        title:"(Principal, Oxford B.Ed. College)",
        phrase:"This movie will ignite your thinking to know yourself and then the evolution will begin."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Dr.-Chenraj-Jain.jpg",
        name:"Dr. Chenraj Jain",
        title:"(Chariman, JGI)",
        phrase:"It’s the universal happiness within that you really need to experience. This movie will appeal youngsters to a great extent."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Nirmal-Surana.jpg",
        name:"Nirmal Surana",
        title:"(Karnataka State Secretary – BJP)",
        phrase:"Working with team JYOT has taken my confidence to the next level."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Rajesh-Khatri.jpg",
        name:"Rajesh Khatri",
        title:"(Actor)",
        phrase:"For me “Ek Cheez…” has been a beautiful Experience, Soul Stirring, Mind Boggling, Heart Touching. Overall Brilliant. Wonderful !!"
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Rahul-Kapoor-Jain.jpg",
        name:"Rahul Kapoor Jain",
        title:"(Entrepreneur, Speaker and Author)",
        phrase:"ECMW is a unique initiative to scientifically and logically explain the concept of true, complete and never ending happiness in a form of a movie."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Nimesh-Kampani.jpg",
        name:"Nimesh Kampani",
        title:"(Chairman, JM Financial Ltd.)",
        phrase:"Even an aethist with open mind will start believing in existence of the soul after watching this movie."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Professor-Humpanna.jpg",
        name:"Professor Humpanna",
        title:"(Scholar)",
        phrase:"ECMW is a unique initiative to scientifically and logically explain the concept of true, complete and never ending happiness in a form of a movie."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Sheetal-Shah.jpg",
        name:"Sheetal Shah",
        title:"(Mrs. Gujrati, Bangalore)",
        phrase:"It’s a real good eye opener for everyone. The message should spread across the globe."
        },
        {
        imgSrc:"https://jyot.in/wp-content/uploads/2022/09/Gautam-Shah.jpg",
        name:"Gautam Shah",
        title:"(Film Distributor)",
        phrase:"Hats off to the man, whose brain has gone into conceptualising this movie. This movie deserves an Oscar."
        },
    ]

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
                <Box w={'10%'} h={'5px'} m={'10px 0px'} bg={'brown'}></Box>
                </Flex>
  <SimpleGrid p={4} columns={{ base: 1, sm: 1, lg:3 }} spacing={4}>
        <Box h={'200px'}>
            <Image alt="sample" 
            src="https://jyot.in/wp-content/uploads/2022/09/Jyot-Icon-Universal-Truth.gif" 
            w={'full'}
            h={'full'}
            objectFit={'contain'}
            />
        </Box>
        <Box h={'200px'}>
        <Image alt="sample" 
            src="https://jyot.in/wp-content/uploads/2022/09/Jyot-Icon-Justice.gif" 
            w={'full'}
            h={'full'}
            objectFit={'contain'}
            />
</Box>
<Box h={'200px'}>
<Image alt="sample" 
            src="https://jyot.in/wp-content/uploads/2022/09/Jyot-Icon-Right-to-Live.gif" 
            w={'full'}
            h={'full'}
            objectFit={'contain'}
            />
</Box>
      </SimpleGrid>

      <SimpleGrid bg={'gray.100'} p={4} columns={{ base: 1, sm: 1, lg:3 }} spacing={4}>
        <Box p={'20px'}>
           <Text fontWeight={'bold'} display={'block'} mt={'10%'} w={'full'} fontSize={'2xl'}   fontFamily={'Oswald, sans-serif'}>ESTABLISHED IN</Text>
           
           <Text fontWeight={'bold'} fontSize={'7xl'} display={'block'} w={'full'} fontFamily={'Oswald, sans-serif'}>2009</Text>
        </Box>
        <Box p={'20px'}>
        <Text fontSize={'md'} color={'gray.600'}>
        Established in 2009 by perfect blend of youngsters & experienced, Jyot’s aim is to spread nectar of knowledge, to help an individual enrich his thoughts, on the way of him becoming a responsible human being… thereby ensuring overall development of individual and world at large. Brainchild of the visionary H.H.Jainacharya Yugbhushansuriji, a connoisseur & master in many fields i.e. Religious scriptures, science, astronomy, politics, international politics, has mentored this organization enabling it to reach new heights.

        </Text>
</Box>
<Box p={'20px'}>
<Text fontSize={'md'} color={'gray.600'}>
Jyot is carried forward under able management team of (Jaxeshbhai, Sidhhartbhai, Himanshubhai, Lajeshbhai) with these leadership Jyot successfully organized and executed events which touched everyone from layman to top dignitaries including current Prime Minister Mr Narendra Modi, business typhoons like Gautam Adani, religious head like shri Morarjibapu.
<br /><br />
We welcome you to be a part of Jyot community and make an effort to enlighten ‘Jyot’ within you!
        </Text>
</Box>
      </SimpleGrid>

      <SimpleGrid p={4} columns={{ base: 1, sm: 1, lg:2 }} spacing={4}>
        <Box>
        <Box p={'20px'} m={'auto'}>
            <Image alt="sample" m={'auto'} src="https://jyot.in/wp-content/uploads/2022/09/eye.png" />
        </Box>
        <Text fontWeight={'bold'} fontSize={'3xl'} fontFamily={'Oswald, sans-serif'} w={'full'} textAlign={'center'}>VISION</Text>
        <Text p={'0px 100px'} fontSize={'md'} w={'full'} textAlign={'center'}>
        At Jyot, we believe that to change a person’s life, It is of paramount importance that the way he thinks is changed. The path to know the true knowledge starts with the quest & curiosity to know & accept it. Once a person is empowered through this right vision, the path to true happiness is discovered.
        </Text>

        </Box>

        <Box p={'20px'}>
        <Box p={'20px'} m={'auto'}>
            <Image alt="sample" m={'auto'} src="https://jyot.in/wp-content/uploads/2022/09/mission-1.png" />
        </Box>
        <Text fontWeight={'bold'} fontSize={'3xl'} fontFamily={'Oswald, sans-serif'} w={'full'} textAlign={'center'}>MISSION</Text>
        <Text p={'0px 100px'} fontSize={'md'} w={'full'} textAlign={'center'}>
        Our mission is to spread this invaluable knowledge, Heritage and Culture benefiting the future generations helping them to become responsible citizens who can themselves find the Right Path to improve their lives with this magnificent intrinsic knowledge.
        </Text>
       
       
</Box>
      </SimpleGrid>

      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={'10px'} w={'100%'}>
            <Text
                fontWeight={'bold'}
                 fontFamily={'Oswald, sans-serif'}
                 fontSize={'3xl'}
                >
                    WHAT PEOPLE SAY
                </Text>
                <Box w={'10%'} h={'5px'} m={'10px 0px'} bg={'brown'}></Box>
                </Flex>

    <SimpleGrid p={4} columns={{ base: 1, sm: 1, lg:3 }} spacing={4}>
    {arr.map((ar,index)=>(

<Box key={index} border={'1px solid lightgray'} p={'4'} borderRadius={'10px'} transitionDuration={'0.3s'} _hover={{boxShadow:"lg"}}>
<Box p={'10px'} m={'auto'}>
    <Image alt="sample" m={'auto'} src={ar.imgSrc} />
</Box>
<Text fontSize={'3xl'} fontFamily={'Oswald, sans-serif'} w={'full'} textAlign={'center'}>{ar.name}</Text>
<Text fontSize={'lg'} mb={'5px'} fontWeight={'bold'} color={'gray'} w={'full'} textAlign={'center'}>{ar.title}</Text>
<Text fontSize={'16.5px'} color={'gray'} w={'full'} textAlign={'center'}>
{ar.phrase}
</Text>

</Box>
    ))}
    </SimpleGrid>

        </>
    );

}