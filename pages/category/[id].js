import { useRouter } from "next/router";
import { Box, Text,Flex,Link,SimpleGrid,Card,CardBody,Stack,Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Navbar from "@/components/index_page_components/Navbar";
import { Tag } from "@chakra-ui/react";
import CategoriesCarousel from "@/components/category_page_components/CategoriesCarousel";
import CategoriesVideosList from "@/components/category_page_components/CategoriesVideosList";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get dynamic ID from URL

  return(
    <>
        <CategoriesCarousel category={id} />
        <CategoriesVideosList category={id} />
    </>
  );

}

export default CategoryPage;