import { useEffect, useState } from "react";
import OffersHero from "../components/OffersHero";

import ProductCard from "../components/ProductCard";
import { getOfferProducts } from "../services/productService";

function Offers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOfferProducts();

console.log("Offer API Response:", data);
console.log("Products:", data.products);

setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-2xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <OffersHero />

<div
  id="offers"
  className="max-w-7xl mx-auto px-6 py-16"
>
  {/* Product Grid */}
</div>

      {products.length === 0 ? (
        <h2 className="text-center text-xl mt-10">
          No Offer Products Found
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

export default Offers;