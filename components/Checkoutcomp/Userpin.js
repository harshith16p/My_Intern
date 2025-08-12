"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDbItems } from "../Features/Slices/cartSlice";
import Link from "next/link";
import axios from "axios";
import { getPinFromCoordinates } from "@/utils/getPinFromCoordinates";
import { upsertUserLocation } from "../Features/api";
import { useRouter, useSearchParams } from "next/navigation";
import {
  selectFreeSampleItems,
  setFreeSamples,
} from "../Features/Slices/freeSampleSlice";
import { isUserAuth } from "@/actions/isUserAuth";
import BankDiscountOptions from "@/components/Checkoutcomp/BankDiscountOptions";
import {
  addAppliedOffer,
  selectAppliedOffers,
  selectBankDiscountedAmount,
  selectOtherApplicableExternalOffers,
  selectSelectedBank,
  setOtherApplicableExternalOffers,
  setSumTotalPrice,
} from "@/components/Features/Slices/externalOfferSlice";

const Userpin = () => {
  const dispatch = useDispatch();
  const [cartdata, setcartdata] = useState("");
  const [cartStatus, setCartStaus] = useState("");
  const [newUserPin, setNewUserPin] = useState("");
  const router = useRouter();

  const [userCoordinates, setUserCoordinates] = useState(null);
  const [userPincode, setUserPincode] = useState(null);

  const searchParams = useSearchParams();

  const isFreeSample = searchParams.get("freeSamples") === "true";
  const freeSamples = useSelector(selectFreeSampleItems);
  const [deviceId, setDeviceId] = useState(null);

  //############### my logic pieces
  const selectedBank = useSelector(selectSelectedBank);
  const bankDiscountedAmount = useSelector(selectBankDiscountedAmount);
  const [userId, setUserId] = useState(null);
  const otherApplicableExternalOffers = useSelector(
    selectOtherApplicableExternalOffers
  );
  const appliedOffers = useSelector(selectAppliedOffers);
  // #########################

  //############### my logic pieces
  useEffect(function () {
    async function getUserId() {
      try {
        const userId = await isUserAuth();

        setUserId(userId);
      } catch (error) {
        console.log("Error while fetching userId");
      }
    }

    getUserId();
  }, []);

  // #################################

  const fetchData = async () => {
    try {
      setCartStaus("loading");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        {
          params: {
            deviceId: deviceId,
          },
        }
      );
      // console.log(response);
      if (response.status !== 200) {
        throw new Error("HTTP status " + response.status);
      }
      const data = response.data; // Extract JSON from the response
      // console.log("response from DB", data);

      setcartdata(data);
      // console.log("response from DB", cartdata);
      setCartStaus("succeeded");
      // console.log("cartStatus", cartStatus);
      dispatch(setDbItems(data));
      // console.log("this is data from redux (db)", dbItems);
    } catch (error) {
      // console.error("Error Fetching data from DB : ", error);

      setCartStaus("failed");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("deviceId");
      setDeviceId(id);
    }
  }, []);

  const fetchFreeSamples = async () => {
    if (!deviceId) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/freeSampling`,
        {
          params: {
            deviceId,
          },
        }
      );

      const data = response.data;
      dispatch(setFreeSamples(data));
    } catch (error) {
      console.error("Error Fetching samples from DB : ", error);
    }
  };

  useEffect(() => {
    if (deviceId && isFreeSample) {
      fetchFreeSamples();
    }
  }, [isFreeSample, deviceId]);

  useEffect(() => {
    localStorage?.getItem("userCoordinates") &&
      setUserCoordinates(JSON.parse(localStorage.getItem("userCoordinates")));
  }, []);

  useEffect(() => {
    if (localStorage?.getItem("userPincode")) {
      setUserPincode(localStorage.getItem("userPincode"));
    } else if (userCoordinates) {
      getPinFromCoordinates(userCoordinates.lat, userCoordinates.lng).then(
        (data) => {
          if (data) {
            setUserPincode(data);
            localStorage.setItem("userPincode", data);

            const deviceId = localStorage.getItem("deviceId");

            upsertUserLocation({
              deviceId,
              pincode: pin,
              lat: userCoordinates.lat,
              lng: userCoordinates.lng,
            })
              .then(() => {
                console.log("User location saved");
              })
              .catch((error) => {
                console.error(`Error saving user location: ${error.message}`);
              });
          }
        }
      );
    }
  }, [userCoordinates]);

  useEffect(() => {
    if (deviceId && !isFreeSample) {
      fetchData();
    }
  }, [deviceId]);

  useEffect(() => {
    console.log("Updated cartdata", cartdata);
    console.log("Updated cartStatus", cartStatus);
  }, [cartdata, cartStatus]);
  let totalPrice = 0;
  // if (cartStatus === "succeeded" && cartdata) {
  //   totalPrice = cartdata.items.reduce(
  //     (total, item) => total + item.productId.totalPrice * item.quantity,
  //     0
  //   );
  // }
  if (cartStatus === "succeeded" && cartdata) {
    totalPrice = cartdata.items.reduce((total, item) => {
      // const serviceTotalCost = item.selectedServices.reduce(
      //   (serviceTotal, service) => serviceTotal + parseFloat(service.cost),
      //   0
      // );
      const itemTotalPrice = item.price * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  }

  let SumtotalPrice = 0;

  if (cartStatus === "succeeded" && cartdata) {
    SumtotalPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedServices.reduce(
        (serviceTotal, service) =>
          serviceTotal + parseFloat(service.cost * service?.quantity),
        0
      );
      const accessoriesTotalCost = item.selectedAccessories.reduce(
        (accessoryTotal, accessory) =>
          accessoryTotal +
          parseFloat(accessory.totalPrice * accessory?.quantity),
        0
      );
      const itemTotalPrice =
        (item.price + serviceTotalCost + accessoriesTotalCost) * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  }

  dispatch(setSumTotalPrice(SumtotalPrice));

  let totalServicesPrice = 0;

  if (cartStatus === "succeeded" && cartdata) {
    totalServicesPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedServices.reduce(
        (serviceTotal, service) =>
          serviceTotal + parseFloat(service.cost * service.quantity),
        0
      );
      return total + serviceTotalCost;
    }, 0);
  }

  //my Code##############
  useEffect(
    function () {
      async function getExtoffersApplicablePrice() {
        // My Code################
        //check any offer applicable price
        console.log("yayayyayayyayayayayyayayayayyayayay");
        if (userId && !otherApplicableExternalOffers) {
          //if user is registered
          // check fro first and second purcahse offer

          const externalOfferPriceResponse = await fetch(
            `${
              process.env.NEXT_PUBLIC_API_BASE_URL
            }/api/getExternalOfferApplicablePrice/${userId}/${
              isFreeSample ? 0 : SumtotalPrice
            }`
          );
          const externalOffersData = await externalOfferPriceResponse.json();
          console.log("externalOffersData");
          console.log(externalOffersData);

          if (
            externalOfferPriceResponse.ok &&
            externalOfferPriceResponse.status === 200
          ) {
            const data = externalOffersData;
            dispatch(setOtherApplicableExternalOffers(data));
            if (data.discountedAmount > 0) {
              dispatch(addAppliedOffer(data.message));
            }
          }
        }
        //##########################
      }

      if (userId && SumtotalPrice > 0 && !otherApplicableExternalOffers)
        getExtoffersApplicablePrice();
    },
    [userId, SumtotalPrice]
  );

  //#####################

  console.log(cartdata);

  console.log(totalServicesPrice);

  let totalAccessoryPrice = 0;

  if (cartStatus === "succeeded" && cartdata) {
    totalAccessoryPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedAccessories.reduce(
        (serviceTotal, service) =>
          serviceTotal + parseFloat(service.perUnitPrice * service.quantity),
        0
      );
      return total + serviceTotalCost;
    }, 0);
  }

  console.log(totalAccessoryPrice);

  const delcharge = 100;

  const handleClick = () => {
    if (newUserPin !== "") {
      const currentPinCode = localStorage.getItem("userPincode");
      console.log("Current Pin Code:", currentPinCode);
      localStorage.setItem("userPincode", newUserPin);
    }
    if (isFreeSample) {
      router.push(`/checkout/delivery?freeSamples=true`);
    } else {
      router.push("/checkout/delivery");
    }
  };

  return (
    <div className="p-2 lg:px-[67px] pt-[6rem] pb-[3rem] ">
      <div className="grid -grid-cols-1 lg:grid-cols-12 gap-10 border-b-2">
        <div className="lg:col-span-8 col-span-1 order-2 lg:order-1">
          {/* <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Price</h2>
          </div> */}

          {/* <!-- parent div --> */}
          <div className=" py-2 mx-2">
            {/* <!-- header section --> */}
            <div className="flex justify-between items-center mb-10 lg:pb-5">
              <h1 className=" leading-[1.33]  tracking-tight text-xl font-semibold mb-6">
                Shopping bag
              </h1>
              <div className="cursor-pointer hover:bg-gray-400 box-border rounded-xl">
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className=""
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 12c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5zm5.0039 0c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5zM17 13.5c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.6716-1.5 1.5.6716 1.5 1.5 1.5z"
                  ></path>
                </svg>
              </div>
            </div>
            {/* <!-- Address pin  --> */}
            {!!userPincode ? (
              <div className="flex h-11 w-48">
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="cart-ingka-svg-icon"
                  aria-hidden="true"
                >
                  <path d="M12.0001 11.2157c1.1046 0 2-.8954 2-2s-.8954-2-2-2c-1.1045 0-2 .8954-2 2s.8955 2 2 2z"></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.0001 21.3736c3.7444-2.5044 7.4025-6.5319 7.4025-11.288 0-4.0031-3.4051-7.4606-7.4121-7.4606-4.0108 0-7.3928 3.4614-7.3928 7.4606 0 4.7571 3.6584 8.7823 7.4024 11.288zm-5.4024-11.288c0-2.9193 2.511-5.4606 5.3928-5.4606 2.8856 0 5.4121 2.5452 5.4121 5.4606 0 3.6054-2.69 6.7393-5.4025 8.8443-2.7125-2.105-5.4024-5.2389-5.4024-8.8443z"
                  ></path>
                  <path d="M14.0001 9.2157c0 1.1046-.8954 2-2 2-1.1045 0-2-.8954-2-2s.8955-2 2-2c1.1046 0 2 .8954 2 2z"></path>
                </svg>
                <p className="w-full ml-3 font-[300] text-[15.5px]">
                  Your pincode <span className="underline">{userPincode}</span>
                </p>
              </div>
            ) : null}

            {/* <!-- order text --> */}
            <div className="tracking-wide font-[700] text-[1.09rem] leading-6 mb-4">
              How would you like to receive your order?
            </div>

            {/*devivery PIN CODE  */}
            <div className="w-full">
              <div className="pt-[15px]">
                <h3 className="text-sm text-gray-800  mb-4">
                  {!!userPincode ? (
                    <span>
                      Not <span className="underline">{userPincode}</span>?{" "}
                      <span>
                        Enter another pincode to see the delivery options
                        available
                      </span>
                    </span>
                  ) : (
                    <span>
                      Enter your pincode to see delivery options available in
                      your area.
                    </span>
                  )}
                </h3>
                <div className="mb-8 mt-4">
                  <input
                    onChange={(e) => setNewUserPin(e.target.value)}
                    className="w-full h-10  border-solid border border-gray-400 rounded-sm focus:border-blue-800 outline-none px-4 "
                  />
                  <span className="text-xs text-gray-400">eg:500001</span>
                </div>
                <div onClick={handleClick}>
                  <button className="bg-black text-sm font-bold h-12 text-white w-full rounded-full p-2 mb-8">
                    View delivery options
                  </button>
                </div>
                <hr></hr>
                <h3 className="text-md font-bold text-gray-500 my-4 py-4">
                  Your details
                </h3>
                <hr></hr>
                <h3 className="text-md font-bold text-gray-500 my-4 py-4">
                  Payment
                </h3>
                <hr></hr>
              </div>
            </div>

            {/* <!-- Take option  --> */}
            <div className="flex flex-row gap-5">
              {/* <!-- delivery  --> */}
              {/* <div className="box-border border rounded-sm border-gray-400 h-24 w-[50%]">
                <div className="flex px-6 py-5 h-24 items-center">
                  <div className="pr-5">
                    <svg
                      focusable="false"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="cart-ingka-svg-icon"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 4h15v3h3.0246l3.9793 5.6848V18h-2.6567c-.4218 1.3056-1.6473 2.25-3.0933 2.25-1.446 0-2.6715-.9444-3.0932-2.25h-3.9044c-.4217 1.3056-1.6472 2.25-3.0932 2.25S4.4916 19.3056 4.0698 18H1V4zm3.0698 12c.4218-1.3056 1.6473-2.25 3.0933-2.25 1.446 0 2.6715.9444 3.0932 2.25H14V6H3v10h1.0698zM16 14.0007a3.24 3.24 0 0 1 1.2539-.2507c1.446 0 2.6715.9444 3.0933 2.25h.6567v-2.6848L17.9833 9H16v5.0007zM7.163 15.75c-.6903 0-1.25.5596-1.25 1.25s.5597 1.25 1.25 1.25c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25zm10.0909 0c-.6904 0-1.25.5596-1.25 1.25s.5596 1.25 1.25 1.25 1.25-.5596 1.25-1.25-.5596-1.25-1.25-1.25z"
                      ></path>
                    </svg>
                  </div>
                  <div className="font-[700] text-[1rem] leading-[1.571rem]">
                    Delivery
                  </div>
                </div>
              </div> */}
              {/* <!-- collect --> */}
              {/* <div className="box-border border rounded-sm border-gray-400 h-24 w-[50%]">
                <div className="flex px-6 py-5 h-24 items-center">
                  <div className="pr-5">
                    <svg
                      focusable="false"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="cart-ingka-svg-icon"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21 4H1v16h15V10H6v8H3V6h16v7.1707c-1.1652.4118-2 1.5231-2 2.8293v3c0 1.6569 1.3431 3 3 3s3-1.3431 3-3v-3c0-1.3062-.8348-2.4175-2-2.8293V4zM8 18h2v-6H8v6zm6 0h-2v-6h2v6zm5-2c0-.5523.4477-1 1-1s1 .4477 1 1v3c0 .5523-.4477 1-1 1s-1-.4477-1-1v-3z"
                      ></path>
                    </svg>
                  </div>
                  <div className="font-[700] text-[1rem] leading-[1.571rem]">
                    Collect
                  </div>
                </div>
              </div> */}
            </div>
            {/*  code */}

            {/* <div className="pt-10">
              <h1 className="text-2xl font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                quo.
              </h1>
              <div className="box-border font-bold border-2 bg-sky-800 text-white p-4 rounded-lg h-20 w-[40%] flex items-center justify-between">
                <a className=" font-[700] text-xl  " href="/cart">
                  Prev page
                </a>
              </div>
            </div> */}
          </div>

          <div className="">{/* CART1 */}</div>
        </div>
        <div className="lg:col-span-4 col-span-1 sm:block order-1 lg:order-2 bg-white  border-gray-300 rounded-lg  overflow-hidden  p-[0.6rem]  text-slate-600 pt-[20px]">
          <div className="flex justify-between">
            <h3 className="text-black text-xl font-semibold mb-2">
              Your Order
            </h3>
            <Link href={"/cart"} className="underline">
              {" "}
              Edit
            </Link>
          </div>
          <div className="">
            <div className="flex my-4">
              {isFreeSample && freeSamples?.products.length > 0
                ? freeSamples.products.map((item, index) => {
                    return (
                      <Image
                        src={item.images[0]}
                        key={index}
                        width={249}
                        height={249}
                        alt={item.name}
                        className="w-20 h-20 mr-5"
                      />
                    );
                  })
                : isFreeSample && (
                    <div className="text-lg text-gray-500 font-bold px-5">
                      Empty cart
                    </div>
                  )}

              {cartStatus === "loading" && <p>Loading...</p>}
              {cartStatus === "failed" && <p>Error loading data from DB.</p>}
              {cartStatus === "succeeded" && cartdata && !isFreeSample
                ? cartdata.items.map((item, index) => {
                    return (
                      <Image
                        loading="lazy"
                        src={item.productId.images[0]}
                        width={249}
                        height={249}
                        alt={item.name}
                        className="w-20 h-20 mr-5"
                      />
                    );
                  })
                : !isFreeSample && (
                    <div className="text-lg text-gray-500 font-bold px-5">
                      Empty cart
                    </div>
                  )}
              <div className="flex ">
                {
                  // cartdata &&
                  //   cartdata.freeSamples.length > 0 &&
                  //   cartdata.freeSamples.map((item, index) => {
                  //     return (
                  //       <div>
                  //         <Image
                  //           loading="lazy"
                  //           src={item.images[0]}
                  //           width={249}
                  //           height={249}
                  //           alt={""}
                  //           className="w-20 h-20 mr-5"
                  //         />
                  //         {/* <p className="mt-[2px] text-[12px]  font-semibold">(Sample)</p> */}
                  //       </div>
                  //     );
                  //   })
                }
              </div>
            </div>
          </div>
          <h2 className="text- pb-3 text-black font-bold">Order summary</h2>
          <div className="flex items-center justify-between  border-slate-500 pb-3  ">
            <span className="text-[#767677]">Products price </span>
            <div className="font-[700] text-black">
              <div className="flex items-center">
                <Image
                  loading="lazy"
                  src="/icons/indianrupeesicon.svg"
                  width={18}
                  height={18}
                  alt="rupees"
                  className="mr-1"
                />
                {isFreeSample ? 0 : totalPrice}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between  border-slate-500 pb-3  ">
            <span className="text-[#767677]">Services price </span>
            <div className="font-[700] text-black">
              <div className="flex items-center">
                <Image
                  loading="lazy"
                  src="/icons/indianrupeesicon.svg"
                  width={18}
                  height={18}
                  alt="rupees"
                  className="mr-1"
                />
                {isFreeSample ? 0 : totalServicesPrice}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between  border-slate-500 pb-3 ">
            <span className="text-[#767677]">Accessories price </span>
            <div className="font-[700] text-black">
              <div className="flex items-center">
                <Image
                  loading="lazy"
                  src="/icons/indianrupeesicon.svg"
                  width={18}
                  height={18}
                  alt="rupees"
                  className="mr-1"
                />
                {isFreeSample ? 0 : totalAccessoryPrice}
              </div>
            </div>
          </div>

          {userId && (
            <>
              <div className="flex items-center justify-between ">
                <span className="text-black">External offer </span>
                <div className=" text-black font-[700]">
                  <div className="flex items-center">
                    <div className="flex items-center gap-1">
                      <span>&minus;</span>
                      <Image
                        loading="lazy"
                        src="/icons/indianrupeesicon.svg"
                        width={18}
                        height={18}
                        alt="rupees"
                        className="mr-1"
                      />
                    </div>
                    {otherApplicableExternalOffers
                      ? otherApplicableExternalOffers?.discountedAmount +
                        bankDiscountedAmount
                      : bankDiscountedAmount}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#767677] pb-6">
                {selectedBank.length > 0 ||
                otherApplicableExternalOffers?.discountedAmount > 0 ? (
                  <ul>
                    {appliedOffers.map((offer, ind) => (
                      <li key={offer + ind}>{offer}</li>
                    ))}
                  </ul>
                ) : (
                  <>No offers applied</>
                )}
              </p>
            </>
          )}

          <div className="flex items-center justify-between ">
            <span className="text-[#767677]">Delivery charge </span>
            <span>-</span>
          </div>
          <p className="text-xs text-[#767677] border-b-2 lg:border-b-4 border-black pb-6">
            calculated on distance and weight
          </p>
          <div className="flex items-center justify-between pb-2 lg:pb-4 mt-2">
            <span className="text-[#767677]">Subtotal </span>
            <div className="font-[700] text-black text-2xl">
              <div className="flex items-center">
                <Image
                  loading="lazy"
                  src="/icons/indianrupeesicon.svg"
                  width={20}
                  height={20}
                  alt="rupees"
                  className="mr-1"
                />
                {isFreeSample
                  ? 0
                  : otherApplicableExternalOffers
                  ? SumtotalPrice +
                    -bankDiscountedAmount -
                    otherApplicableExternalOffers.discountedAmount
                  : SumtotalPrice +
                    -(bankDiscountedAmount ? bankDiscountedAmount : 0)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pb-4">
            <span className="text-[#767677]">Total weight </span>
            <span className="text-[#767677] font-[700]">1.9 kg</span>
          </div>
          <div className="border border-[#e5e5e5] p-[20px] w-[100%] h-auto">
            <p className="text-black font-[600] ">
              Make the most of delivery charges
            </p>
            <p className="text-[#757575] text-[12px] pt-[5px]">
              The current delivery price of your order is Rs. 99 for up to 5 kg.
            </p>
          </div>

          {/* if user has not registered */}
          {!userId && (
            <div className="mt-5 border border-slate-500 p-[10px] lg:p-[20px] w-[100%] lg:w-[100%] h-auto">
              <p className="text-black font-[600]">
                Exclusive Member Offers Await!
              </p>
              <p className="text-[#757575] text-[12px] pt-[5px]">
                Register now to unlock special member-exclusive offers and
                discounts.
              </p>
              <div className="pt-[10px]">
                <Link href="/login" className="text-black font-bold underline">
                  Register Now
                </Link>
              </div>
            </div>
          )}

          {/* For those who have registered. Here are your offers */}
          {userId && <BankDiscountOptions />}

          {/* <div className="flex items-center justify-between py-4 font-bold">
            <span>Total </span>
            <span>$1000</span>
          </div> */}

          {/* <div className=" fixed h-full w-screen lg:hidden bg-black/50  backdrop:blur-sm top-0 right-0"></div> */}

          {/* <Link
            href="#"
            className="bg-slate-200 text-slate-900 rounded-lg py-2 px-4 font-normal"
          >
            Continue to Payment
          </Link> */}

          <div className="flex gap-4 items-center font-bold mt-14">
            <span>
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="cart-ingka-svg-icon"
                aria-hidden="true"
              >
                <path d="M19.205 5.599c.9541.954 1.4145 2.2788 1.4191 3.6137 0 3.0657-2.2028 5.7259-4.1367 7.5015-1.2156 1.1161-2.5544 2.1393-3.9813 2.9729L12 20.001v-2.3516c.6699-.4304 1.9095-1.2834 3.1347-2.4084 1.8786-1.7247 3.4884-3.8702 3.4894-6.0264-.0037-.849-.2644-1.6326-.8333-2.2015-1.1036-1.1035-2.9413-1.0999-4.0445.0014l-1.7517 1.7448-1.7461-1.7462c-1.1165-1.1164-2.9267-1.1164-4.0431 0-1.6837 1.6837-.5313 4.4136.6406 6.0155.3487.4768.7386.9326 1.1472 1.3617L8 11.9982l2 .0057-.017 6-6-.0171.0056-2 2.7743.0079c-.5387-.5472-1.0629-1.1451-1.5311-1.7852-1.0375-1.4183-1.8594-3.1249-1.8597-4.9957-.0025-1.2512.3936-2.5894 1.419-3.6149 1.8976-1.8975 4.974-1.8975 6.8716 0l.3347.3347.336-.3347c1.8728-1.8722 4.9989-1.8727 6.8716 0z"></path>
              </svg>
            </span>
            <div className="text-black underline">
              60 days and additional 30-day returns with Ayatrio Family
            </div>
          </div>

          <div className="flex gap-4  items-center font-bold mt-4">
            <span className="">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="cart-ingka-svg-icon"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 3C9.7909 3 8 4.7909 8 7v4H5v11h14V11h-3V7c0-2.2091-1.7909-4-4-4zm2 8V7c0-1.1046-.8954-2-2-2s-2 .8954-2 2v4h4zm-7 9v-7h10v7H7z"
                ></path>
              </svg>
            </span>
            <div className="text-black underline">
              Secure shopping with SSL data encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpin;
