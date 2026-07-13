import axiosInstance from "./axiosInstance";

export const getDashboardStats = async (token) => {
  const response = await axiosInstance.get(
    "/dashboard/stats",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
// Recent Orders
export const getRecentOrders = async (token) => {
  const response = await axiosInstance.get(
    "/dashboard/recent-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Low Stock Products
export const getLowStockProducts = async (token) => {
  const response = await axiosInstance.get(
    "/dashboard/low-stock",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};