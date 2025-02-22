import React from "react";
import { Box,Text } from "@chakra-ui/react";
import { Card,CardBody,Link } from "@chakra-ui/react";
import { Image,Stack,Heading } from "@chakra-ui/react";
const PodcastCard = ({imgSrc,title,episodeCount}) => {

    return(
        <>
            <Card borderRadius={'0px'} maxW='sm' transitionDuration="0.3s" cursor={"pointer"} _hover={{boxShadow:"dark-lg"}}>
  <CardBody borderRadius={'0px'}>
    <Image
      src={imgSrc}
      alt='Green double couch with wooden legs'
      background={'black'}
    />
    <Stack mt='6' spacing='3'>
      <Link><Heading size='sm' fontSize={'xl'} fontFamily={'Oswald, sans-serif'}> {title}</Heading></Link>
      <Text fontFamily={'Oswald, sans-serif'} color='gray' fontSize='lg'>
        Episodes: <b>{episodeCount}</b>
      </Text>
    </Stack>
  </CardBody>
</Card>
        </>
    );

}

export default PodcastCard;