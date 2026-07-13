import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";

function ProductCard({ product }) {
  const { token } = useSelector((state) => state.auth);

  const discount =
    product.discountPrice && product.price
      ? Math.round(
          ((product.price - product.discountPrice) /
            product.price) *
            100
        )
      : 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!token) {
      return alert("Please login first");
    }

    try {
      await addToCart(
        {
          product: product._id,
          size: product.sizes?.[0]?.size,
          quantity: 1,
        },
        token
      );

      alert("Added To Cart");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add cart"
      );
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();

    if (!token) {
      return alert("Please login first");
    }

    try {
      await addToWishlist(product._id, token);

      alert("Added To Wishlist");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Wishlist Error"
      );
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative bg-gray-100 h-32 sm:h-40 md:h-44 overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] md:text-xs px-2 py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}

        {product.newArrival && (
          <span className="absolute top-2 right-2 bg-black text-white text-[10px] md:text-xs px-2 py-1 rounded-full z-10">
            NEW
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-500 hover:text-white transition z-10"
        >
          <Heart size={16} />
        </button>

        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/400x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-500 mb-1">
          {product.brand?.name || "Sneakerzz"}
        </p>

        <h2 className="font-bold text-sm md:text-lg line-clamp-2 min-h-[40px]">
          {product.name}
        </h2>

        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-500 text-xs md:text-sm">
            {"★".repeat(Math.round(product.rating || 0))}
            <span className="text-gray-300">
              {"★".repeat(5 - Math.round(product.rating || 0))}
            </span>
          </span>

          <span className="text-gray-500 text-xs md:text-sm ml-1">
            ({product.numReviews || 0})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg md:text-xl font-bold">
            ₹{product.discountPrice || product.price}
          </span>

          {product.discountPrice && (
            <span className="text-xs md:text-sm text-gray-400 line-through">
              ₹{product.price}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-black text-white py-2 md:py-2.5 rounded-xl text-sm md:text-base font-semibold hover:bg-gray-800 transition"
        >
          Add To Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;