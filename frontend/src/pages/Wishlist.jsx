import { useEffect, useState } from "react";

import {
  getWishlist,
  removeWishlistItem,
} from "../services/wishlistService";

function Wishlist() {
  const [wishlistItems, setWishlistItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchWishlist = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const data =
        await getWishlist(token);

      setWishlistItems(
        data.wishlistItems
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await removeWishlistItem(
        id,
        token
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6">
      My Wishlist
    </h1>

    {wishlistItems.length === 0 ? (
      <h2>Wishlist Empty</h2>
    ) : (
      wishlistItems.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow p-4 mb-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">

            {/* Product Image */}
            <img
              src={item.product?.images?.[0]}
              alt={item.product?.name}
              className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-lg"
            />

            {/* Product Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-lg sm:text-xl leading-tight">
                {item.product?.name}
              </h2>

              <p className="text-orange-500 font-semibold text-lg mt-2">
                ₹{item.product?.discountPrice}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item._id)}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
            >
              Remove
            </button>

          </div>
        </div>
      ))
    )}
  </div>
);

}

export default Wishlist;