import { Link } from "react-router-dom";

function SaleBanner({ products = [] }) {
  const offerProducts = products
  .map((product) => ({
    ...product,
    discount: Math.round(
      ((product.price - product.discountPrice) /
        product.price) *
        100
    ),
  }))
  .filter(
    (product) =>
      product.discountPrice > 0 &&
      product.discount > 0
  )
  .sort((a, b) => b.discount - a.discount)
  .slice(0, 3);
  
  const maxDiscount =
    offerProducts.length > 0
      ? offerProducts[0].discount
      : 50;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-black rounded-3xl overflow-hidden">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div className="p-10 lg:p-16">
            <p className="uppercase tracking-[5px] text-gray-400 text-sm mb-4">
              Limited Time Offer
            </p>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              UP TO{" "}
              <span className="text-orange-500">
                {maxDiscount}% OFF
              </span>
            </h2>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Grab the hottest sneaker deals before they're gone.
              Premium brands. Massive discounts. Limited stock.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition"
            >
              Shop Now →
            </Link>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8">

            {offerProducts.length > 0 ? (
              offerProducts.slice(0, 3).map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl p-4 text-center hover:scale-105 transition duration-300"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />

                  <h3 className="mt-3 font-semibold text-sm line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-orange-500 font-bold text-lg">
                    {product.discount}% OFF
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center">
                <p className="text-gray-400 text-lg">
                  No offers available
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default SaleBanner;