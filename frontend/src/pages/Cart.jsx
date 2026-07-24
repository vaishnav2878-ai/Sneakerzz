import EmptyState from "../components/EmptyState";

import emptyCart from "../assets/images/empty-cart.png";


import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../services/cartService";


function Cart() {
  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
     const Navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const data =
        await getCartItems(token);

      setCartItems(
        data.cartItems
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadCart = async () => {
    await fetchCart();
  };

  loadCart();
}, []);

  const increaseQty = async (
    id,
    qty
  ) => {
    try {
      await updateCartItem(
        id,
        qty + 1,
        token
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (
    id,
    qty
  ) => {
    if (qty <= 1) return;

    try {
      await updateCartItem(
        id,
        qty - 1,
        token
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (
    id
  ) => {
    try {
      await deleteCartItem(
        id,
        token
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.product
          ?.discountPrice *
          item.quantity,
      0
    );

  if (loading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }
  

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">


{cartItems.length === 0 ? (
  <EmptyState
    image={emptyCart}
    link="/products"
  />
) : (
        <>
          {cartItems.map((item) => (
  <div
    key={item._id}
    className="bg-white shadow rounded-xl p-4 mb-4"
  >
    <div className="flex flex-col sm:flex-row gap-4">

      {/* Product Image */}
      <img
        src={item.product?.images?.[0]}
        alt={item.product?.name}
        className="w-28 h-28 sm:w-24 sm:h-24 mx-auto sm:mx-0 object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="flex-1">

        <h2 className="font-bold text-lg sm:text-xl leading-tight">
          {item.product?.name}
        </h2>

        <p className="text-gray-600 mt-1">
          Size: {item.size}
        </p>

        <p className="font-bold text-lg mt-1">
          ₹{item.product?.discountPrice}
        </p>

        {/* Quantity + Remove */}
        <div className="flex flex-wrap items-center gap-2 mt-4">

          <button
            onClick={() =>
              decreaseQty(item._id, item.quantity)
            }
            className="w-9 h-9 rounded bg-gray-200"
          >
            -
          </button>

          <span className="font-semibold px-2">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increaseQty(item._id, item.quantity)
            }
            className="w-9 h-9 rounded bg-gray-200"
          >
            +
          </button>

          <button
            onClick={() => removeItem(item._id)}
            className="sm:ml-auto bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Remove
          </button>

        </div>

      </div>

    </div>
  </div>
))}
          <div className="bg-white shadow rounded p-6 mt-6">

            <h2 className="text-2xl font-bold">
              Total: ₹
              {totalPrice}
            </h2>

                     <button
              onClick={() =>
                Navigate("/checkout")
              }
              className="mt-4 bg-black text-white px-6 py-3 rounded"
            >
              Proceed To Checkout
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
