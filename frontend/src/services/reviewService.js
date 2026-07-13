import axiosInstance from "./axiosInstance";

export const addReview = async (
  productId,
  review,
  token
) => {
  const response = await axiosInstance.post(
    `/products/${productId}/reviews`,
    review,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateReview = async (
  productId,
  review,
  token
) => {
  const response = await axiosInstance.put(
    `/products/${productId}/reviews`,
    review,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteReview = async (
  productId,
  token
) => {
  const response = await axiosInstance.delete(
    `/products/${productId}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};