
import MainSliderWrapper from "../MainSlider/MainSliderWrapper";
import Trending from "./Trending";
import Cookies from "./Cookies";
import CategoriesSlider from "./categorySlider";
// import TabWrapperSkeleton from "./../Skeleton/TabWrapperSkeleton";

function HomePhaseOne() {
  return (
    <div className="w-full h-auto">
      {/* First four components loaded on the server */}
      <MainSliderWrapper />
      <CategoriesSlider />
      <Cookies />
      <Trending />
    </div>
  );
}

export default HomePhaseOne;
