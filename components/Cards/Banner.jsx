"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getPosterSection`
        );
        console.log("response", response.data);
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchBanner();
  }, []);
  
  return (
    <div className="w-full h-auto md:px-[52px] px-[20px]">
      {banners.length > 0 && (
        <Link href={banners[0]?.link}>
          <Image
            src={banners[0]?.desktopImgSrc}
            loading="lazy"
            alt="ayatrio offer banner"
            width={1920}
            height={1080}
            className="md:block hidden py-6"
          />
          <Image
            src={banners[0]?.mobileImgSrc}
            loading="lazy"
            alt="ayatrio offer banner"
            width={1920}
            height={1080}
            className="md:hidden py-6"
          />
        </Link>
      )}
    </div>
  );
}

export default Banner;
