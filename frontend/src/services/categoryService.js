import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const createCategory = async (
  categoryData,
  token
) => {
  const response = await axiosInstance.post(
    "/categories",
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateCategory = async (
  id,
  categoryData,
  token
) => {
  const response = await axiosInstance.put(
    `/categories/${id}`,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteCategory = async (
  id,
  token
) => {
  const response = await axiosInstance.delete(
    `/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const toggleCategoryStatus = async (
  id,
  token
) => {
  const response = await axiosInstance.put(
    `/categories/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};