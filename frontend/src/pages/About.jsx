import { Link } from "react-router-dom";
import {
  FaShippingFast,
  FaCheckCircle,
  FaUndoAlt,
  FaStar,
} from "react-icons/fa";

function About() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[6px] text-orange-500 mb-4">
            About Sneakerzz
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold">
            More Than Sneakers.
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            We bring the latest premium sneakers from the world's
            biggest brands with quality, authenticity and style.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition"
          >
            Shop Collection →
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
          alt="Sneakers"
          className="rounded-3xl shadow-xl"
        />

        <div>
          <p className="text-orange-500 font-semibold uppercase tracking-widest">
            Our Story
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Built For Sneaker Lovers
          </h2>

          <p className="text-gray-600 mt-6 leading-8">
            Sneakerzz was created with one goal —
            making premium sneakers accessible to everyone.
            Whether you're looking for everyday comfort,
            performance footwear or the latest fashion trends,
            we've got you covered.
          </p>

          <p className="text-gray-600 mt-5 leading-8">
            Every product is carefully selected to ensure
            authenticity, quality and customer satisfaction.
          </p>
        </div>

      </section>

      {/* Why Choose Us */}

      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Sneakerzz
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-3xl p-8 text-center shadow hover:shadow-lg transition">
              <FaShippingFast className="text-5xl text-orange-500 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and secure delivery across India.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow hover:shadow-lg transition">
              <FaCheckCircle className="text-5xl text-orange-500 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">
                100% Authentic
              </h3>
              <p className="text-gray-600">
                Genuine products from trusted brands.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow hover:shadow-lg transition">
              <FaUndoAlt className="text-5xl text-orange-500 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                Hassle-free returns and exchanges.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow hover:shadow-lg transition">
              <FaStar className="text-5xl text-orange-500 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Carefully selected premium sneakers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              500+
            </h2>
            <p className="mt-3 text-gray-600">
              Products
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              15+
            </h2>
            <p className="mt-3 text-gray-600">
              Brands
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              1000+
            </h2>
            <p className="mt-3 text-gray-600">
              Happy Customers
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              4.9★
            </h2>
            <p className="mt-3 text-gray-600">
              Customer Rating
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-black text-white py-24">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold">
            Ready For Your Next Pair?
          </h2>

          <p className="text-gray-300 mt-6 text-lg">
            Discover the latest arrivals from Nike, Adidas,
            Puma, Converse and New Balance.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-10 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full font-semibold transition"
          >
            Shop Now →
          </Link>

        </div>
      </section>

    </div>
  );
}

export default About;