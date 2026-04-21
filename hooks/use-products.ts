import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  gender: string;
  price: number;
  image: string;
};

type FilterOption = {
  value: string;
  count: number;
};

type FilterGroups = {
  categoria: FilterOption[];
  genero: FilterOption[];
};

const ALL_FILTER = "Todos";

const buildFilterGroup = (values: string[]): FilterOption[] => {
  const counts = values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));
};

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState(ALL_FILTER);
  const [activeGender, setActiveGender] = useState(ALL_FILTER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filterGroups = useMemo<FilterGroups>(() => {
    return {
      categoria: buildFilterGroup(allProducts.map((product) => product.category)),
      genero: buildFilterGroup(allProducts.map((product) => product.gender)),
    };
  }, [allProducts]);

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch =
      activeCategory === ALL_FILTER || product.category === activeCategory;

    const genderMatch =
      activeGender === ALL_FILTER || product.gender === activeGender;

    return categoryMatch && genderMatch;
  });

  return {
    products: filteredProducts,
    filterGroups,
    setActiveCategory,
    setActiveGender,
    activeCategory,
    activeGender,
    loading,
  };
}