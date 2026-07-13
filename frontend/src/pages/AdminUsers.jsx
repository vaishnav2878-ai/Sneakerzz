import { useEffect, useState } from "react";

import {
  getUsers,
  deleteUser,
  toggleUserStatus,
} from "../services/userService";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getUsers(token);

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await deleteUser(id, token);

      alert("User Deleted");

      fetchUsers();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const handleStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await toggleUserStatus(id, token);

    fetchUsers();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Manage Users
      </h1>

      <input
        type="text"
        placeholder="Search User..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-8"
      />

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-100">

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-center p-4">
                Role
              </th>

              <th className="text-center p-4">
                Status
              </th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user._id}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      user.role === "admin"
                        ? "bg-purple-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      user.status
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {user.status
                      ? "Active"
                      : "Blocked"}
                  </span>

                </td>

                <td className="p-4 flex justify-center gap-3">
  <button
    onClick={() => handleDelete(user._id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>

  <button
    onClick={() => handleStatus(user._id)}
    className={`px-4 py-2 rounded text-white ${
      user.status
        ? "bg-yellow-500"
        : "bg-green-600"
    }`}
  >
    {user.status ? "Disable" : "Enable"}
  </button>
</td>

              </tr>

            ))}

            {filteredUsers.length === 0 && (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-6"
                >
                  No Users Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminUsers;