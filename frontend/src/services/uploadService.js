import axiosInstance from "./axiosInstance";

export const uploadImage = async (image, token) => {
  console.log("BASE URL:", axiosInstance.defaults.baseURL);
  console.log("UPLOAD TOKEN:", token);

  const formData = new FormData();
  formData.append("image", image);

  const response = await axiosInstance.post(
    "/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};