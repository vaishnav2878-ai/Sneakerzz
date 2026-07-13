import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../services/categoryService";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] =
    useState([]);

  const [name, setName] = useState("");
  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data.categories);
      setFilteredCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredCategories(filtered);
  }, [search, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    try {
      if (editingId) {
        await updateCategory(
          editingId,
          { name },
          token
        );

        alert("Category Updated");
      } else {
        await createCategory(
          { name },
          token
        );

        alert("Category Created");
      }

      setName("");
      setEditingId(null);

      fetchCategories();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this category?"
      )
    )
      return;

    try {
      const token =
        localStorage.getItem("token");

      await deleteCategory(id, token);

      alert("Category Deleted");

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleStatus = async (
    id
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await toggleCategoryStatus(
        id,
        token
      );

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Manage Categories
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="flex-1 border rounded-lg p-3"
          required
        />

        <button className="bg-black text-white px-6 rounded-lg">
          {editingId
            ? "Update"
            : "Add Category"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search Category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-6"
      />

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-center">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map(
              (category) => (
                <tr
                  key={category._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {category.name}
                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        category.status
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {category.status
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2 flex-wrap">

                      <button
                        onClick={() =>
                          handleEdit(category)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            category._id
                          )
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          handleToggleStatus(
                            category._id
                          )
                        }
                        className={`px-4 py-2 rounded text-white ${
                          category.status
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {category.status
                          ? "Disable"
                          : "Enable"}
                      </button>

                    </div>

                  </td>
                </tr>
              )
            )}

            {filteredCategories.length ===
              0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-8"
                >
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminCategories;