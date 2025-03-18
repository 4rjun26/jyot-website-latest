import React from "react";
import { Box,Text } from "@chakra-ui/react";
import { Card,CardBody } from "@chakra-ui/react";
import { Image,Stack,Heading } from "@chakra-ui/react";
import Link from "next/link";
const PodcastCard = ({imgSrc,title,slug,published_date}) => {

    return(
        <>
           <Link href={`/${slug}`}><Card borderRadius={'0px'} maxW='sm' transitionDuration="0.3s" cursor={"pointer"} _hover={{boxShadow:"dark-lg"}}>
  <CardBody borderRadius={'0px'}>
    <Image alt="sample"
      src={imgSrc}
      background={'black'}
    />
    <Stack mt='6' spacing='3'>
      <Link href={'#'}><Heading size='sm' fontSize={'xl'} fontFamily={'Oswald, sans-serif'}> {title}</Heading></Link>
      <Text fontFamily={'Oswald, sans-serif'} color='gray' fontSize='lg'>
         <b>{published_date.substring(0,10)}</b>
      </Text>
    </Stack>
  </CardBody>
</Card>
</Link>
        </>
    );

}

export default PodcastCard;