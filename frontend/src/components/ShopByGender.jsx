import { Link } from "react-router-dom";

function ShopByGender() {
  const genders = [
    {
      title: "Men",
      image:
        "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/d/ad22b92Nike-553558-400_1.jpg?rnd=20200526195200&tr=w-1080",
      link: "/shop?gender=Men",
    },
    {
      title: "Women",
      image:
        "https://nb.scene7.com/is/image/NB/u100096v_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
      link: "/shop?gender=Women",
    },
    {
      title: "Unisex",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      link: "/shop?gender=Unisex",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

      {/* Heading */}
      <div className="text-center mb-8 md:mb-12">
        <p className="uppercase tracking-[4px] md:tracking-[8px] text-gray-500 text-xs md:text-sm">
          Categories
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
          Shop By Gender
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {genders.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="group relative overflow-hidden rounded-2xl md:rounded-3xl h-72 sm:h-80 md:h-[420px] shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition" />

            <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 text-white">

              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {item.title}
              </h3>

              <span className="inline-block border border-white px-4 py-2 md:px-5 rounded-full text-sm md:text-base group-hover:bg-white group-hover:text-black transition">
                Shop Now →
              </span>

            </div>

          </Link>
        ))}
      </div>

    </section>
  );
}

export default ShopByGender;