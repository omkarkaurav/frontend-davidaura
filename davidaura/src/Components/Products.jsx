// src/pages/Products.js
import React, { useContext } from "react";
import { ProductContext } from "../contexts/productContext"; // Using global product data
import WishlistImage from "../assets/wishlist-svgrepo-com.svg"; // Default Wishlist Icon
import WishlistFilledImage from "../assets/wishlist-svgrepo-com copy.svg"; // Filled Wishlist Icon
import CartImage from "../assets/cart-svgrepo-com copy.svg";

const Products = ({ cart, setCart, wishlist, setWishlist }) => {
  // Get the products list from context
  const { products } = useContext(ProductContext);

  const toggleCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        // Remove item if already in cart
        return prevCart.filter((item) => item.name !== product.name);
      } else {
        // Add item to cart
        return [
          ...prevCart,
          {
            ...product,
            dprice: Math.trunc(product.oprice - (product.oprice * product.discount) / 100),
            quantity: 1,
          },
        ];
      }
    });
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.some((item) => item.name === product.name)
        ? prevWishlist.filter((item) => item.name !== product.name)
        : [...prevWishlist, product]
    );
  };

  return (
    <section className="py-10 flex flex-col items-center">
      <div className="w-full flex flex-wrap justify-center gap-8 px-6">
        {products.map((product, index) => {
          const discountedPrice = Math.trunc(
            product.oprice - (product.oprice * product.discount) / 100
          );
          const inCart = cart.some((item) => item.name === product.name);
          const inWishlist = wishlist.some((item) => item.name === product.name);

          return (
            <div
              key={index}
              className="relative w-72 h-96 flex flex-col items-center gap-2 p-12 rounded-xl overflow-hidden shadow-lg bg-white"
            >
              {/* Product Image */}
              <img className="w-72 h-64 object-cover" src={product.img} alt={product.name} />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 p-2 rounded-full transition"
              >
                <img
                  src={inWishlist ? WishlistFilledImage : WishlistImage}
                  alt="wishlist"
                  className="w-10 h-10"
                />
              </button>

              {/* Product Title & Size */}
              <div className="w-9/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-gray-700 font-medium">{product.size} ml</span>
              </div>

              {/* Pricing */}
              <div className="w-9/10 flex justify-between items-center">
                <span className="flex justify-between gap-4 items-center">
                  <span className="text-lg font-bold text-black">₹{discountedPrice}</span>
                  <span className="text-sm text-gray-400 line-through">(₹{product.oprice})</span>
                </span>
                <span className="text-blue-700 font-semibold">{product.discount}% Off</span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => toggleCart(product)}
                className={`w-full py-2 text-lg font-semibold flex items-center justify-center gap-2 transition ${
                  inCart ? "bg-black text-white" : "bg-black text-white"
                }`}
              >
                {inCart ? "Remove from Cart" : "Add to Cart"}
                <img src={CartImage} alt="Cart" className="w-8 h-8" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
