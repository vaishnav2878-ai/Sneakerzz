import axiosInstance from "./axiosInstance";

export const addToCart = async (
  cartData,
  token
) => {
  const response =
    await axiosInstance.post(
      "/cart/add",
      cartData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const getCartItems = async (
  token
) => {
  const response =
    await axiosInstance.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  return response.data;
};

export const updateCartItem = async (
  id,
  quantity,
  token
) => {
  const response =
    await axiosInstance.put(
      `/cart/${id}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const deleteCartItem = async (
  id,
  token
) => {
  const response =
    await axiosInstance.delete(
      `/cart/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};