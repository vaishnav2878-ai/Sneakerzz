import axiosInstance from "./axiosInstance";

export const getBrands = async () => {
  const response = await axiosInstance.get("/brands");
  return response.data;
};

export const createBrand = async (brandData, token) => {
  const response = await axiosInstance.post(
    "/brands",
    brandData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateBrand = async (
  id,
  brandData,
  token
) => {
  const response = await axiosInstance.put(
    `/brands/${id}`,
    brandData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteBrand = async (
  id,
  token
) => {
  const response = await axiosInstance.delete(
    `/brands/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};