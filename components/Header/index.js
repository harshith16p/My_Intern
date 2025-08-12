"use client";
import React, { useRef } from "react";
import "./styles.css";
import { useEffect, useState } from "react";
import Asidebox from "./AsideSection/Asidebox";
import Expandedbar from "./Expandedbar";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TopHeader from "./TopHeader";
import { headerLinks } from "@/Model/Dropdown/AsideData/AsideData";
import Midsection from "./Midsection/Midsection";
import { useDispatch, useSelector } from "react-redux";
// import { MenuIcon, X } from "lucide-react";
import TopHeaderWrapper from "./TopHeaderWrapper";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import axios from "axios";
import { selecteddbItems, setDbItems } from "../Features/Slices/cartSlice";

function Header({ setIsHeaderMounted }) {
  useEffect(() => {
    if (setIsHeaderMounted) {
      setIsHeaderMounted(true);
    }
  });

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const CartItems = useSelector(selecteddbItems);
  const [sidebarNavigationItem, setSidebarNavigationItem] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
          {
            params: {
              deviceId: localStorage.getItem("deviceId"),
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("HTTP status " + response.status);
        }
        const data = response.data;

        dispatch(setDbItems(data));
      } catch (error) {}
    };
    fetchData();
  }, []);

  // Filter

  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search");

  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  // aside section toggle
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log(isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setHoveredIndex(null);
    if (toptext !== "") {
      setTopText("");
    }

    if (document.body.style.overflow != "hidden") {
      document.body.style.overflow = "hidden";
    } else if ((document.body.style.overflow = "hidden")) {
      document.body.style.overflow = "auto";
    }

    if (pathname !== "/") {
      if ((document.body.style.overflow = "visible")) {
        document.body.style.overflow = "visible";
      }
    }
  };

  const toggleDropdown = (item) => {
    console.log(item);
    setSidebarNavigationItem(item);
    console.log(open);
    setIsOpen(!isOpen);
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsOpen(true);
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsOpen(false);
    setIsHovered(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClose = () => {
    setSearchQuery("");
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleLinkClick = (path) => {
    // console.log(isLoading);
    setIsLoading(true);
    // console.log(isLoading);
    setTimeout(() => {
      router.push(path);
      setIsLoading(false);
    }, 1310);
  };

  const [isModalOPen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    if (window.matchMedia("(max-width: 768px)").matches) {
      document.body.style.overflow = "hidden";
    }
  };
  const handleModalClose = (event) => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
    onClose();
  };

  const { isVisible: isFilterVisible } = useScrollVisibility();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const homeRoute = "/";

  console.log(pathname);

  const phrases =
    pathname !== "/ayatrio-map"
      ? [` ' Wallpapers '`, ` ' Curtains '`, ` ' Blinds '`]
      : [` ' Bengaluru '`, ` ' Kolkata '`, ` ' Mumbai '`];

  const displayedTextRef = useRef("");
  const currentPhraseIndex = useRef(0);
  const currentCharIndex = useRef(0);
  const textElementRef = useRef(null);
  const textElementRef2 = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentPhrase = phrases[currentPhraseIndex.current];
      const nextCharIndex = currentCharIndex.current + 1;

      if (nextCharIndex > currentPhrase.length) {
        currentCharIndex.current = 0;
        currentPhraseIndex.current =
          (currentPhraseIndex.current + 1) % phrases.length;
      } else {
        displayedTextRef.current = currentPhrase.substring(0, nextCharIndex);
        currentCharIndex.current = nextCharIndex;
      }

      if (textElementRef.current) {
        textElementRef.current.textContent = displayedTextRef.current;
      }

      if (textElementRef2.current) {
        textElementRef2.current.textContent = displayedTextRef.current;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [phrases]);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = () => {
    localStorage?.removeItem("token");
    window?.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout", "_self"`
    );
  };

  const handleClick = (link) => {
    toggleMobileMenu();
    // router.push("/customerservice")
    router.push(link);
  };
  const [toptext, setTopText] = useState([]);

  const handlebackArraowClick = () => {
    setTopText([]);
  };

  const handleTopValue = (text) => {
    setTopText((prev) => [...prev, text]);
  };

  // console.log(toptext)

  const handleItemClick = (data) => {
    console.log(data);
    setTopText((prev) => [...prev, data.name]);
  };

  const handleChange = (value) => {
    console.log(value);
    setIsHovered(value);
  };

  const [loggedInUser, setLoggedInUser] = useState(null);

  const checkUser = async () => {
    try {
      const token = localStorage?.getItem("token");
      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        if (data.isAuthenticated) {
          setLoggedInUser(data.user);
        } else {
          setLoggedInUser(null);
        }
      } else {
        setLoggedInUser(null);
      }
    } catch (error) {
      setLoggedInUser(null);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLoginNav = () => {
    router.push("/login");
  };
  const handleProfileNav = (id) => {
    handleLinkClick(`/profile/${id}`);
  };

  return (
    <div className="">
      <TopHeaderWrapper>
        <TopHeader />
      </TopHeaderWrapper>
      {isHovered && <div className="overlay"></div>}
      <div
        className={`fixed w-full sm:bg-none ${
          !pathname.includes("/checkout") &&
          !pathname.includes("/ayatrio-map") &&
          !pathname.includes("/profile")
            ? typeof window !== "undefined" && window.scrollY < 20
              ? "md:top-[35px] top-[0px]"
              : "top-0"
            : "top-0"
        } z-[9998]
       ${isScrolled ? "bg-white" : "bg-white"} 
      ${isFilterVisible ? "block" : "hidden"}
      `}
      >
        {/* {isLoading && <TopLoader />} */}
        {!searchQuery ? (
          <>
            <div
              className={`${
                isScrolled ? " border-b-[0.5px] border-[#f5f5f5]" : ""
              } flex flex-row justify-between z-[99999px] items-center sm:px-[20px] px-[20px] h-[60px]`}
            >
              {/* main-logo */}
              <div className=" flex mainlogo items-center mr-20 justify-start">
                <Link href="/">
                  <Image
                    src="/images/ayatriologo.webp"
                    alt="Ayatrio Furnishing"
                    width={300}
                    height={40}
                    priority
                    className="w-36 lg:w-36 object-cover"
                  />
                </Link>
              </div>
              {/* center-list */}
              {!pathname.includes("/profile") && (
                <div className=" flex justify-center items-center gap-1 md:gap-5 ">
                  <div className="">
                    <nav className="hidden md:flex">
                      {headerLinks.map((value, idx) => (
                        <div
                          className="px-[12px]"
                          key={idx}
                          onMouseEnter={() => handleMouseEnter(idx)}
                          onMouseLeave={() => handleMouseLeave()}
                          // onClick={() => handleClick(idx)}
                        >
                          <span
                            className={`text-md cursor-pointer font-semibold  ${
                              isOpen ? "border-b-2 border-black" : ""
                            }`}
                            onClick={() => toggleDropdown(value.label)}
                          >
                            <p
                              className={`block font-medium py-[15px] px-[5px] border-b-2  ${
                                hoveredIndex === idx
                                  ? "border-black"
                                  : "border-transparent"
                              }`}
                            >
                              {value.label}
                            </p>
                          </span>
                          {hoveredIndex === idx && (
                            <Asidebox
                              handleChange={handleChange}
                              hoveredIndex={hoveredIndex}
                              setHoveredIndex={setHoveredIndex}
                              label={value.label}
                            />
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
              )}

              {/* search-bar */}

              <div className="flex flex-row items-center justify-between  lg:gap-2">
                <div
                  onClick={handleModalOpen}
                  className="bg-[#f5f5f5] items-center justify-end rounded-full w-[13rem] h-10 p-[9px] hover:bg-[#e5e5e5] hover:rounded-full cursor-pointer lg:block hidden"
                >
                  <span>
                    <Image
                      loading="lazy"
                      src="/icons/search.svg"
                      alt="Search Icon"
                      className="absolute z-10  w-[18px] h-[18px] mt-[2px] ml-[5px] "
                      width={27}
                      height={27}
                    />
                  </span>
                  <p className="ml-7 self-center lg:text-[13px] text-[12px] mt-0.5   text-gray-600">
                    {" "}
                    Search for <span ref={textElementRef}></span>
                  </p>
                </div>
                {!pathname.includes("/profile") && (
                  <div className="sm:block hidden w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer">
                    <Link href={"/login"}>
                      <Image
                        loading="lazy"
                        src="/icons/like.svg"
                        alt="Like Icon"
                        className="header-div-icon"
                        width={22}
                        height={22}
                      />
                    </Link>
                  </div>
                )}
                <div className="flex items-center flex-row-reverse lg:flex-row">
                  <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer">
                    <Link href={"/cart"}>
                      <Image
                        loading="lazy"
                        src="/icons/adtocart.svg"
                        alt="Cart Icon"
                        className="header-div-icon"
                        width={22}
                        height={22}
                      />
                    </Link>
                    {CartItems?.items?.length > 0 && (
                      <div className="cart-notification bg-black">
                        {CartItems?.items?.length}
                      </div>
                    )}
                  </div>
                  {loggedInUser ? (
                    <div
                      className="pro w-10 h-10 flex p-[9px] hover:bg-zinc-100 hover:rounded-full whitespace-nowrap cursor-pointer"
                      onClick={() => handleProfileNav(loggedInUser._id)}
                    >
                      <Image
                        loading="lazy"
                        src={loggedInUser?.image}
                        alt="Profile Icon"
                        className="header-div-icon rounded-full"
                        width={22}
                        height={22}
                      />
                    </div>
                  ) : (
                    <div
                      className="pro w-10 h-10 flex p-[9px] hover:bg-zinc-100 hover:rounded-full whitespace-nowrap cursor-pointer "
                      onClick={handleLoginNav}
                    >
                      <Image
                        loading="lazy"
                        src="/icons/profile.svg"
                        alt="Profile Icon"
                        width={18}
                        height={18}
                        className="header-div-icon p-[1px]"
                      />
                    </div>
                  )}
                </div>

                <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer md:hidden">
                  <Image
                    loading="lazy"
                    src={"/icons/menu.svg"}
                    height={50}
                    width={50}
                    alt="Menu Icon"
                    className="h-[21px] w-[21px]"
                    onClick={toggleMobileMenu}
                  />
                </div>

                {/* for only mobole search */}
                {isModalOPen && (
                  <Expandedbar
                    searchText={searchQuery}
                    onClose={handleModalClose}
                    onSearch={handleSearchChange}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <Expandedbar
            searchText={searchQuery}
            onClose={onClose}
            onSearch={handleSearchChange}
          />
        )}
      </div>
      <div className="flex mt-16  w-full items-center  md:hidden px-[20px] sm:px-[50px] lg:px-[67px] mb-3">
      <div
  className="md:hidden py-[8px] flex items-center justify-between w-full bg-zinc-100 rounded-full h-[45px] p-[9px] hover:bg-zinc-200 hover:rounded-full cursor-pointer"
  onClick={handleModalOpen}
>
<div className="flex items-center">
    <Image
      loading="lazy"
      src="/icons/search.svg"
      alt="Search Icon"
      width={20}
      height={20}
      className="ml-[10px]"
    />
    <p className="ml-3 line-clamp-1 text-[13px] mt-[2px] text-gray-400">
      Search for <span ref={textElementRef2}></span>
    </p>
  </div>

 
  <div className="relative flex items-center">   
   <Image
      loading="lazy"
      width={25}
      height={25}
      src="/icons/store.svg"
      alt="Store icon"
      className="mr-[10px] ml-[10px]"
      
      onClick={(event) => {
        event.stopPropagation(); 
        router.push("/ayatrio-map");
      }}
    />
</div>

  

 
</div>

      </div>
      {isMobileMenuOpen && (
        <>
          <div
            initial={
              typeof window !== "undefined" &&
              window.innerWidth <= 800 && { x: 300, opacity: 0 }
            }
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just" }}
            className="fixed inset-0 flex flex-col px-[10px] overflow-y-hidden bg-white z-[9998] md:hidden "
          >
            <div className="flex justify-between items-center py-[5px] w-full h-fit mb-4">
              <div className=" flex items-center">
                {/* <Image loading="lazy" src={"/icons/downarrow.svg"} height={20} width={20} className="rotate-180" /> */}
                {toptext && toptext.length > 0 ? (
                  <div className="flex  items-center mt-2">
                    <Image
                      loading="lazy"
                      src={"/icons/backarrowRevarce.svg"}
                      alt="arrow icon"
                      height={18}
                      width={18}
                      className="rotate-180"
                      onClick={handlebackArraowClick}
                    />
                    <p className="text-[18px] ml-[10px] font-semibold">
                      {toptext[toptext.length - 1]}
                    </p>
                  </div>
                ) : (
                  <div className="mainlogo">
                    <Link href="/">
                      <Image
                        src="/images/ayatriologo.webp"
                        alt="logo"
                        width={300}
                        height={40}
                        priority
                        className=" max-w-[135px] mt-[10px] ml-[10px]  h-[29px]  sm:w-44"
                      />
                    </Link>
                  </div>
                )}
              </div>

              {toptext.length === 0 && (
                <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer md:hidden">
                  <span onClick={toggleMobileMenu}>X</span>
                  {/* <X onClick={toggleMobileMenu} /> */}
                </div>
              )}
            </div>

            {/* <div className="flex"> */}
            <div className="flex flex-col space-y-2  ">
              {headerLinks.map((value, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  // onClick={() => handleClick(idx)}
                >
                  <Link
                    className={`text-md  font-semibold flex items-center justify-between  ${
                      isOpen ? "border-b-2 border-black" : ""
                    }`}
                    href="#"
                    onClick={() => toggleDropdown(value.label)}
                  >
                    <p
                      className={`block p-2 text-lg font-medium border-b-2 ${
                        hoveredIndex === idx
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      onClick={() => handleTopValue(value.label)}
                    >
                      {value.label}
                    </p>
                    <div className="pr-[14px]">
                      <Image
                        loading="lazy"
                        src={"/icons/backarrowRevarce.svg"}
                        height={15}
                        width={15}
                        alt="arrow icon"
                      />
                    </div>{" "}
                  </Link>
                  {hoveredIndex === idx && (
                    <Asidebox
                      hoveredIndex={hoveredIndex}
                      toggleMobileMenu={toggleMobileMenu}
                      onItemClick={handleItemClick}
                      handleClick={handleClick}
                    />
                  )}
                  {idx === 3 && hoveredIndex === idx && <Midsection />}
                </div>
              ))}
            </div>
            <div className="border-t pt-6 pl-2">
              <div className="flex flex-col">
                <div
                  onClick={() => handleClick("category/virtualexperience")}
                  className=""
                >
                  <p className="text-[14px] py-[8px] font-normal">
                    Virtual shopping
                  </p>
                </div>
                <div onClick={() => handleClick("/freedesign")}>
                  <p className="text-[14px] py-[8px] font-normal">
                    Designer request
                  </p>
                </div>
                <div onClick={() => handleClick("/freesample")}>
                  <p className="text-[14px] py-[8px] font-normal">
                    Free sample request
                  </p>
                </div>
                <div onClick={() => handleClick("/customerservice")}>
                  <p className="text-[14px] py-[8px] font-normal">Help</p>
                </div>
                {loggedInUser ? (
                  <p
                    className="text-[14px] font-medium"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </p>
                ) : (
                  <p
                    className="text-[14px] font-medium"
                    onClick={handleLoginClick}
                  >
                    Login
                  </p>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
}
export default Header;
