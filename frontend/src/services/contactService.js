import axiosInstance from "./axiosInstance";

// User - Send Message
export const sendMessage = async (formData) => {
  const response = await axiosInstance.post(
    "/contact",
    formData
  );

  return response.data;
};

// Admin - Get All Messages
export const getContacts = async (token) => {
  const response = await axiosInstance.get("/contact", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Admin - Toggle Read / Unread
export const toggleReadStatus = async (id, token) => {
  const response = await axiosInstance.put(
    `/contact/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Admin - Delete Message
export const deleteContact = async (id, token) => {
  const response = await axiosInstance.delete(
    `/contact/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};