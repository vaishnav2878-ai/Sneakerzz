import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProducts,
  deleteProduct,
  getBrands,
  getCategories,
  toggleProductStatus,
} from "../services/productService";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const fetchProducts = async () => {
    try {
      const productData = await getProducts();
      const brandData = await getBrands();
      const categoryData = await getCategories();

      setProducts(productData.products);
      setBrands(brandData.brands);
      setCategories(categoryData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await deleteProduct(id, token);

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };
  const handleToggleStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const data = await toggleProductStatus(id, token);

    alert(data.message);

    fetchProducts();
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
        "Failed to update status"
    );
  }
};

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesBrand =
        !selectedBrand ||
        product.brand?._id === selectedBrand;

      const matchesCategory =
        !selectedCategory ||
        product.category?._id ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCategory
      );
    }
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold">
    Manage Products
  </h1>

  <button
    onClick={() => navigate("/admin/products/add")}
    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
  >
    + Add Product
  </button>
</div>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <select
          value={selectedBrand}
          onChange={(e) =>
            setSelectedBrand(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="">
            All Brands
          </option>

          {brands.map((brand) => (
            <option
              key={brand._id}
              value={brand._id}
            >
              {brand.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="border rounded-lg p-3"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4">
                Image
              </th>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Brand
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4">
                Price
              </th>
              <th className="p-4 text-center">
  Status
</th>

              <th className="p-4">
                Action
              </th>
              
            </tr>
          
          </thead>

          <tbody>
  {filteredProducts.map((product) => (
    <tr
      key={product._id}
      className="border-b"
    >
      <td className="p-4">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      <td className="p-4">
        {product.name}
      </td>

      <td className="p-4">
        {product.brand?.name}
      </td>

      <td className="p-4">
        {product.category?.name}
      </td>

      <td className="p-4">
        <p className="font-semibold text-green-600">
          ₹{product.discountPrice}
        </p>

        <p className="text-sm text-gray-400 line-through">
          ₹{product.price}
        </p>
      </td>

      {/* STATUS COLUMN */}

      <td className="p-4 text-center">
        {product.status ? (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Active
          </span>
        ) : (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
            Inactive
          </span>
        )}
      </td>

      {/* ACTION COLUMN */}

      <td className="p-4 flex gap-2 justify-center">
        <button
          onClick={() =>
            navigate(`/admin/products/edit/${product._id}`)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() =>
            handleToggleStatus(product._id)
          }
          className={`px-4 py-2 rounded text-white ${
            product.status
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {product.status
            ? "Disable"
            : "Enable"}
        </button>

        <button
          onClick={() =>
            handleDelete(product._id)
          }
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}

  {filteredProducts.length === 0 && (
    <tr>
      <td
        colSpan="7"
        className="text-center p-6 text-gray-500"
      >
        No Products Found
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;