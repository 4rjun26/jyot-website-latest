import { useRouter } from "next/router";
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