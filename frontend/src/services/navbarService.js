import { getCartItems } from "./cartService";
import { getWishlist } from "./wishlistService";

export const getNavbarCounts = async (token) => {
  const cart = await getCartItems(token);
  const wishlist = await getWishlist(token);

  console.log("========== NAVBAR ==========");
  console.log("Cart Response:", cart);
  console.log("Wishlist Response:", wishlist);

  return {
    cartCount: cart.cartItems?.length || 0,
    wishlistCount: wishlist.wishlistItems?.length || 0,
  };
};