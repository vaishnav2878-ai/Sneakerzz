import { useState } from "react";
import { uploadImage } from "../services/uploadService";
import {
  createProduct,
  getBrands,
  getCategories,
} from "../services/productService";

import { useEffect } from "react";
function AddProduct() {
  const [formData, setFormData] = useState({
  name: "",
  brand: "",
  category: "",
  price: "",
  discountPrice: "",
  description: "",
  gender: "Men",
  featured: false,
  bestSeller: false,
  newArrival: false,
  sizes: [],
});

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleAddSize = () => {
  if (!size || !stock) {
    return alert("Please enter size and stock");
  }

  setFormData({
    ...formData,
    sizes: [
      ...formData.sizes,
      {
        size: Number(size),
        stock: Number(stock),
      },
    ],
  });

  setSize("");
  setStock("");
};

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const data = await uploadImage(image, token);

      setImageUrl(data.imageUrl);

      alert("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };
  const [brands, setBrands] = useState([]);
const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const brandData = await getBrands();
      const categoryData = await getCategories();

      console.log("Brand Data:", brandData);
      console.log("Category Data:", categoryData);

      setBrands(brandData.brands);
      setCategories(categoryData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  console.log("Brands:", brands);
  console.log("Categories:", categories);
}, [brands, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first");
      return;
    }

    try {
      const productData = {
        ...formData,
        images: [imageUrl],
      };

      const data = await createProduct(productData);

      alert(data.message);

setFormData({
  name: "",
  brand: "",
  category: "",
  price: "",
  discountPrice: "",
  description: "",
  gender: "Men",
  featured: false,
  bestSeller: false,
  newArrival: false,
});

      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create product"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <select
  name="brand"
  value={formData.brand}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>
  <option value="">Select Brand</option>

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
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>
  <option value="">Select Category</option>

  {categories.map((category) => (
    <option
      key={category._id}
      value={category._id}
    >
      {category.name}
    </option>
  ))}
</select>

        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          placeholder="Discount Price"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          rows="5"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="gender"
          value={formData.gender}
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
        <div className="border rounded-lg p-4">
  <h3 className="font-semibold text-lg mb-4">
    Product Sizes
  </h3>

  <div className="flex gap-3 mb-4">
    <input
      type="number"
      placeholder="Size"
      value={size}
      onChange={(e) => setSize(e.target.value)}
      className="border p-2 rounded w-32"
    />

    <input
      type="number"
      placeholder="Stock"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      className="border p-2 rounded w-32"
    />

    <button
      type="button"
      onClick={handleAddSize}
      className="bg-blue-600 text-white px-4 rounded"
    >
      Add Size
    </button>
  </div>

  {formData.sizes.length > 0 && (
    <div className="space-y-2">
      {formData.sizes.map((item, index) => (
        <div
          key={index}
          className="flex justify-between border rounded p-2"
        >
          <span>Size: {item.size}</span>
          <span>Stock: {item.stock}</span>
        </div>
      ))}
    </div>
  )}
</div>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-3 rounded"
        />

        <button
          type="button"
          onClick={handleImageUpload}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-40 h-40 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;