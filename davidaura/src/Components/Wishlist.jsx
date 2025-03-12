import "../style/wishlist.css";

const Wishlist = ({ wishlist, setWishlist, cart, setCart }) => {
    const moveToCart = (index) => {
        const item = wishlist[index]; // Get the item from wishlist
        if (!item) return;
    
        setCart((prevCart) => {
            // If cart is empty, directly add the item
            if (prevCart.length === 0) {
                return [{ ...item, quantity: 1 }];
            }
    
            // Check if the item already exists in the cart
            const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
    
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.name === item.name
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    
        // Remove from wishlist after updating the cart
        setWishlist((prevWishlist) => prevWishlist.filter((_, i) => i !== index));
    };
    
    

    const removeWishlistItem = (index) => {
        setWishlist((prevWishlist) => prevWishlist.filter((_, i) => i !== index));
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <div>
            <h2 className="w-title">MY WISHLIST</h2>
            <div id="wishlist-container">
                <div id="wishlist-items">
                    {wishlist.length === 0 ? (
                        <div id="empty-wishlist-message" style={{ color: "black" }}>
                            Your Wishlist is empty.
                        </div>
                    ) : (
                        wishlist.map((item, index) => {
                            const discountedPrice = Math.trunc(
                                item.oprice - (item.oprice * item.discount) / 100
                            );
                            return (
                                <div key={item.id} className="wishlist-item">
                                    <img src={item.img} alt={item.name} />
                                    <div className="item-title">
                                        <h3>{item.name}</h3>
                                        <span style={{ fontWeight: 100, fontSize: "1rem" }}>{item.size}ml</span>
                                    </div>
                                    <div className="item-price">
                                        <span>
                                            <strong style={{ color: "green" }}>₹{discountedPrice}</strong>
                                            <del style={{ color: "lightgray" }}>₹{item.oprice}</del>
                                        </span>
                                        <span style={{ color: "blue" }}>{item.discount}% Off</span>
                                    </div>
                                    <button className="move-to-cart" onClick={() => moveToCart(index)}>
                                        Move to Cart
                                    </button>
                                    <button className="remove-wishlist" onClick={() => removeWishlistItem(index)}>
                                        Remove
                                    </button>
                                </div>
                            );
                        })
                    )}
                    {wishlist.length > 0 && (
                        <button id="clear-wishlist" onClick={clearWishlist}>
                            Clear Wishlist
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
