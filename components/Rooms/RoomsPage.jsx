"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import "./styles.css";
import TabImage from "../Cards/TabImage";
import Multicard from "@/components/Imagechanger/Multicard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductData,
  selectRoomData,
  selectRoomMain,
} from "../Features/Slices/roomMainSlice";
import axios from "axios";
import Tabs from "../Cards/Tabs";
import BlogRelatedProducts from "../Cards/BlogRelatedProducts";
import { usePathname } from "next/navigation";

import RankedProducts from "@/components/Cards/RankedProducts";
import ProductPageSkeleton from "../Skeleton/ProductPageSkeleton";
import Loader from "./../Cards/Loader";

export const RoomsPage = ({ params }) => {
  const pathname = usePathname();

  const [productData, setProductData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);
  const [roomMain, setRoomMain] = useState({});

  const dispatch = useDispatch();
  const roomSelect = useSelector(selectRoomData);
  const productSelect = useSelector(selectProductData);
  const roomMainSelect = useSelector(selectRoomMain);

  const [reviewRoom, setReviewRoom] = useState({});
  const [reviewData, setReviewData] = useState([]);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getRoommain`,
        {
          params: {
            roomType: params.replace(/-/g, " "),
          },
        }
      );

      setReviewRoom(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  
  const fetchReviewData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSpecialReview`
      );
      setReviewData(response.data);
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  };

  const handleSetItem = () => {
    const newItem = { label: params.replace(/-/g, " "), href: pathname };
    sessionStorage.setItem("navigationItem", JSON.stringify(newItem));
  };

  useEffect(() => {
    handleSetItem();
    fetchRoomData();
    fetchReviewData();
  }, [params]);

  useEffect(() => {
    if (!dataFetched) {
      dispatch({ type: "FETCH_ROOM_MAIN_DATA_REQUEST", payload: { params } });
      setDataFetched(true);
    }
    setRoomData(roomSelect);
    setProductData(productSelect);
    setRoomMain(roomMainSelect);
  }, [
    dispatch,
    params,
    dataFetched,
    roomSelect,
    productSelect,
    roomMainSelect,
  ]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  if(!roomMain) {
    return <ProductPageSkeleton />
  }

  return (
    <div className="w-full min-h-screen b ">
      {roomMain && roomMain.position && roomMain.position.length > 0 ? (
        <div className=" md:pt-10">
          {roomMain.position.map((name, idx) => (
            <div key={idx} className="px-[20px] sm:px-[50px]">
              {name === "heading" && (
                <div>
                  <div className="mt-40">
                    <h1 className="lg:text-[30px]  lg:w-[70%] text-[24px] font-semibold ">
                      {roomMain.heading}
                    </h1>
                    <p className="mt-5 line-clamp-3 lg:line-clamp-none lg:w-[90%] ">
                      {roomMain.summary}
                    </p>
                  </div>
                </div>
              )}
              {name === "mainImage" && (
                <div className="mt-10 relative w-full h-[550px]">
                  <TabImage
                    href={`/${roomMain.mainImage.productCategory.replace(
                      / /g,
                      "-"
                    )}/collection/all`}
                    src={roomMain.mainImage.imgSrc}
                    alt={`Image  of Children`}
                    fill
                    width={1000}
                    height={1000}
                    style={{ objectFit: "cover" }}
                    labelData={roomMain.mainImage.children}
                  />
                </div>
              )}
              {name === "twoGrid" && (
                <div className="mt-20">
                  <h2 className="text-2xl font-semibold">
                    {roomMain.twoGrid.twoGridHeader}
                  </h2>
                  <p className="text-gray-700 mt-5 lg:w-[70%] line-clamp-3 lg:line-clamp-none ">
                    {roomMain.twoGrid.twoGridDescription}
                  </p>
                  <div className="mt-6 flex flex-col md:flex-row gap-3  items-center justify-between mx-auto">
                    <div className="relative h-[449px]  lg:min-h-[730px] w-full">
                      <TabImage
                        src={roomMain.twoGrid.twoGridRooms[0].imgSrc}
                        href={`/${roomMain.twoGrid.twoGridRooms[0].productCategory.replace(
                          / /g,
                          "-"
                        )}/collection/all`}
                        alt={`Image  of Children`}
                        fill
                        width={1000}
                        height={1000}
                        style={{ objectFit: "cover" }}
                        labelData={roomMain.twoGrid.twoGridRooms[0].children}
                      />
                    </div>
                    <div className="relative h-[449px]  lg:min-h-[730px] w-full">
                      <TabImage
                        src={roomMain.twoGrid.twoGridRooms[1].imgSrc}
                        href={`/${roomMain.twoGrid.twoGridRooms[1].productCategory.replace(
                          / /g,
                          "-"
                        )}/collection/all`}
                        alt={`Image  of Children`}
                        s
                        fill
                        width={1000}
                        height={1000}
                        style={{ objectFit: "cover" }}
                        labelData={roomMain.twoGrid.twoGridRooms[1].children}
                      />
                    </div>
                  </div>
                </div>
              )}
              {name === "fiveGrid" && (
                <div className="mt-20">
                  <h2 className="text-2xl font-semibold">
                    {roomMain.fiveGrid.fiveGridHeader}
                  </h2>
                  <p className="text-gray-700 my-5 lg:w-[70%] line-clamp-3 lg:line-clamp-none ">
                    {roomMain.fiveGrid.fiveGridDescription}
                  </p>
                  <div className="flex justify-between mb-10">
                    <div className="w-full flex justify-center max-h-[915px] screens">
                      <div className="w-full lg:h-[730px] grid grid-cols-2 lg:grid-cols-12 gap-y-4 gap-x-4 auto-rows-fr">
                        {roomMain.fiveGrid.fiveGridRooms.map((room, index) => (
                          <div
                            key={index}
                            className={`parent ${
                              index === 0
                                ? "col-start-1 col-end-3 row-start-1 row-end-6 lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-12"
                                : index === 1
                                ? "col-start-1 col-end-2 row-start-6 row-span-2 lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-6"
                                : index === 2
                                ? "col-start-2 col-end-3 row-start-6 row-span-3 lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-7"
                                : index === 3
                                ? "col-start-1 col-end-2 row-start-8 row-span-3 lg:col-start-7 lg:col-end-10 lg:row-start-6 lg:row-end-12"
                                : "col-start-2 col-end-3 row-start-9 row-span-2 lg:col-start-10 lg:col-end-13 lg:row-start-7 lg:row-end-12"
                            }`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="relative w-full h-full">
                              <TabImage
                                href={`/${room?.productCategory.replace(
                                  / /g,
                                  "-"
                                )}/collection/all`}
                                src={room.imgSrc}
                                alt={`Image of Children`}
                                width={1000}
                                height={338}
                                labelData={room.children}
                                hovered={hoveredIndex === index}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {name === "firstSlider" &&
                (roomMain.firstSlider && roomMain.firstSlider.length > 0 ? (
                  <BlogRelatedProducts relatedProducts={roomMain.firstSlider} />
                ) : (
                  <BlogRelatedProducts
                    relatedProducts={roomMain.sliders.firstSlider.products}
                    title={roomMain.sliders.firstSlider.header}
                    description={roomMain.sliders.firstSlider.description}
                    descriptionLinks={roomMain.sliders.firstSlider.descriptionLinks}
                  />
                ))}
              {name === "secondSlider" &&
                (roomMain.secondSlider && roomMain.secondSlider.length > 0 ? (
                  <BlogRelatedProducts
                    relatedProducts={roomMain.secondSlider}
                  />
                ) : (
                  <BlogRelatedProducts
                    relatedProducts={roomMain.sliders.secondSlider.products}
                    title={roomMain.sliders.secondSlider.header}
                    description={roomMain.sliders.secondSlider.description}
                    descriptionLinks={roomMain.sliders.secondSlider.descriptionLinks}
                  />
                ))}
              {name === "thirdSlider" &&
                (roomMain.thirdSlider && roomMain.thirdSlider.length > 0 ? (
                  <BlogRelatedProducts relatedProducts={roomMain.thirdSlider} />
                ) : (
                  <BlogRelatedProducts
                    relatedProducts={roomMain.sliders.thirdSlider.products}
                    title={roomMain.sliders.thirdSlider.header}
                    description={roomMain.sliders.thirdSlider.description}
                    descriptionLinks={roomMain.sliders.thirdSlider.descriptionLinks}
                  />
                ))}
              {name === "forthSlider" &&
                (roomMain.forthSlider && roomMain.forthSlider.length > 0 ? (
                  <BlogRelatedProducts relatedProducts={roomMain.forthSlider} />
                ) : (
                  <BlogRelatedProducts
                    relatedProducts={roomMain.sliders.forthSlider.products}
                    title={roomMain.sliders.forthSlider.header}
                    description={roomMain.sliders.forthSlider.description}
                    descriptionLinks={roomMain.sliders.forthSlider.descriptionLinks}
                  />
                ))}
              {name === "fifthSlider" &&
                (roomMain.fifthSlider && roomMain.fifthSlider.length > 0 ? (
                  <BlogRelatedProducts relatedProducts={roomMain.fifthSlider} />
                ) : (
                  <BlogRelatedProducts
                    relatedProducts={roomMain.sliders.fifthSlider.products}
                    title={roomMain.sliders.fifthSlider.header}
                    description={roomMain.sliders.fifthSlider.description}
                    descriptionLinks={roomMain.sliders.fifthSlider.descriptionLinks}
                  />
                ))}
            </div>
          ))}
          <RankedProducts />
          {reviewData && (<div className="flex mt-20  lg:max-h-[490px] lg:flex-row w-full flex-col">
            <div className="lg:w-2/3 h-[446px]">
              {reviewRoom && (
                <TabImage
                  src={reviewRoom.imgSrc}
                  alt={`Image  of Children`}
                  width={1000}
                  height={446}
                  labelData={reviewRoom.children}
                />
              )}
            </div>
            <div className="lg:w-1/3 min-h-[363px]  bg-zinc-100 p-10  lg:p-12">
              <div className="flex flex-col ">
                <div>
                  <p>{reviewData && reviewData.comment}</p>
                </div>
                <div className="flex mt-5 flex-row items-center gap-2 ">
                  <Image
                    loading="lazy"
                    src={reviewData && reviewData.image}
                    width={45}
                    height={45}
                    alt={reviewData && reviewData.name}
                    className=" aspect-square object-cover rounded-full"
                  />
                  <p>{reviewData && reviewData.name}</p>
                </div>
              </div>
            </div>
          </div>)}

          <Multicard forhomePage={false} />

          {productSelect && productSelect.length > 0 && (
            <Tabs data={productSelect} />
          )}
        </div>
      ) :
      <ProductPageSkeleton />}
    </div>
  );
};
