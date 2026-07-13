import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";
import {
  setProducts,
  setLoading,
} from "../redux/productSlice";
import ShopByGender from "../components/ShopByGender";

import SaleBanner from "../components/SaleBanner";

function Home() {
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));

        const data = await getProducts();

        dispatch(setProducts(data.products));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

return (
  <>
    {/* Hero Slider */}
    <HeroSlider />

    {/* Shop By Gender */}
    <ShopByGender />

    {/* Latest Sneakers */}
    <section
      id="products"
   className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16" >
      
      <div className="mb-8 md:mb-12">
  <p className="text-gray-500 uppercase tracking-[4px] md:tracking-[8px] text-xs md:text-sm">
    New Collection
  </p>

  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
    Latest Sneakers
  </h2>
</div>

      {loading ? (
<div className="text-center py-12 md:py-20">
<h2 className="text-xl font-semibold">
            Loading Products...
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

    {/* Sale Banner */}
    <SaleBanner products={products} />
  </>
);
}

export default Home;