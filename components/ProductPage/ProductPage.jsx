"use client";

import ImageCaresoul from "@/components/Room/imagecaresoul";
import { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import Card from "@/components/Room/Other/Card";
import RoomImageList from "../Room/RoomImageList";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomData, setRoomData } from "../Features/Slices/roomSlice";
import RoomToolbar from "./RoomToolbar";
import RoomInfo from "../Room/RoomInfo";
import Reviews from "../Room/Other/Reviews";
// import AccessoriesPosts from "../Cards/AccessoriesPosts";
import UserReviewPosts from "../Cards/UserReviewPosts";
import axios from "axios";
import Carous from "../Carousel/Carous";
import { viewItem } from "@/tag-manager/events/view_item";
import AccessoriesPosts from "../Cards/AccessoriesPosts";

const ProductPage = ({ productId, initialData }) => {
  const [data, setData] = useState(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedData = useSelector(selectRoomData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialData) {
      // dispatch({ type: "FETCH_ROOM_REQUEST", payload: title });
      dispatch({ type: "FETCH_PRODUCT_BY_ID", payload: productId });
    }
  }, [productId, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: null,
        });
      } catch (error) {
        console.error("Error fetching cached data:", error);
      }
    };

    fetchData();
    dispatch(setRoomData({ roomData: initialData, status: "succeeded" }));
  }, [dispatch]);

  const [accessories, setAccessories] = useState([]);

  const fetchAccessories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchAccessoriesByCategory/${data?.category}`
      );
      setAccessories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.category) {
      fetchAccessories();
    }
  }, [data]);

  useEffect(() => {
    if (selectedData && Object.keys(selectedData).length !== 0) {
      // Update cached data with selected data
      sessionStorage?.setItem("roomData", JSON.stringify(selectedData));
      setData(selectedData);
      if (selectedData?.productImages?.[0]?.color) {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: selectedData?.productImages[0]?.color,
        });
      } else {
        dispatch({
          type: "FETCH_IMAGE_DATA",
          payload: null,
        });
      }
    }
  }, [selectedData, dispatch]);

  useEffect(() => {
    if (data) {
      viewItem({ item: data });
    }
  }, [data]);

  return (
    <div className=" mb-[32px] px-[12px] sm:px-[20px]  md:px-[52px] ">
      <div className="w-full gap-6 sm:mt-[96px] md:grid grid-cols-[1fr,1fr] ">
        <div className="h-full w-full font-sans text-xs sm:text-sm sm:pl-0 py-2 flex flex-col ">
          <div className="mb-4">
            <NavigationItem product={data} />
          </div>
          <RoomImageList
            data={data}
            images={data?.images}
            alt={data?.productTitle}
          />
          <ImageCaresoul data={data} images={data?.images} />
        </div>
        <div className="h-full w-full relative pl-3 pt-3 sm:pt-0  sm:pl-0 md:row-span-2">
          <div
            className={`w-full h-fit sticky top-2 ${
              isModalOpen ? "z-[9999]" : ""
            }`}
          >
            <Card
              data={data}
              productId={data._id}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="h-full w-full font-sans text-xs sm:text-sm sm:pl-0 flex flex-col ">
          <RoomToolbar data={data} />
          <RoomInfo data={data} accessories={accessories} />
          {/* <AccessoriesPosts accessories={accessories} /> */}
          <Reviews productId={data._id} data={data} />

          <UserReviewPosts
            slidesPerView={2.2}
            SubcategoryName={data.subcategory}
          />
          <AccessoriesPosts accessories={accessories} />
        </div>
      </div>
      <div className="">
        <Carous data={data} />
      </div>
    </div>
  );
};

export default ProductPage;
