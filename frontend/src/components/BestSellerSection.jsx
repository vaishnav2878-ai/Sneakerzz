import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getBestSellerProducts } from "../services/productService";

function BestSellerSection() {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const data = await getBestSellerProducts();
        setBestSellers(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8 md:mb-12">
        <p className="text-gray-500 uppercase tracking-[4px] md:tracking-[8px] text-xs md:text-sm">
          Most Popular
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
          Best Sellers
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">
            Loading Best Sellers...
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {bestSellers
  .filter((item) => item._id)
  .map((item) => (
    <ProductCard
      key={item._id._id}
      product={item._id}
    />
))}
        </div>
      )}
    </section>
  );
}

export default BestSellerSection;