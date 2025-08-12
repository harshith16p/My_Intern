import PlaceInfo from "./Other/PlaceInfo";
import Amenities from "./Other/Amenities";
import Image from "next/image";
import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import "./styles.css";
import RoomInfoSlider from "./RoomInfoSlider";
import AccessoriesPosts from "../Cards/AccessoriesPosts";

const RoomInfo = ({ data, accessories }) => {
  const [categoryDetails, setCategoryDetails] = useState();
  const [showMore, setShowMore] = useState(false);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReview?productId=${data._id}`
      );

      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  const calculateOverallAverageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);

  const fetchCategoryDetails = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${data?.category}`
    );

    setCategoryDetails(response.data);
  };

  useEffect(() => {
    if (data?.category) {
      fetchCategoryDetails();
    }
  }, [data?.category]);

  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef(null);

  const [otherProductByAuthorId, setOtherProductByAuthorId] = useState([]);
  const fetchOtherProductByAuthorId = async (authorId) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllProductByAuthorId/${authorId}`
    );
    // store only those product which are not the current product

    setOtherProductByAuthorId(
      response.data.filter((item) => item._id !== data._id)
    );
  };

  useEffect(() => {
    fetchReviews();
    if (data?.author) {
      fetchOtherProductByAuthorId(data?.author?._id);
    }
    const descriptionElement = descriptionRef.current;
    if (descriptionElement.scrollHeight > descriptionElement.clientHeight) {
      setIsClamped(true);
    } else {
      setIsClamped(false);
    }
  }, [data]);

  const [loadingMaintenance, setLoadingMaintenance] = useState(false);
  const [loadingInstallation, setLoadingInstallation] = useState(false);

  async function downloadMaintenancePDF(data) {
    setLoadingMaintenance(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generateMaintenanceDetailPdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: data._id,
        }),
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Maintenance Details.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setLoadingMaintenance(false);
  }

  async function downloadInstallationPDF(data) {
    setLoadingInstallation(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generateInstallationDetailPdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: data._id,
        }),
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Installation Details.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setLoadingInstallation(false);
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full">
      <div className="font-normal text-sm  flex flex-col gap-4 my-6">
        <>
          <div>
            <div
              className={`relative md:w-[80%] w-full ${
                showMore ? "" : "line-clamp-3"
              } overflow-hidden`}
              ref={descriptionRef}
            >
              <p className="text-[16px] text-[#222222]">
                {data?.productDescription}
              </p>
            </div>
            {isClamped && (
              <span
                className="cursor-pointer hover:underline text-[16px] font-semibold"
                onClick={() => setShowMore(!showMore)}
              >
                <p className="text-[16px] font-medium underline">
                  {showMore ? "View less" : "View more"}
                </p>
              </span>
            )}
            {categoryDetails?.maintenanceDetails &&
              categoryDetails?.installationDetails && (
                <p className="font-medium mt-2 ">
                  <span className="font-normal">More information: </span>
                  <button
                    onClick={() => downloadInstallationPDF(data)}
                    className="hover:underline hover:text-gray-900 font-semibold "
                  >
                    {loadingInstallation
                      ? "Installation Details (Downloading...)"
                      : "Installation Details"}
                  </button>
                  {" | "}
                  <button
                    onClick={() => downloadMaintenancePDF(data)}
                    className="hover:underline hover:text-gray-900 font-semibold "
                  >
                    {loadingMaintenance
                      ? "Maintenance Details (Downloading...)"
                      : "Maintenance Details"}
                  </button>
                </p>
              )}
          </div>
        </>

        <div>
          <div>
            {(data.productType === "special" ||
              data.productType === "requested") && (
              <div className="border my-4 py-6 md:px-6  px-2 border-gray-300  h-auto sm:gap-0 gap-3 ml-[25px]  w-[90%] rounded-xl  flex flex-row justify-around items-center">
                {data.productType === "requested" && (
                  <div
                    id="box1"
                    className="flex flex-row pr-4 "
                  >
                    <img
                      className="h-10 scale-x-[-1]"
                      alt=""
                      src="/icons/amf/rightGold.svg"
                    />
                    <div
                      className="text-lg text-[#bf9b30] text-center pl-2 pr-2"
                      style={{ lineHeight: "1" }}
                    >
                      Ayatrio member <br />
                      favourite
                    </div>

                    <img
                      className="h-10 "
                      alt=""
                      src="/icons/amf/rightGold.svg"
                    />
                  </div>
                )}
                {data.productType === "special" && (
                  <div
                    id="box1"
                    className="flex flex-row items-center  sm:order-1 order-2"
                  >
                    <img
                      className="h-10 scale-x-[-1]"
                      alt=""
                      src="/icons/ayatrio famaily faveriot right.svg"
                    />
                    <div
                      className="text-[16px] font-medium text-center "
                      style={{ lineHeight: "1" }}
                    >
                      Ayatrio member <br />
                      favourite
                    </div>

                    <img
                      className="h-10 "
                      alt=""
                      src="/icons/ayatrio famaily faveriot right.svg"
                    />
                  </div>
                )}

                {/* text */}
                <div
                  className="pl-4 pr-5 sm:block hidden text-[14px]  font-medium sm:order-2"
                  style={{ lineHeight: "1.2" }}
                >
                  One of the most loved homes furnishing on
                  <br />
                  Ayatrio, according to members
                </div>

                <div
                  id="box3"
                  className="flex sm:pb-0  flex-col  sm:order-4 order-3"
                >
                  <div className="text-center text-xl font-bold">
                    {calculateOverallAverageRating}
                  </div>
                  <div className="underline text-sm  flex">
                    {Array.from({
                      length: calculateOverallAverageRating,
                    }).map((_, idx) => (
                      <Image
                        loading="lazy"
                        src="/icons/star full black.svg"
                        width={10}
                        height={10}
                        alt="star"
                        className="m-[2px]"
                      />
                    ))}
                  </div>
                </div>
                <div
                  id="box3"
                  className="flex sm:pb-0  flex-col md:pl-4  sm:order-4 border-3"
                >
                  <div className="text-center text-xl font-bold">
                    {reviews.length}
                  </div>
                  <div className="underline text-sm -mt-2">Reviews</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <PlaceInfo data={data} />

        <Amenities data={data} />

        {/* <div className="flex"> */}
        {data?.author && (
          <div className="flex flex-col border-b-[0.5px] border-[#f5f5f5] -mt-4 py-[24px]">
            <div className="flex justify-between" onClick={toggleDropdown}>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className=" bg-white rounded-full flex items-center justify-center w-[27px] h-[27px] md:w-[27px] md:h-[27px]">
                    <Image
                      src="/images/logo/officialLogo.jpg"
                      height={20}
                      width={20}
                      alt="Profile1"
                      className="rounded-full w-[25px] h-[25px] md:w-[25px] md:h-[25px]"
                    />
                  </div>
                  <div className=" bg-white rounded-full flex items-center justify-center w-[27px] h-[27px] md:w-[27px] md:h-[27px]">
                    <Image
                      src={data.author.image}
                      height={20}
                      width={20}
                      alt="Profile1"
                      className="rounded-full w-[25px] h-[25px] md:w-[25px] md:h-[25px]"
                    />
                  </div>
                </div>
                <span className="text-[#222222] text-[20px] font-medium">
                  Artist collaboration
                </span>
              </div>
              <div className="pr-5">
                <Image
                  src="/icons/downarrow.svg"
                  alt="tick"
                  width={20}
                  height={20}
                  // className={`cursor-pointer transform transition-transform duration-300 ${
                  //   isDropdownOpen ? "rotate-180" : ""
                  // }`}
                />
              </div>
            </div>
            {/*  */}
            {isDropdownOpen && (
              <div className="flex flex-col my-8 gap-6 max-w-3xl ">
                <div className="flex items-center gap-4">
                  <Link
                    href={`/profile/${data.author._id}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={data.author.image}
                      height={120}
                      width={120}
                      alt="avatar"
                      className="rounded-full w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <span className="text-[#757575]">Collaboration</span>
                    <div className="text-[13px] lg:text-[16px] p-1 flex  items-center font-bold ">
                      <Link
                        href={`/profile/${data.author._id}`}
                        className=" text-[#1D1D1F] font-bold text-[18px]"
                      >
                        {data.author.displayName}
                      </Link>
                      {data.author.links?.linkedin && (
                        <Link
                          href={data.author.links?.linkedin}
                          className="flex items-center"
                          target="_blank"
                        >
                          <Image
                            loading="lazy"
                            className="sm:h-6 h-6 sm:w-6 w-6"
                            src="/icons/social-icon/linkedln.svg"
                            alt={`LinkedIn for ${data.author.links?.linkedin}`}
                            width={24}
                            height={24}
                          />
                        </Link>
                      )}
                      {data.author.links?.instagram && (
                        <Link
                          href={data.author.links?.instagram}
                          className="flex items-center"
                          target="_blank"
                        >
                          <Image
                            loading="lazy"
                            className="sm:h-6 h-6 sm:w-6 w-6"
                            src="/icons/social-icon/instagram.svg"
                            alt={`LinkedIn for ${data.author.links?.instagram}`}
                            width={24}
                            height={24}
                          />
                        </Link>
                      )}
                      {data.author.links?.youtube && (
                        <Link
                          href={data.author.links?.youtube}
                          className="flex items-center"
                          target="_blank"
                        >
                          <Image
                            loading="lazy"
                            className="sm:h-6 h-6 sm:w-6 w-6"
                            src="/icons/social-icon/youtube.svg"
                            alt={`LinkedIn for ${data.author.links?.youtube}`}
                            width={24}
                            height={24}
                          />
                        </Link>
                      )}
                    </div>
                    <p className="hidden md:block text-[#1D1D1F] font-semibold text-sm pt-3 line-clamp-5 md:w-[80%]">
                      {`${data.author.authorDetails?.description.slice(
                        0,
                        180
                      )}...`}
                    </p>
                    <p className="md:hidden text-[#1D1D1F] font-semibold text-sm pt-3 line-clamp-5 md:w-[80%]">
                      {`${data.author.authorDetails?.description.slice(
                        0,
                        50
                      )}...`}
                    </p>
                  </div>
                </div>

                {otherProductByAuthorId.length > 0 && (
                  <RoomInfoSlider data={otherProductByAuthorId} />
                )}
              </div>
            )}
          </div>
        )}
        {/* </div> */}
        {/* <AccessoriesPosts accessories={accessories} /> */}
      </div>
    </div>
  );
};
export default RoomInfo;
