import React from "react";
import { useRouter } from "next/router";
import CategoriesVideosList from "@/components/category_page_components/CategoriesVideosList";
import { useState,useEffect } from "react";

const CategoryPage = () => {
  const router = useRouter();
  const [contentTypes,setContentTypes]=useState([]);
  const { id } = router.query; // Get dynamic ID from URL
        const [loading, setLoading] = useState(false); // Loading state
  

  const fetchContentTypes = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/get_content_type_of_category?category_slug=${id}`, {
        headers: {
          "Authorization": `Bearer fr9iFhQWPB3jjxh8D4pNKmyJUeEbKTf2Zgw7QJK0`,
        },
      });
  
      const data = await res.json();
  
      setContentTypes(data)
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    finally{
    setLoading(false);
    }
  };

     useEffect(() => {
      fetchContentTypes();
        }, [id]);

  return(
    <>
        <CategoriesVideosList category={id} contentTypes={contentTypes} />
    </>
  );

}

export default CategoryPage;