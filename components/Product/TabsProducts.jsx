"use client";
import React, { useState, useEffect } from "react";
import NavigationItem from "../ProductPage/NavigationItem";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import "./styles.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setselectedproduct } from "../Features/Slices/compareSlice";
import {
  srtarr,
  categoryarr,
  wallpaperCollectionArr,
  flooringCollectionArr,
} from "./tabsArray";
import {
  renderSortItem,
  renderColor,
  renderOffer,
  renderDemand,
  renderSubCategory,
  renderPrice,
} from "./tabsRender";
import TabsProductContent from "../compounds/TabsProductContent";
import Measure from "./meausrement";
import axios from "axios";
import TabsProductCard from "./TabsProductCard";
import CategoryGrid from "./CategoryGrid";
import { selecteddbItems } from "../Features/Slices/cartSlice";
import { viewItemList } from "@/tag-manager/events/view_item_list";
import SubcategorySlider from "./SubcategorySlider";
import OfferSlider from "./OfferSlider";
import CardSkeleton from "../Cards/CardSkeleton";
const Tabs = ({
  filteredProductData,
  heading,
  allTypes,
  subCategory,
  categoryName,
  h1title,
  pdesc,
  features,
  faq,
  description,
  setType,
  offerCategory,
  parentCategory,
  setSelectedOfferCategory,
  onPageChange,
  totalPages,
  currentPage,
  firstGrid,
  secondGrid,
  type,
  isSubcategoryPage,
  data,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlenav = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=${id}`;
    const response = await axios.get(url);
    const data = response.data;
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: id });
  };
  const [filterData, setFilterdata] = useState([]);
  useEffect(() => {
    setFilterdata(filteredProductData);
    if (filteredProductData && filteredProductData.length > 0) {
      const colors = filteredProductData.flatMap((product) => product.colors);
      const uniqueColors = [...new Set(colors)];
      setAllColors(uniqueColors);

      const types = filteredProductData
        .map((product) => product.types)
        .filter((type) => type);
      const uniqueTypes = [...new Set(types)];
      setAllProductTypes(uniqueTypes);

      const offers = filteredProductData
        .map((product) => product.offer)
        .filter((offer) => offer);
      const uniqueOffers = [...new Set(offers)];
      setAllOffers(uniqueOffers);

      const demandTypes = filteredProductData
        .map((product) => product.demandtype)
        .filter((demandType) => demandType);
      const uniqueDemandTypes = [...new Set(demandTypes)];
      setAllDemandType(uniqueDemandTypes);

      const subcategory = filteredProductData
        .map((product) => product.subcategory)
        .filter((subcategory) => subcategory);
      const uniqueSubcategory = [...new Set(subcategory)];

      setAllSubcategory(uniqueSubcategory);
    }
  }, [filteredProductData]);

  const [allColors, setAllColors] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  // <<<<<<< Updated upstream
  const [allOffers, setAllOffers] = useState([]);
  const [allDemandType, setAllDemandType] = useState([]);
  const [AllsubCategory, setAllSubcategory] = useState([]);
  const allPrices = [
    { name: "Less than 1000", value: 1000 },
    { name: "Less than 5000", value: 5000 },
    { name: "Less than 10000", value: 10000 },
    { name: "Less than 20000", value: 20000 },
    { name: "Less than 50000", value: 50000 },
    { name: "Less than 100000", value: 100000 },
    { name: "Less than 100000", value: 100000 },
  ];

  const [selectedResult, setselectedResult] = useState(0);
  const [clearSelectedResult, setClearSelectedResult] = useState(false);
  const handleColorChange = (color) => {
    // Filter products by color
    // const filteredProducts = filteredProductData.filter((product) => {
    //   return product.colors.includes(color);
    // });

    let filteredProducts = [];
    if (color === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.colors.includes(color);
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    let filteredProducts = [];
    if (selectedSubCategory === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.subcategory === selectedSubCategory;
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  // >>>>>>> Stashed changes

  const handleTypeChange = (type) => {
    const filteredProducts = filteredProductData.filter((product) => {
      return product.type === type;
      // <<<<<<< Updated upstream
    });
    setFilterdata(filteredProducts);
  };

  const handleOfferChange = (offer) => {
    let filteredProducts = [];
    if (offer === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.offer === offer;
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handleDemandTypeChange = (demandType) => {
    // const filteredProducts = filteredProductData.filter((product) => {
    //   return product.demandtype === demandType;
    // });
    let filteredProducts = [];
    if (demandType === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return product.demandtype === demandType;
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const handlePriceChange = (price) => {
    let filteredProducts = [];
    if (price === "all") {
      filteredProducts = filteredProductData;
    } else {
      filteredProducts = filteredProductData.filter((product) => {
        return (
          (product.specialprice.price ||
            product.discountedprice.price ||
            product.perUnitPrice) <= price
        );
      });
    }
    setFilterdata(filteredProducts);
    setClearSelectedResult(true);
    setselectedResult(filteredProducts?.length);
  };

  const [activeTab, setActiveTab] = useState("all");

  const [openSort, setOpenSort] = React.useState(false);

  const handleOpen = () => {
    if (
      openSize === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false &&
      openPrice === false
    ) {
      setOpenSort(!openSort);
    }
  };

  useEffect(() => {
    if (filterData && filterData.length > 0) {
      viewItemList({
        items: filterData.map((product) => ({
          item_id: product._id,
          item_name: product.productTitle,
          item_category: product.category,
          price: product.perUnitPrice,
          currency: "INR",
          quantity: 1,
        })),
        itemListId: `category-${parentCategory}`,
        itemListName: parentCategory,
      });
    }
  }, [filterData]);

  const [openFilter, setOpenFilter] = useState("");

  const handleFilterClick = (Filter) => {};
  const [openAllsort, setopenallsort] = useState(false);
  const handleAllsort = () => {
    setopenallsort(!openAllsort);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [openSize, setOpenSize] = useState(false);
  const handleSize = () => {
    if (
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false &&
      openPrice === false
    ) {
      setOpenSize(!openSize);
    }
  };

  const [openAllSize, setOpenAllSIze] = useState(false);
  const handleAllSize = () => {
    setOpenAllSIze(!openAllSize);
  };

  // collection
  const [openDemandTYpe, setopenDemandTYpe] = useState(false);
  const handleDemandType = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false &&
      openPrice === false
    ) {
      setopenDemandTYpe(!openDemandTYpe);
    }
  };

  const [openPrice, setOpenPrice] = useState(false);
  const handlePrice = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openOffer === false
    ) {
      setOpenPrice(!openPrice);
    }
  };

  const [openAllDemandType, setOpenAllDemandType] = useState(false);
  const handleAllDemandType = () => {
    setOpenAllDemandType(!openAllDemandType);
  };

  const [openAllPrice, setOpenAllPrice] = useState(false);
  const handleAllPrice = () => {
    setOpenAllPrice(!openAllPrice);
  };

  const [openallOfferType, setopenallOfferType] = useState(false);
  const handleAllOfferType = () => {
    setopenallOfferType(!openallOfferType);
  };

  // ^^^^^^^^^^^^^^^^^^^^^^^^DemandType^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const [openWidth, setOpenWidth] = useState(false);
  const handleWidth = () => {
    setOpenWidth(!openWidth);
  };

  const [openHeight, setOpenHeight] = useState(false);
  const handleHeight = () => {
    setOpenHeight(!openHeight);
  };

  const [opencolor, setOpenColor] = useState(false);
  const handlecolor = () => {
    if (
      openSize === false &&
      openSort === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false &&
      openPrice === false
    ) {
      setOpenColor(!opencolor);
    }
  };

  const [openAllcolor, setOpenAllcolor] = useState(false);
  const handleAllcolor = () => {
    setOpenAllcolor(!openAllcolor);
  };

  const [openAllSubCategory, setOpenAllSuvbCategory] = useState(false);

  const handleallSubcategory = () => {
    setOpenAllSuvbCategory(!openAllSubCategory);
  };
  const [openCaategory, setOpenCategory] = useState(false);
  const handleCategory = () => {
    if (
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openAll === false &&
      openSize === false &&
      openOffer === false &&
      opensubcategory === false &&
      openPrice === false
    ) {
      setOpenCategory(!openCaategory);
    }
  };
  const [openAllCategory, setOpenAllCategory] = useState(false);
  const handleAllCategory = () => {
    setOpenAllCategory(!openAllCategory);
  };
  const [openAllType, setOpenAllType] = useState(false);
  const handleAllType = () => {
    setOpenAllType(!openAllType);
  };

  const [selectedCircle, setSelectedCircle] = useState([]);
  const handleClick = (idx) => {
    if (selectedCircle.includes(idx)) {
      setSelectedCircle(selectedCircle.filter((item) => item !== idx));
    } else {
      setSelectedCircle([...selectedCircle, idx]);
    }
  };

  const [openType, setOpenType] = useState(false);
  const handleType = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openAll === false &&
      openCaategory === false &&
      openOffer === false &&
      opensubcategory === false &&
      openPrice === false
    ) {
      setOpenType(!openType);
    }
  };
  const [openContent, setOpenCOntent] = useState(false);
  const handleContent = () => {
    setOpenCOntent(!openContent);
  };

  const [openAll, setOpenAll] = useState(false);
  const handleAll = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openCaategory === false &&
      openOffer === false &&
      opensubcategory === false &&
      openPrice === false
    ) {
      setOpenAll(true);
    }
  };

  const [openOffer, setOpenOffer] = useState(false);
  const handleOffer = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openCaategory === false &&
      openAll === false &&
      opensubcategory === false &&
      openPrice === false
    ) {
      setOpenOffer(!openOffer);
    }
  };

  const [opensubcategory, setOpensubcategory] = useState(false);

  const handlesubCategory = () => {
    if (
      openSize === false &&
      openSort === false &&
      opencolor === false &&
      openDemandTYpe === false &&
      openType === false &&
      openCaategory === false &&
      openAll === false &&
      openOffer === false &&
      openPrice === false
    ) {
      setOpensubcategory(!opensubcategory);
    }
  };

  const closeAll = () => {
    setOpenAll(false);
    setOpenAllType(false);
    setOpenAllCategory(false);
    setOpenAllcolor(false);
    setOpenAllSIze(false);
    setopenallsort(false);
    setOpenOffer(false);
  };

  const commonClasses =
    "px-[24px] py-[0.65rem] mr-2.5 rounded-full flex  whitespace-nowrap";

  // logic for stikey
  useEffect(() => {
    const handleScroll = () => {
      const firstDiv = document.querySelector(".bloc-tabs2");
      const thirdDiv = document.querySelector(".main-image-pdt");

      if (firstDiv && thirdDiv) {
        const firstDivHeight = firstDiv.offsetHeight;
        const thirdDivBottom =
          thirdDiv.getBoundingClientRect().bottom + window.scrollY;
        const windowBottom = window.scrollY;

        if (thirdDivBottom <= windowBottom + firstDivHeight) {
          firstDiv.style.position = "relative"; // Stop being sticky
        } else {
          firstDiv.style.position = "sticky"; // Be sticky
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //sorting
  const handleSorting = (selectedOption) => {
    let filterer = [...filterData];

    if (selectedOption.name === "Best match") {
      filterer = [...filterData];
      setFilterdata(filterer);
    } else if (selectedOption.name === "Price: high to low") {
      filterer = filterer.sort((a, b) => a.perUnitPrice - b.perUnitPrice);
      setFilterdata(filterer);
    } else if (selectedOption.name === "Price: low to high") {
      filterer = filterer.sort((a, b) => b.perUnitPrice - a.perUnitPrice);
      setFilterdata(filterer);
    } else if (selectedOption.name === "Newest") {
      filterer = filterer.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilterdata(filterer);
    } else if (selectedOption.name === "Name") {
      filterer = filterer.sort((a, b) =>
        a.productTitle.localeCompare(b.productTitle)
      );
      setFilterdata(filterer);
    } else {
      setFilterdata(filteredProductData);
    }

    setselectedResult(filterer?.length);
  };

  const collectionArr =
    heading === "Wallpaper" ? wallpaperCollectionArr : flooringCollectionArr;
  // const [anyCheckboxSelected, setAnyCheckboxSelected] = useState(false);
  const [selectedpdt, selectedsetpdt] = useState([]);
  const handleCheckbox = (item, isChecked) => {
    if (isChecked) {
      selectedsetpdt([...selectedpdt, item]);
    } else {
      selectedsetpdt(selectedpdt.filter((i) => i._id !== item._id));
      if (selectedpdt.length === 1) {
      }
    }
  };
  const pathname = usePathname();

  const [showCompare, setShowcompare] = useState(false);
  const [activeCompare, setActiveCompare] = useState(true);
  const handleCompareClick = () => {
    dispatch(setselectedproduct(selectedpdt));
    if (selectedpdt.length === 3) {
      setShowcompare(true);
      setActiveCompare(false);
      router.push(pathname + "/compare2");
    } else if (selectedpdt.length === 2) {
      setShowcompare(true);
      setActiveCompare(false);
      router.push(pathname + "/compare2");
    } else {
      alert("Please select minimum two items");
    }
  };

  const activebtn =
    selectedpdt.length < 2 ? "bg-gray-300 text-white" : "bg-black text-white";

  const stars = new Array(4)
    .fill("/icons/star full black.svg")
    .concat("/icons/half black half white.svg");

  // const [cartData, setCartData] = useState([]);
  const cartData = useSelector(selecteddbItems);

  const isProductInCart = (productId) => {
    return cartData?.items?.some((cartItem) => {
      return cartItem?.productId?._id === productId;
    });
  };

  const handleFilterColor = (text) => {
    const newFilteredData = filterData?.filter((data) =>
      data.productImages?.some((imageSet) => imageSet.color === text)
    );
    setFilterdata(newFilteredData);
  };

  const handleRemoveallFilters = () => {
    setFilterdata(filteredProductData);
    setOpenAll(false);
    setselectedResult(0);
    setClearSelectedResult(false);
  };

  const handleViewResult = () => {
    setOpenAll(false);
    setselectedResult(0);
  };

  const renderPaginationControls = () => {
    const [pagesToShow, setPagesToShow] = useState(5);
    const pages = [];

    if (totalPages > 1) {
      for (let i = 1; i <= Math.min(pagesToShow, totalPages); i++) {
        pages.push(
          <button
            key={i}
            className={`text-center text-[14px] font-semibold border max-w-fit bg-gray-100 cursor-pointer px-[24px] py-[0.65rem] mr-2.5 rounded-full flex whitespace-nowrap ${
              currentPage === i ? "bg-gray-200" : ""
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (pagesToShow < totalPages) {
        pages.push(
          <button
            key="more"
            className="text-center text-[14px] font-semibold border max-w-fit bg-gray-100 cursor-pointer px-[24px] py-[0.65rem] mr-2.5 rounded-full flex whitespace-nowrap"
            onClick={() => setPagesToShow(pagesToShow + 5)}
          >
            More
          </button>
        );
      }
    }

    return pages;
  };

  const [filteredSubCategory, setSubCategory] = useState(null);

  useEffect(() => {
    if (isSubcategoryPage) {
      const filtered = subCategory?.filter(
        (sub) => sub.name === pathname.split("/")[1].replace(/-/g, " ")
      );

      setSubCategory(filtered);
    } else if (pathname.split("/")[3] !== "all") {
      const filtered = subCategory?.filter(
        (data) => data.name === pathname.split("/")[3].replace(/-/g, " ")
      );
      setSubCategory(filtered);
    }
  }, [subCategory]);

  const [offerCategoryData, setOfferCategoryData] = useState([]);

  useEffect(() => {
    const fetchOfferCategory = async () => {
      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/getAllCategoryByOffer/${encodeURI(type)}`;
      const response = await axios.get(apiUrl);
      setOfferCategoryData(response.data);
    };
    if (parentCategory === "offers") {
      fetchOfferCategory();
    }
  }, [type]);

  const renderDescription = (description) => {
    if (!description) return null;

    // If the description is an array, we handle it accordingly
    if (Array.isArray(description)) {
      return description.map((desc, index) =>
        renderDescriptionForString(desc, index)
      );
    }

    // Handle single string descriptions
    return renderDescriptionForString(description);
  };
  const renderPdescDescription = (pdesc) => {
    if (!pdesc?.description) return null;

    let { description, linkText } = pdesc;

    if (!linkText || linkText.length === 0) {
      return description; // Return plain text if no links
    }

    let elements = [description];

    linkText.forEach((item, i) => {
      elements = elements.flatMap((part, index) =>
        typeof part === "string"
          ? part.split(item.text).flatMap((chunk, idx, arr) =>
              idx < arr.length - 1
                ? [
                    chunk,
                    <a
                      key={`${item.text}-${i}-${idx}`}
                      href={item.link}
                      style={{ color: "#0152be", textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>,
                  ]
                : chunk
            )
          : part
      );
    });

    return elements;
  };
  const renderFeatureDescription = (feature) => {
    if (!feature?.description) return null;

    let { description, descriptionLinks } = feature;

    if (!descriptionLinks || descriptionLinks.length === 0) {
      return <p>{description}</p>; // Return plain text if no links
    }

    let elements = [description[0]];

    descriptionLinks.forEach((item, i) => {
      elements = elements.flatMap((part, index) =>
        typeof part === "string"
          ? part.split(item.text).flatMap((chunk, idx, arr) =>
              idx < arr.length - 1
                ? [
                    chunk,
                    <a
                      key={`${item.text}-${i}-${idx}`}
                      href={item.link}
                      style={{ color: "#0152be", textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>,
                  ]
                : chunk
            )
          : part
      );
    });

    return <p style={{ whiteSpace: "pre-wrap" }}>{elements}</p>;
  };

  const renderDescriptionForString = (description, index) => {
    const words = description.split(" ");
    const renderedContent = [];
    let currentWord = null;

    words.forEach((word) => {
      if (word.includes("|")) {
        const [text, url] = word.split("|");

        // Add the current accumulated word (if any)
        if (currentWord) {
          renderedContent.push(
            <span key={`${index}-${currentWord}`}>{currentWord} </span>
          );
        }

        // Ensure the URL has the proper protocol
        const formattedUrl =
          url.startsWith("http://") || url.startsWith("https://")
            ? url
            : url.startsWith("www")
            ? `https://${url}`
            : `https://${url}`;

        renderedContent.push(
          <a
            key={`${index}-${text}`}
            href={formattedUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0152be", textDecoration: "none", marginRight: "4px" }}
          >
            {text}
          </a>
        );

        currentWord = null; // Reset the current word
      } else {
        // Accumulate non-link words
        currentWord = currentWord ? `${currentWord} ${word}` : word;
      }
    });

    // Push any remaining word
    if (currentWord) {
      renderedContent.push(
        <span key={`${index}-${currentWord}`}>{currentWord} </span>
      );
    }

    // return <div key={index}>{renderedContent}</div>;
    return renderedContent;
  };

  // const renderDescription = (description) => {
  //   if (!description) return null;

  //   // If the description is an array, we handle it accordingly
  //   if (Array.isArray(description)) {
  //     return description.map((desc, index) =>
  //       renderDescriptionForString(desc, index)
  //     );
  //   }

  //   // Handle single string descriptions
  //   return renderDescriptionForString(description);
  // };

  // const renderDescriptionForString = (description, index) => {
  //   const words = description.split(" ");
  //   const renderedContent = [];

  //   let currentWord = null;
  //   let link = null;

  //   words.forEach((word) => {
  //     if (word.includes("|")) {
  //       const [text, url] = word.split("|");

  //       if (currentWord) {
  //         renderedContent.push(
  //           <span key={index + "-" + currentWord}>{currentWord} </span>
  //         );
  //       }

  //       renderedContent.push(
  //         <a
  //           key={index + "-" + text}
  //           href={
  //             url.startsWith("http") || url.startsWith("www")
  //               ? url
  //               : `https://${url}`
  //           }
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           style={{ color: "blue", marginRight: "4px" }}
  //         >
  //           {text}
  //         </a>
  //       );

  //       currentWord = null;
  //     } else {
  //       if (currentWord) {
  //         currentWord += " " + word;
  //       } else {
  //         currentWord = word;
  //       }
  //     }
  //   });

  //   if (currentWord) {
  //     renderedContent.push(
  //       <span key={index + "-" + currentWord}>{currentWord} </span>
  //     );
  //   }

  //   return <div key={index}>{renderedContent}</div>;
  // };

  const [isSubcategorySelected, setIsSubcategorySelected] = useState(false);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsSubcategorySelected(true);
  };

  return (
    <div className="">
      {openAll && <div className="background-overlay open"></div>}
      
      <div className="md:px-[52px] sm:px-[20px] px-[12px] ">
        <div className="flex flex-col overflow-hidden">
          <div className="md:mt-36 mt-10" />
          <h1 className="Blinds font-semibold text-2xl pb-[20px] lg:pt-[30px] capitalize">
            {!isSubcategoryPage
              ? h1title || heading
              : filteredSubCategory?.length > 0
              ? filteredSubCategory[0]?.h1title
              : h1title || heading}

            {/* {!isSubcategoryPage && pathname.split("/")[3] !== "all" && (
              <p>
              {pathname
              .split("/")[3]
              .replace(/-/g, " ")
              .replace(/percent/g, "%")}
              </p>
              )} */}

            {/* {isSubcategorySelected && selectedSubcategory && (
              <>
              {selectedSubcategory.h1title ? (
                <h1>{selectedSubcategory.h1title}</h1>
                ) : (
                  <p>{pathname.split("/")[1].replace(/-/g, " ")}</p>
                  )}
                  </>
                  )} */}
          </h1>
          <div className="flex items-center">
            {!subCategory &&
              offerCategoryData.length === 0 &&
              allTypes.length === 0 && (
                <div className="group flex flex-col justify-start gap-6 mb-4">
                  <div className="flex gap-4">
                    <div className="h-20 w-32 bg-gray-100"></div>
                    <div className="h-20 w-32 bg-gray-100"></div>
                    <div className="h-20 w-32 bg-gray-100"></div>
                    <div className="h-20 w-32 bg-gray-100"></div>
                  </div>
                </div>
              )}
            {subCategory ? (
              <div className="group flex flex-row items-center justify-start gap-2 mb-4">
                <SubcategorySlider
                  pathname={pathname}
                  subCategory={subCategory}
                  filteredSubCategory={filteredSubCategory}
                  setType={setType}
                  onSubcategoryClick={() => setIsSubcategorySelected(true)}
                  onSubcategorySelect={handleSubcategorySelect}
                  title={heading}
                />
              </div>
            ) : (
              parentCategory &&
              (parentCategory === "offers" && offerCategoryData ? (
                <div className="group flex flex-row items-center justify-start gap-2 mb-4 w-full">
                  <OfferSlider
                    offerCategoryData={offerCategoryData}
                    setSelectedOfferCategory={setSelectedOfferCategory}
                    subCategory={subCategory}
                  />
                </div>
              ) : (
                parentCategory === "demandtype" &&
                allTypes && (
                  <div className="mt-2 grid mb-4 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 gap-y-4">
                    {allTypes.map((type, idx) => (
                      <div key={idx} className=" gap-2">
                        <div className="flex items-center gap-4 cursor-pointer ">
                          <h1
                            onClick={() => setType(type)}
                            className="text-black bg-zinc-200 hover:bg-zinc-100 px-4 py-2"
                          >
                            {type}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ))
            )}
          </div>
        </div>

        <p className="leading-2 mb-4 text-[14px] pt-[5px] lg:w-[90%] line-clamp-3">
          {/* {isSubcategorySelected
            ? renderPdescDescription(selectedSubcategory?.pdesc)
            : renderPdescDescription(pdesc)} */}
          {!isSubcategoryPage
            ? renderPdescDescription(pdesc)
            : filteredSubCategory?.length > 0
            ? renderPdescDescription(filteredSubCategory[0]?.pdesc)
            : renderPdescDescription(pdesc)}
        </p>

       
       

        {/* <p className="leading-2 mb-4 text-[14px] pt-[5px]  lg:w-[70%] line-clamp-2">{description}</p> */}
        <div className="flex sticky top-0 z-[9996] bg-white py-2 sm:py-4 overflow-x-auto md:overflow-x-visible mb-[5px] md:mb-0 ">
          {/* Filter Skeleton */}
          {!filteredProductData ||
            ((filteredProductData?.length === 0 ||
              JSON.stringify(filteredProductData) === "{}") && (
              <div className="overflow-x-auto flex items-center gap-4 w-full">
                <div className="w-24 h-10 rounded-full bg-gray-100"></div>
                <div className="w-24 h-10 rounded-full bg-gray-100"></div>
                <div className="w-24 h-10 rounded-full bg-gray-100"></div>
                <div className="w-24 h-10 rounded-full bg-gray-100"></div>
              </div>
            ))}
          {filteredProductData?.length > 0 && (
            <TabsProductContent
              filterName={"Sort"}
              commonClasses={commonClasses}
              isFilterOpen={openSort}
              handleAll={handleAll}
              handleTabClick={handleTabClick}
              handleFilter={handleOpen}
              handleAllFilter={handleAllsort}
              filterArr={srtarr}
              renderFilter={(text, idx) =>
                renderSortItem(text, idx, handleSorting)
              }
            />
          )}
          {filteredProductData &&
            filteredProductData?.length > 0 &&
            AllsubCategory &&
            AllsubCategory.length > 0 && (
              <TabsProductContent
                filterName={"Styles"}
                commonClasses={commonClasses}
                isFilterOpen={opensubcategory}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handlesubCategory}
                handleAllFilter={handleallSubcategory}
                filterArr={AllsubCategory}
                renderFilter={(text, idx) =>
                  renderSubCategory(
                    text,
                    idx,
                    handleSubCategoryChange,
                    AllsubCategory.length
                  )
                }
              />
            )}

          {filteredProductData &&
            filteredProductData?.length > 0 &&
            allColors &&
            allColors.length > 0 && (
              <TabsProductContent
                filterName={"Colors"}
                commonClasses={commonClasses}
                isFilterOpen={opencolor}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handlecolor}
                handleAllFilter={handleAllcolor}
                filterArr={allColors}
                renderFilter={(text, idx) =>
                  renderColor(text, idx, handleColorChange, allColors.length)
                }
              />
            )}

          {filteredProductData &&
            filteredProductData.length > 0 &&
            allOffers &&
            allOffers.length > 0 && (
              <TabsProductContent
                filterName={"Offers"}
                commonClasses={commonClasses}
                isFilterOpen={openOffer}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handleOffer}
                handleAllFilter={handleAllOfferType}
                filterArr={allOffers}
                renderFilter={(text, idx) =>
                  renderOffer(text, idx, handleOfferChange, allOffers.length)
                }
                openContent={openContent}
                handleContent={handleContent}
              />
            )}

          {filteredProductData &&
            filteredProductData?.length > 0 &&
            allDemandType &&
            allDemandType.length > 0 && (
              <TabsProductContent
                filterName={"New"}
                commonClasses={commonClasses}
                isFilterOpen={openDemandTYpe}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handleDemandType}
                handleAllFilter={handleAllDemandType}
                filterArr={allDemandType}
                renderFilter={(text, idx) =>
                  renderDemand(
                    text,
                    idx,
                    handleDemandTypeChange,
                    allDemandType.length
                  )
                }
              />
            )}

          {filteredProductData &&
            filteredProductData?.length > 0 &&
            allPrices &&
            allPrices.length > 0 && (
              <TabsProductContent
                filterName={"Price"}
                commonClasses={commonClasses}
                isFilterOpen={openPrice}
                handleAll={handleAll}
                handleTabClick={handleTabClick}
                handleFilter={handlePrice}
                handleAllFilter={handleAllPrice}
                filterArr={allPrices}
                renderFilter={(text, idx) =>
                  renderPrice(text, idx, handlePriceChange, allPrices.length)
                }
              />
            )}

          {filteredProductData && filteredProductData?.length > 0 && (
            <div>
              <button
                onClick={() => {
                  handleAll();
                  handleTabClick();
                }}
                className={`Tabbtn z-0 bg-gray-100
                  ${
                    openAll
                      ? `active-tabs  border border-black px-[24px] text-[14px] font-medium ${commonClasses}`
                      : `tabS  border border-white px-[24px] ${commonClasses} text-[14px] font-medium`
                  }
                  ${
                    typeof window !== "undefined" && window.innerWidth <= 450
                      ? " justify-center px-[24px] text-[14px] font-medium"
                      : " justify-between px-[24px] text-[14px] font-medium"
                  }
                  `}
              >
                All Filters &nbsp;
                <Image
                  loading="lazy"
                  src="/icons/filter.svg"
                  width={20}
                  height={20}
                  className={`w-4 h-4 mt-1  sm:block hidden


                `}
                  alt="icon"
                />
              </button>
            </div>
          )}
        </div>
        <div>
          {openAll ? (
            <div className="menu-overlay z-[9999]  bg-white  border-2 fixed  sm:w-[30vw] w-[100vw] sm:h-[100vh] h-[80vh]  right-0  bottom-0 ">
              <div className="flex border-b py-4 mb-10 w-full items-center justify-center">
                <p className="text-center text-[16px] text-[#111111] font-semibold">
                  Filter and sort
                </p>

                <Image
                  loading="lazy"
                  className="absolute right-3 px-[2px]"
                  src="/icons/cancel.svg"
                  width={20}
                  height={20}
                  onClick={closeAll}
                  color="black"
                  alt="close icon"
                />
              </div>
              <div className="menu-option bg-white  overflow-y-scroll mb-[20rem]  min-h-fit max-h-[50vh] md:max-h-[70vh]  pt-5  w-[100%]  border-slate-600 z-50">
                <div className="flex flex-col gap-6 px-4">
                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllsort}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Sort &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/downarrow.svg"
                        width={20}
                        height={20}
                        className={`w-5 h-5  mt-1
                ${openAllsort ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllsort ? (
                      <div className="flex flex-col gap-7">
                        {srtarr.map((text, idx) =>
                          renderSortItem(text, idx, handleSorting)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />

                  {pathname.includes("Wallpaper") ? (
                    <>
                      <div className="flex flex-col gap-7">
                        <div
                          onClick={handleAllCategory}
                          className="flex justify-between text-left"
                        >
                          Design style &nbsp;
                          <Image
                            loading="lazy"
                            src="/icons/downarrow.svg"
                            width={20}
                            height={20}
                            className={`w-5 h-5  mt-1
                ${openAllCategory ? " rotate-45" : "-rotate-180"}

                `}
                            alt="arrow icon"
                          />
                        </div>
                        {openAllCategory ? (
                          <div className="flex flex-col gap-7">
                            {categoryarr.map(rendercategory)}
                          </div>
                        ) : null}
                      </div>
                      <hr />
                    </>
                  ) : null}

                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllcolor}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Color &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/downarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openAllcolor ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllcolor ? (
                      <div className="flex flex-col gap-7">
                        {allColors.map((text, idx) =>
                          renderColor(text, idx, handleColorChange)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />

                  {heading === "Wallpaper" ? (
                    <>
                      <div className="flex flex-col gap-7">
                        <div
                          onClick={handleAllCategory}
                          className="flex justify-between text-left text-[14px] font-semibold "
                        >
                          Design style &nbsp;
                          <Image
                            loading="lazy"
                            src="/icons/downarrow.svg"
                            width={40}
                            height={40}
                            className={`w-5 h-5  mt-1
                ${openAllCategory ? " rotate-90" : "-rotate-90"}

                `}
                            alt="arrow icon"
                          />
                        </div>
                        {openAllCategory ? (
                          <div className="flex flex-col gap-7">
                            {categoryarr.map(rendercategory)}
                          </div>
                        ) : null}
                      </div>
                      <hr />
                    </>
                  ) : null}

                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllDemandType}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Latest &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/downarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openAllDemandType ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllDemandType ? (
                      <div className="flex flex-col gap-7">
                        {allDemandType.map((text, idx) =>
                          renderDemand(text, idx, handleDemandTypeChange)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />
                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllOfferType}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Offer &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/downarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openallOfferType ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openallOfferType ? (
                      <div className="flex flex-col gap-7">
                        {allOffers.map((text, idx) =>
                          renderOffer(text, idx, handleOfferChange)
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />
                  <div className="flex flex-col gap-7">
                    <div
                      onClick={handleAllPrice}
                      className="flex justify-between text-left text-[14px] font-semibold "
                    >
                      Price &nbsp;
                      <Image
                        loading="lazy"
                        src="/icons/downarrow.svg"
                        width={40}
                        height={40}
                        className={`w-5 h-5  mt-1
                ${openAllPrice ? " rotate-90" : "-rotate-90"}

                `}
                        alt="arrow icon"
                      />
                    </div>
                    {openAllPrice ? (
                      <div className="flex flex-col gap-7">
                        {allPrices.map((text, idx) =>
                          renderPrice(
                            text,
                            idx,
                            handlePriceChange,
                            allPrices.length
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                  <hr />
                </div>
              </div>
              <div className="flex bg-white z-50 flex-col absolute bottom-0 left-0 right-0 items-center justify-center gap-3 pt-3 px-4 pb-2">
                <button
                  onClick={handleViewResult}
                  className="bg-black text-white w-full h-9 text-[14px] font-semibold rounded-full "
                >
                  View {selectedResult}
                </button>
                <button
                  onClick={handleRemoveallFilters}
                  className={` ${
                    clearSelectedResult
                      ? "bg-white border-[1.5px] border-black"
                      : "bg-[#929292] opacity-50"
                  } text-[14px] font-semibold text-black  w-full h-9 rounded-full`}
                >
                  Clear all
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {/* iimages */}
        <div div className="flex flex-col image-product">
          <div className="text-right">
            {showCompare && (
              <button
                onClick={handleCompareClick}
                disabled={selectedpdt.length < 2}
                className={`bg-black text-white px-3 py-2 whitespace-nowrap rounded-full ${activebtn} `}
              >
                Compare Products
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 cursor-pointer gap-x-4 py-1 sm:py-3 gap-y-8">
            {filterData && filterData.length > 0 ? (
              filterData.map((text, idx) => {
                const inCart = isProductInCart(text?._id);
                return (
                  <>
                    <TabsProductCard
                      id={text._id}
                      text={text}
                      totalPrice={text.totalPrice}
                      discountedprice={text.discountedprice}
                      specialprice={text.specialprice}
                      productDescription={text.productDescription}
                      productTitle={text.productTitle}
                      productImages={text.productImages}
                      images={text.images}
                      productId={text.productId}
                      idx={idx}
                      handlenav={handlenav}
                      selectedpdt={selectedpdt}
                      handleCheckbox={handleCheckbox}
                      setShowcompare={setShowcompare}
                      demandtype={text.demandtype}
                      ratings={text.ratings}
                      stars={stars}
                      parentCategory={parentCategory}
                      offer={text.offer}
                      inCart={inCart}
                      shortDescription={text.shortDescription}
                      perUnitPrice={text.perUnitPrice}
                      productType={text.productType}
                      urgency={text.urgency}
                      unitType={text.unitType}
                      expectedDelivery={text.expectedDelivery}
                    />

                    {firstGrid && idx == 2 && <CategoryGrid grid={firstGrid} />}
                    {secondGrid && idx == 6 && (
                      <CategoryGrid grid={secondGrid} />
                    )}
                  </>
                );
              })
            ) : (
              <>
                {/* <p></p> */}
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </div>

          {filteredProductData?.length > 0 && (
            <Measure category={filteredProductData[0].category} />
          )}

          <div className="self-center flex items-center  gap-2 mt-20">
            {renderPaginationControls()}
          </div>
        </div>
      </div>

      {/* <div className="md:px-[52px] sm:ml-[12px] ml-[12px] md:ml-[0px] bg-[#ffffff] mt-4">
        {!isSubcategorySelected
          ? features?.map((feature, featureIdx) => (
              <div key={featureIdx}>
                <div className="mt-4">
                  <div className="text-[14px] text-[#484848] flex items-center">
                    <span className="text-[16px] text-[#000000]">
                      {feature.title}:
                    </span>{" "}
                    <span className="ml-2">
                      {feature.description &&
                        feature.description[0] &&
                        renderDescription(feature.description[0])}
                    </span>
                  </div>
                </div>
              </div>
            ))
          : selectedSubcategory?.features?.map((feature, featureIdx) => (
              <div key={featureIdx} className="mt-4">
                <div className="text-[14px] text-[#484848] flex items-center">
                  <span className="text-[16px] text-[#000000]">
                    {feature.title}:
                  </span>{" "}
                  <span className="ml-2">
                    {feature.description &&
                      feature.description[0] &&
                      renderDescription(feature.description[0])}
                  </span>
                </div>
              </div>
            ))}
      </div> */}

      {/* <div className="md:px-[52px] sm:ml-[12px] ml-[12px] md:ml-[0px] bg-[#ffffff] mt-[60px]">
        {(faq?.length > 0 || selectedSubcategory?.faq?.length > 0) && (
          <h1 className="Blinds font-semibold text-2xl pb-[20px] lg:pt-[30px] capitalize">
            FAQS
          </h1>
        )}

        {!isSubcategorySelected
          ? faq?.map((item) => (
              <div key={item._id} className="mt-2">
                <div className="text-[14px] text-[#484848]">
                  {item.question && item.answer ? (
                    <>
                      <h2 className="text-[16px] text-[#000000]">
                        {item.question}
                      </h2>
                      <h3>{item.answer}</h3>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[16px] text-[#000000]">
                        {item.heading}
                      </h2>
                      <h3>{item.description}</h3>
                    </>
                  )}
                </div>
              </div>
            ))
          : selectedSubcategory?.faq?.map((faqItem) => (
              <div key={faqItem._id} className="mt-4">
                <div className="text-[14px] text-[#484848]">
                  {faqItem.question && faqItem.answer ? (
                    <>
                      <h2 className="text-[16px] text-[#000000]">
                        {faqItem.question}
                      </h2>
                      <h3>{faqItem.answer}</h3>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[16px] text-[#000000]">
                        {faqItem.heading}
                      </h2>
                      <h3>{faqItem.description}</h3>
                    </>
                  )}
                </div>
              </div>
            ))}
      </div> */}
      <div className="pl-[52px]" >
       <div className="md:mt-[100px] mt-[80px]">
          <NavigationItem 
            product={
              filteredProductData && filteredProductData.length > 0 
                ? {
                    category: parentCategory || (filteredProductData[0]?.category || ""),
                    subcategory: isSubcategoryPage 
                      ? pathname.split("/")[1].replace(/-/g, " ") 
                      : "",
                    productTitle: ""
                  }
                : { category: parentCategory || "", subcategory: "", productTitle: "" }
            } 
          />
        </div>
       

<div>
        {Array.isArray(subCategory) && subCategory.length > 0 ? (
          subCategory.map((sub) => {
            const pageUrl = `/${sub.name?.replace(
              / /g,
              "-"
            )}/subcollection/${parentCategory.replace(/ /g, "-")}`;
            return (
              <>
                <a href={pageUrl} className="text-[#0152be] font-medium text-[14px] py-3">
                  {sub.name}
                </a>
                ,{" "}
              </>
            );
          })
        ) : (
          <p className="text-[#2874f0] py-3"></p>
        )}
      </div> </div>

      <div className=" md:mx-[52px] sm:mx-[20px] mx-[10px] bg-[#ffffff]  sm:flex-row flex flex-col gap-7 mt-6">
        <div className="sm:w-3/4 py-3 w-full">
          {!isSubcategoryPage
            ? features?.map((feature, featureIdx) => (
                <div key={featureIdx} className="">
                  <div className="">
                    <h2 className="text-[14px] font-medium text-[#6e6e73]">
                      {feature.title}:{" "}
                    </h2>
                    <p className="text-[13px] text-[#6e6e73] pt-[3px] pb-[15px]">
                      {feature.description &&
                        feature.description[0] &&
                        renderFeatureDescription(feature)}
                    </p>
                  </div>
                </div>
              ))
            : filteredSubCategory &&
              filteredSubCategory[0]?.features?.map((feature, featureIdx) => (
                <div key={featureIdx} className="">
                  <div className="pt-3">
                    <h2 className="text-[14px] text-[#6e6e73]">
                      {feature.title}:{" "}
                    </h2>
                    <p className="text-[12px] text-[#878787] pt-[3px]">
                      {feature.description &&
                        feature.description[0] &&
                        renderFeatureDescription(feature)}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        <div className="sm:w-1/4 py-3  w-full">
          <h2 className="mb-[10px] text-[#707072] font-medium font-inter text-[14px]">
            {filterData && filterData.length > 0 && filterData[0].category
              ? `${filterData[0].category} Price List`
              : "Wallpapers Price List"}
          </h2>
          <hr />

          {filterData && filterData.length > 0 && filterData[0].category ? (
            <div className="border-gray-950 flex justify-between py-3 pr-3">
              <p className="text-[#707072] font-inter text-[14px]">
                {filterData[0].category} {/* Dynamically rendering category */}
              </p>
              <p className="text-[#707072] font-inter text-[14px]">Price</p>
            </div>
          ) : null}
          <hr />

          {filterData && filterData.length > 0 ? (
            filterData.slice(0, 10).map((text, idx) => {
              const pageUrl = `/${text.productTitle?.replace(/ /g, "-")}/${
                text.productId
              }`;
              return (
                <>
                  <div
                    key={text._id}
                    className="border-gray-950 flex justify-between py-3 pr-3"
                  >
                    <p className="text-[#878787] font-inter text-[14px]">
                      {idx + 1}.{" "}
                      <span className="text-[#0152be]">
                        <a href={pageUrl}>{text.productTitle}</a>
                      </span>
                    </p>
                    <p className="text-[#878787] font-inter text-[14px]">
                      Rs.{" "}
                      {text.discountedprice?.price != null
                        ? text.discountedprice.price
                        : text.perUnitPrice}
                    </p>
                  </div>
                  <hr />
                </>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-[50vh] w-full">
              <h3 className="text-2xl"></h3>
            </div>
          )}
        
        </div>
      </div>
      

      <div className="md:px-[52px] sm:ml-[12px] ml-[12px] md:ml-[0px] bg-[#ffffff] ">
        {(faq?.length > 0 ||
          (filteredSubCategory && filteredSubCategory[0]?.faq?.length > 0)) && (
          <h2 className="text-[#000000] font-semibold text-[16px] lg:pt-[30px] capitalize">
            Question and Answers
          </h2>
        )}

        {!isSubcategoryPage
          ? faq?.map((item) => (
              <div key={item._id} className="mt-2 ">
               
                <div className="text-[14px] tracking-normal text-[#000000] py-2">
                  {item.question && item.answer ? (
                    <>
                      <h2 className="font-medium text-[#6e6e73]">
                        Q. {item.question}?
                      </h2>
                      <h3 className="w-4/5 pt-[5px] text-[#6e6e73]">A.{item.answer}.</h3>
                    </>
                  ) : (
                    <>
                      <h2 className="font-medium text-[#6e6e73]">
                        Q.{item.heading}?
                      </h2>
                      <h3 className="w-4/5 pt-[5px] text-[#6e6e73]">A.{item.description}.</h3>
                    </>
                  )}
                </div>
              </div>
            ))
          : filteredSubCategory &&
            filteredSubCategory[0]?.faq?.map((faqItem) => (
              <div key={faqItem._id} className="mt-4">
                <div className="text-[14px] text-[#000000]">
                  {faqItem.question && faqItem.answer ? (
                    <>
                      <h2 className="text-[14px] font-medium  text-[#6e6e73]">
                        Q.{faqItem.question}
                      </h2>
                      <h3>A.{faqItem.answer}</h3>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[14px] font-medium  text-[#6e6e73]">
                        Q.{faqItem.heading}
                      </h2>
                      <h3 className="text-[#6e6e73]">A.{faqItem.description}</h3>
                    </>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Tabs;
