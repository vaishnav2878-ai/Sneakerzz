
import axiosInstance from "./axiosInstance";

export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data;
};

export const getSingleProduct = async (
  id
) => {
  const response =
    await axiosInstance.get(
      `/products/${id}`
    );
    

  return response.data;
};
export const createProduct = async (productData) => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.post(
    "/products",
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getBrands = async () => {
  const response = await axiosInstance.get("/brands");
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};
export const deleteProduct = async (
  id,
  token
) => {
  const response = await axiosInstance.delete(
    `/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateProduct = async (
  id,
  productData,
  token
) => {
  const response =
    await axiosInstance.put(
      `/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const toggleProductStatus = async (
  id,
  token
) => {
  const response = await axiosInstance.put(
    `/products/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getSuggestions = async (search) => {
  const response = await axiosInstance.get(
    "/products/suggestions",
    {
      params: { search },
    }
  );

  return response.data;
};
export const getOfferProducts = async () => {
  const response = await axiosInstance.get("/products/offers");
  return response.data;
};
export const getBestSellerProducts = async () => {
  const response = await axiosInstance.get("/products/best-sellers");
  return response.data;
};
export const getLatestProducts = async () => {
  const response = await axiosInstance.get("/products/latest");
  return response.data;
};
