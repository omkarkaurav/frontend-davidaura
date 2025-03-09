import React from "react";
import ProductImage from "../assets/images/mockup-empty-perfume-bottle-perfume-brand-design_826454-355-removebg-preview.png";
import WishlistImage from "../assets/wishlist-svgrepo-com.svg";
import CartImage from "../assets/cart-svgrepo-com copy.svg";

const products = [
  { name: "Attractive", oprice: 1999, size: 100, discount: 65, img: ProductImage },
  { name: "Desire", oprice: 1999, size: 100, discount: 65, img: ProductImage },
  { name: "Heaven", oprice: 1999, size: 100, discount: 65, img: ProductImage },
  { name: "Wild", oprice: 1999, size: 100, discount: 65, img: ProductImage },
];

const Products = () => {
  const toggleCartItem = (product) => {
    console.log(`Added to cart: ${product.name}`);
  };

  const addToWishlist = (product) => {
    console.log(`Added to wishlist: ${product.name}`);
  };

  return (
    <section className="py-10 flex flex-col items-center">
      <div className="w-full flex flex-wrap justify-center gap-8 px-6">
        {products.map((product, index) => {
          const discountedPrice = Math.trunc(product.oprice - (product.oprice * product.discount) / 100);

          return (
            <div
              key={index}
              className="relative w-72 h-96 flex flex-col items-center gap-2 p-12 rounded-xl overflow-hidden shadow-lg bg-white"
            >
              {/* Product Image */}
              <img className="w-72 h-64 object-cover" src={product.img} alt={product.name} />

              {/* Wishlist Button */}
              <button
                onClick={() => addToWishlist(product)}
                className=" absolute top-2 right-2  p-2 "
              >
                <img src={WishlistImage} alt="wishlist" className="w-10 h-10" />
              </button>

              {/* Product Title & Size */}
              <div className=" w-9/10 flex justify-between items-center">
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
                onClick={() => toggleCartItem(product)}
                className="w-full h-full py-2  bg-black text-white text-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition"
              >
                Add to Cart
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

