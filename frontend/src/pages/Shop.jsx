import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const search = searchParams.get("search") || "";
      const gender = searchParams.get("gender") || "";
      const brand = searchParams.get("brand") || "";
      const category = searchParams.get("category") || "";

      const data = await getProducts({
        search,
        gender,
        brand,
        category,
      });

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-2xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Shop Sneakers
      </h1>

      {products.length === 0 ? (
        <h2 className="text-center text-xl mt-10">
          No Products Found
        </h2>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;