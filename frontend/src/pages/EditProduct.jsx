import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uploadImage } from "../services/uploadService";

import {
  getSingleProduct,
  updateProduct,
  getBrands,
  getCategories
} from "../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    description: "",
    gender: "Men",
    sizes: [],
    Images: [],
  });
const [brands, setBrands] = useState([]);
const [categories, setCategories] = useState([]);
const [size, setSize] = useState("");
const [stock, setStock] = useState("");
const [newImage, setNewImage] = useState(null);
const handleImageChange = (e) => {
  setNewImage(e.target.files[0]);
};
  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const productData = await getSingleProduct(id);
      const brandData = await getBrands();
      const categoryData = await getCategories();

      setBrands(brandData.brands);
      setCategories(categoryData.categories);

      setFormData({
        name: productData.product.name,
        brand: productData.product.brand?._id || "",
        category: productData.product.category?._id || "",
        price: productData.product.price,
        discountPrice: productData.product.discountPrice,
        description: productData.product.description,
        gender: productData.product.gender,
        sizes: productData.product.size || [],
        images: productData.product.images || [],
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  fetchProduct();
}, [id]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };
  const handleAddSize = () => {
  if (!size || !stock) {
    return alert("Please enter size and stock");
  }

  const exists = formData.sizes.some(
    (item) => item.size === Number(size)
  );

  if (exists) {
    return alert("Size already exists");
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
const handleRemoveSize = (sizeToRemove) => {
  setFormData({
    ...formData,
    sizes: formData.sizes.filter(
      (item) => item.size !== sizeToRemove
    ),
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    let imageUrl = formData.images[0];

if (newImage) {
  const uploadResponse = await uploadImage(
    newImage,
    token
  );

  imageUrl = uploadResponse.imageUrl;
}

    await updateProduct(
      id,
      {
        ...formData,
        images: [imageUrl],
      },
      token
    );

    alert("Product Updated Successfully");

    navigate("/admin/products");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Update Failed"
    );
  }
};

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded shadow"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-3 rounded"
        />
        <select
  name="brand"
  value={formData.brand}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>
  <option value="">Select Brand</option>

  {brands.map((brand) => (
    <option key={brand._id} value={brand._id}>
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
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ))}
</select>
<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className="border p-2 rounded w-full mb-4"
/>
{formData.images?.[0] && (
  <img
    src={formData.images[0]}
    alt=""
    className="w-40 h-40 object-cover rounded mb-4"
  />
)}

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          placeholder="Discount Price"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full border p-3 rounded"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="Men">
            Men
          </option>

          <option value="Women">
            Women
          </option>

          <option value="Unisex">
            Unisex
          </option>
        </select>
        <div className="border rounded-lg p-4">
  <h3 className="text-lg font-semibold mb-4">
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

  <div className="space-y-2">
    {formData.sizes.map((item) => (
      <div
        key={item.size}
        className="flex justify-between items-center border rounded p-2"
      >
        <span>
          Size: {item.size}
        </span>

        <span>
          Stock: {item.stock}
        </span>

        <button
          type="button"
          onClick={() =>
            handleRemoveSize(item.size)
          }
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
</div>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;