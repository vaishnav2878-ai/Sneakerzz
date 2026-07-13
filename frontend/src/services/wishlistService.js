import axiosInstance from "./axiosInstance";

export const addToWishlist = async (
  product,
  token
) => {
  const response =
    await axiosInstance.post(
      "/wishlist/add",
      { product },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getWishlist = async (
  token
) => {
  const response =
    await axiosInstance.get(
      "/wishlist",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const removeWishlistItem =
  async (id, token) => {
    const response =
      await axiosInstance.delete(
        `/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };