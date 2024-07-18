import React from "react";
import Banner from "../../../../components/user/banner/Banner";
import IconsBanner from "../../../../components/user/banner/IconsBanner";
import Category from "../../../../components/user/category/Category";
import TrendingSlide from "../../../../components/user/trendingBrand/TrendingSlide";
import GlobalStore from "../../../../components/user/trendingBrand/GlobalStore";
import TrendingBrand from "../../../../components/user/trendingBrand/TrendingBrands";
import FashionCarousal from "../../../../components/user/categorySection/carousal/FashionCarousal";
import HomeAndLiving from "../../../../components/user/categorySection/HomeAndLiving";
import HomeLivCarousel from "../../../../components/user/categorySection/carousal/HomeLivCarousel";
import MobileAccess from "../../../../components/user/categorySection/MobileAccess";
import MobileCarousel from "../../../../components/user/categorySection/carousal/MobileCarousel";
import HomepickTrending from "../../../../components/user/trendingProducts/HomepickTrending";
import KitchenTrending from "../../../../components/user/trendingProducts/KitchenTrending";
import HelthWellTrending from "../../../../components/user/trendingProducts/HelthWellTrending";
import MobilesTrending from "../../../../components/user/trendingProducts/MobilesTrending";
import Homecare from "../../../../components/user/trendingProducts/Homecare";
import Fashion from "../../../../components/user/trendingProducts/Fashion";

const home = () => {
  return (
    <div>
      <Category />
      <Banner />
      <IconsBanner />
      {/* <TrendingSlide /> */}
      {/* <TrendingBrand /> */}
      {/* <GlobalStore /> */}
      {/* <Fashion />
      <FashionCarousal /> */}

      {/* //home and Living */}
      {/* <HomeAndLiving />
      <HomeLivCarousel /> */}

      {/* <MobileAccess /> */}
      {/* <MobileCarousel /> */}

      {/* Trending producs */}
      <MobilesTrending />
      <HomepickTrending />
      <KitchenTrending />
      <Homecare />
      <Fashion />
      {/* <HelthWellTrending /> */}
    </div>
  );
};

export default home;
