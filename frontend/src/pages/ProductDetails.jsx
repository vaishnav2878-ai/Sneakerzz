import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getSingleProduct } from "../services/productService";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import {
  addReview,
  updateReview,
  deleteReview,
} from "../services/reviewService";

function ProductDetails() {
  const { id } = useParams();

  const { token } = useSelector(
    (state) => state.auth
  );

  const [product, setProduct] =
    useState(null);


  const [loading, setLoading] =
    useState(true);

  const [selectedSize, setSelectedSize] =
    useState(null);
    const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const { user } = useSelector((state) => state.auth);

const myReview = product?.reviews?.find(
  (review) => review.user?.toString() === user?._id
);
useEffect(() => {
  if (myReview) {
    setRating(myReview.rating);
    setComment(myReview.comment);
  }
}, [myReview]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data =
          await getSingleProduct(id);

        setProduct(data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      return alert(
        "Please select a size"
      );
    }

    try {
      const data = await addToCart(
        {
          product: product._id,
          size: selectedSize,
          quantity: 1,
        },
        token
      );

      alert(data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed To Add Cart"
      );
    }
  };

  const handleWishlist = async () => {
  console.log("Wishlist clicked");
  console.log("Product ID:", product._id);
  console.log("Token:", token);

  try {
    const data = await addToWishlist(
      product._id,
      token
    );

    console.log(data);

    alert("Added To Wishlist");
  } catch (error) {
    console.log("Wishlist Error:", error);
    console.log(
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Wishlist Error"
    );
  }
};
const handleSubmitReview = async () => {
  if (!token) {
    return alert("Please login first");
  }

  if (!rating || !comment) {
    return alert("Please give rating and comment");
  }

  try {
    await addReview(
      product._id,
      {
        rating,
        comment,
      },
      token
    );

    alert("Review Added");

    const data = await getSingleProduct(id);
    setProduct(data.product);

    setRating(0);
    setComment("");
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Review Failed"
    );
  }
};
const handleUpdateReview = async () => {
  try {
    await updateReview(
      product._id,
      {
        rating,
        comment,
      },
      token
    );

    alert("Review Updated");

    const data = await getSingleProduct(id);
    setProduct(data.product);
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Update Failed"
    );
  }
};
const handleDeleteReview = async () => {
  if (!window.confirm("Delete your review?")) {
    return;
  }

  try {
    await deleteReview(product._id, token);

    alert("Review Deleted");

    const data = await getSingleProduct(id);

    setProduct(data.product);

    setRating(0);
    setComment("");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );
  }
};
  if (loading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  if (!product) {
    return (
      <h1 className="text-center mt-10">
        Product Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        <div className="flex justify-center">
  {product.images?.length > 0 ? (
    <img
      src={product.images[0]}
      alt={product.name}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-lg object-contain"
    />
  ) : (
            <div className="h-96 bg-gray-200 rounded flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        <div>
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {product.name}
          </h1>
<div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 text-gray-600 text-sm sm:text-base">
  <p>
    <span className="font-semibold">Brand:</span>{" "}
    {product.brand?.name}
  </p>

  <p>
    <span className="font-semibold">Category:</span>{" "}
    {product.category?.name}
  </p>
</div>
<p className="text-xl sm:text-2xl font-bold text-orange-500 mb-4">
            ₹{product.discountPrice}
          </p>

<p className="text-gray-600 text-sm sm:text-base leading-7 mb-6">
            {product.description}
          </p>

          <h3 className="font-semibold mb-3">
  Select Size
</h3>

<div className="flex flex-wrap gap-3 mb-6">
  {product.sizes?.map((item) => (
    <button
      key={item.size}
      onClick={() => setSelectedSize(item.size)}
      className={`px-4 py-2 min-w-[55px] border rounded-lg transition ${
        selectedSize === item.size
          ? "bg-black text-white"
          : "hover:bg-gray-100"
      }`}
    >
      {item.size}
    </button>
  ))}
</div>

          <div className="flex flex-col sm:flex-row gap-3">
  <button
    onClick={handleAddToCart}
    className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-xl"
  >
    Add To Cart
  </button>

  <button
    onClick={handleWishlist}
    className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded-xl"
  >
    Wishlist
  </button>
</div>
          <hr className="my-8" />
          <div className="bg-gray-100 rounded-2xl p-6 mb-8">

  <h2 className="text-3xl font-bold">
{(product.rating || 0).toFixed(1)}  </h2>

  <div className="text-yellow-500 text-lg mt-2">
    {"★".repeat(Math.round(product.rating))}
    {"☆".repeat(
      5 - Math.round(product.rating)
    )}
  </div>

  <p className="text-gray-500 mt-2">
    Based on {product.numReviews} Reviews
  </p>

</div>
<h2 className="text-3xl font-bold mb-6">
  Customer Reviews
</h2>


<div className="flex gap-2 mb-6">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      type="button"
      onClick={() => setRating(star)}
      className={`text-2xl transition-all duration-200 hover:scale-110 ${
        star <= rating
          ? "text-yellow-400"
          : "text-gray-300"
      }`}
    >
      ★
    </button>
  ))}
</div>
  

</div>

<textarea
  rows="4"
  placeholder="Write your review..."
  value={comment}
  onChange={(e) => setComment(e.target.value)}
className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none mb-5"/>

{myReview ? (
  <div className="flex gap-4">
    <button
      onClick={handleUpdateReview}
   className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition" >
      Update Review
    </button>

    <button
      onClick={handleDeleteReview}
 className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"   >
      Delete Review
    </button>
  </div>
) : (
  <button
  onClick={handleSubmitReview}
  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition w-fit"
>
  Submit Review
</button>
)}
<div className="mt-8">
  {product.reviews?.length === 0 ? (
    <p>No Reviews Yet</p>
  ) : (
    product.reviews.map((review, index) => (
      <div
  key={index}
  className="bg-white rounded-2xl shadow-md p-6 mb-5 border"
>
  <div className="flex justify-between items-center">

    <div>
      <h3 className="font-bold text-lg">
        {review.name}
      </h3>

      <p className="text-yellow-500 text-base">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </p>
    </div>

    <span className="text-gray-400 text-sm">
      Verified Buyer
    </span>

  </div>

  <p className="text-gray-600 mt-4 leading-7">
    {review.comment}
  </p>
</div>
    ))
  )}
</div>
        </div>

      </div>
    
  );
}

export default ProductDetails;