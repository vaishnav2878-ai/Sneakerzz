import axiosInstance from "./axiosInstance";

export const createOrder = async (
  addressId,
  token
) => {
  const response =
    await axiosInstance.post(
      "/orders",
      { addressId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getMyOrders = async (
  token
) => {
  const response =
    await axiosInstance.get(
      "/orders/my-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
  return response.data;
};
export const getSingleOrder = async (
  id,
  token
) => {
  const response =
    await axiosInstance.get(
      `/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const cancelOrder = async (
  id,
  token
) => {
  const response =
    await axiosInstance.put(
      `/orders/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getAllOrders = async (token) => {
  const response = await axiosInstance.get(
    "/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus =
  async (
    id,
    status,
    token
  ) => {
    const response =
      await axiosInstance.put(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };