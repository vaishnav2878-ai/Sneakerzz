import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const slides = [
  {
    title: "STEP INTO GREATNESS",
    subtitle: "Premium Sneakers For Everyday Style",
    image: "/hero1.jpg",
    productId: "685f2a1c123456789abcdef1",
  },
  {
    title: "UNLEASH YOUR SPEED",
    subtitle: "Performance Meets Comfort",
    image: "/hero2.jpg",
    productId: "685f2a1c123456789abcdef2",
  },
  {
    title: "STREETWEAR ICONS",
    subtitle: "Own Your Everyday Look",
    image: "/hero3.jpg",
    productId: "685f2a1c123456789abcdef3",
  },
  {
    title: "RUN WITHOUT LIMITS",
    subtitle: "Made For Champions",
    image: "/hero4.jpg",
    productId: "685f2a1c123456789abcdef4",
  },
];

function HeroSlider() {
  return (
    <section className="bg-black">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
      >
        {slides.map((slide, index) => (
<SwiperSlide key={index}>
  <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2 items-center px-6 md:px-10 py-10">

    {/* Left Content */}
    <div className="text-white z-10 order-2 lg:order-1 text-center lg:text-left">

      <p className="uppercase tracking-[5px] md:tracking-[8px] text-gray-400 text-xs md:text-sm mb-4">
        Limited Edition
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight mb-6">
        {slide.title}
      </h1>

      <p className="text-base md:text-xl text-gray-300 mb-8">
        {slide.subtitle}
      </p>

      <a
        href="#products"
        className="inline-block bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-gray-200 transition"
      >
        SHOP NOW
      </a>

    </div>

    {/* Right Image */}
    <div className="order-1 lg:order-2 flex justify-center items-center mb-8 lg:mb-0">

      <img
        src={slide.image}
        alt={slide.title}
        className="
          w-full
          max-w-[280px]
          sm:max-w-[360px]
          md:max-w-[450px]
          lg:max-w-[700px]
          object-contain
          hover:scale-105
          transition-all
          duration-500
        "
      />

    </div>

  </div>
</SwiperSlide>
))}
      </Swiper>
    </section>
  );
}

export default HeroSlider;