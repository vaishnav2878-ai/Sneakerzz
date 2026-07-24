
import ShopByGender from "../components/ShopByGender";

import SaleBanner from "../components/SaleBanner";
import BestSellerSection from "../components/BestSellerSection";
import LatestSneakersSection from "../components/LatestSneakersSection";
import HeroSlider from "../components/HeroSlider";

function Home() {
  
return (
  <>
    {/* Hero Slider */}
  <HeroSlider />


    {/* Shop By Gender */}
    <ShopByGender />

    <BestSellerSection />

<LatestSneakersSection />

    

  

    {/* Latest Sneakers */}
    

    {/* Sale Banner */}
    <SaleBanner />
  </>
);
}

export default Home;