import { fetchSliderData } from "@/actions/fetchSliderData";
import { unstable_noStore as noStore } from "next/cache";
import MainSliderSkeleton from "./MainSliderSkeleton";

import dynamic from "next/dynamic";
const MainSlider = dynamic(() => import("./MainSlider"), {
  ssr: false,
  loading: () => <MainSliderSkeleton />,
});

import "swiper/css";
import "swiper/css/navigation";

const MainSliderWrapper = async () => {
  noStore();

  const sliderData = await fetchSliderData();

  return <MainSlider sliderData={sliderData?.result} />;
};

export default MainSliderWrapper;
