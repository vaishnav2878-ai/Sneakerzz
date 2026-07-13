import axiosInstance from "./axiosInstance";

export const getAddresses = async (
  token
) => {
  const response =
    await axiosInstance.get(
      "/address",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const createAddress =
  async (
    addressData,
    token
  ) => {
    const response =
      await axiosInstance.post(
        "/address",
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };