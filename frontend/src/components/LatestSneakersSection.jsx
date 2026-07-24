import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getLatestProducts } from "../services/productService";

function LatestSneakersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const data = await getLatestProducts();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <section
      id="products"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16"
    >
      <div className="mb-8 md:mb-12">
        <p className="text-gray-500 uppercase tracking-[4px] md:tracking-[8px] text-xs md:text-sm">
          New Collection
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
          Latest Sneakers
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">
            Loading Latest Sneakers...
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default LatestSneakersSection;