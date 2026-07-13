import axiosInstance from "./axiosInstance";

// GET ALL USERS
export const getUsers = async (token) => {
  const response = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// DELETE USER
export const deleteUser = async (id, token) => {
  const response = await axiosInstance.delete(
    `/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
  export const toggleUserStatus = async (
  id,
  token
) => {
  const response = await axiosInstance.put(
    `/users/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );



  return response.data;
};