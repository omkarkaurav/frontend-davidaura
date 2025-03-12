// src/contexts/ProductContext.js
import React, { createContext, useState, useEffect } from "react";
import ProductImage from "../assets/images/mockup-empty-perfume-bottle-perfume-brand-design_826454-355-removebg-preview.png";

const initialProducts = [
  { id: 1, name: "Attractive", oprice: 1999, size: 100, discount: 65, img: ProductImage },
  { id: 2, name: "Desire", oprice: 1999, size: 100, discount: 65, img: ProductImage },
  { id: 3, name: "Heaven", oprice: 1999, size: 100, discount: 65, img: ProductImage },
  { id: 4, name: "Wild", oprice: 1999, size: 100, discount: 65, img: ProductImage },
];

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    // Optionally load products from localStorage if available
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
