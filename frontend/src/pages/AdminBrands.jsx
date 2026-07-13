import { useEffect, useState } from "react";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../services/brandService";

function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data.brands);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      if (editingId) {
        await updateBrand(
          editingId,
          { name },
          token
        );

        alert("Brand Updated");
      } else {
        await createBrand(
          { name },
          token
        );

        alert("Brand Created");
      }

      setName("");
      setEditingId(null);

      fetchBrands();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };
const handleEdit = (brand) => {
  setName(brand.name);
  setEditingId(brand._id);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this brand?"
    );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("token");

      await deleteBrand(id, token);

      alert("Brand Deleted");

      fetchBrands();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Manage Brands
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Brand Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="flex-1 border rounded-lg p-3"
          required
        />

        <button
          className="bg-black text-white px-6 rounded-lg"
        >
          {editingId
            ? "Update"
            : "Add Brand"}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">
                Brand
              </th>

              <th className="text-center p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand) => (
              <tr
                key={brand._id}
                className="border-b"
              >
                <td className="p-4">
                  {brand.name}
                </td>

                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() =>
                      handleEdit(brand)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        brand._id
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {brands.length === 0 && (
              <tr>
                <td
                  colSpan="2"
                  className="text-center p-6"
                >
                  No Brands Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBrands;