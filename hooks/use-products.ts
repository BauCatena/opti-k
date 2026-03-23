import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeGender, setActiveGender] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "Todos" || product.category === activeCategory;

    const genderMatch =
      activeGender === "Todos" || product.gender === activeGender;

    return categoryMatch && genderMatch;
  });

  return {
    products: filteredProducts,
    setActiveCategory,
    setActiveGender,
    activeCategory,
    activeGender,
    loading,
  };
}