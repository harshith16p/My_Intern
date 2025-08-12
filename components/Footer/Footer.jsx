"use client";

import React from "react";
import "./styles.css";
import JoinAyatrioFamily from "./Footer_child/JoinAyatrioFamily";
import { footerData } from "../../Model/FooterColumnData/FooterColumnData";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const FooterContent = dynamic(() => import("../molecules/FooterContent"), {
  ssr: false,
});

const Footer = () => {
  const pathname = usePathname();
  const liveRoomRoute = "/liveroom";
  const virtualRoomRoute = "/virtualexperience";
  const freeDesignRoute = "/freedesign";
  const freeSamplesRoute = "/freesample";
  const seeOnWallRoute = "/seeonwall";

  return (
    <div
      className={`${
        (pathname.includes(liveRoomRoute) ||
          liveRoomRoute === pathname ||
          virtualRoomRoute === pathname ||
          freeDesignRoute === pathname ||
          seeOnWallRoute === pathname ||
          freeSamplesRoute === pathname) &&
        "hidden"
      } bg-gray-100 lg:px-[60px] sm:px-[50px] px-[20px] p mt-20 pt-[50px] md-px-[27px]`}
    >
      <div className="grid md:grid-cols-6 grid-cols-1 pb-[50px] space-x-12  ">
        <div className="md:col-span-2 row-span-1 col-span-1  mb-5">
          <JoinAyatrioFamily />
        </div>
        <hr className="border w-[75vw] sm:hidden block" />
        {footerData.map((column) => {
          return (
            <FooterContent
              key={column.id}
              headingId={column.id}
              categoryHeading={column.categoryHeading}
              categoryData={column.categoryData}
            />
          );
        })}
      </div>
      <div className="flex sm:border-t sm:border-solid sm:border-gray-200 sm:flex-row flex-col justify-between py-[20px]">
        <div className="flex  items-center space-x-4 text-lg font-semibold tracking-tight">
          <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
            <li className="flex">
              <a
                href="https://www.facebook.com/ayatrio.india/"
                className="me-4 hover:underline"
              >
                <Image
                  width={35}
                  height={35}
                  className="list-socialicon"
                  src="/icons/social-icon/facebook.svg"
                  alt="facebook icon"
                />
              </a>
            </li>
            <li className="flex">
              <a
                href="https://www.instagram.com/ayatrio_india/"
                className="me-4 hover:underline"
              >
                <Image
                  width={37}
                  height={37}
                  className="w-[37px] h-[37px] p-[5px] border border-[#ccc] rounded-full m-[10px]"
                  src="/icons/social-icon/instagram.svg"
                  alt="insta icon"
                />
              </a>
            </li>
            <li className="flex">
              <a
                href="https://twitter.com/ayatrio_india/"
                className="me-4 hover:underline"
              >
                <Image
                  width={35}
                  height={35}
                  className="list-socialicon"
                  src="/icons/social-icon/twitter.svg"
                  alt="twitter icon"
                />
              </a>
            </li>
            <li className="flex">
              <a
                href="https://www.youtube.com/ayatrio/"
                className="me-4 hover:underline"
              >
                <img
                  width={35}
                  height={35}
                  className="list-socialicon"
                  src="/icons/social-icon/youtube.svg"
                  alt="youtube icon"
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <ul className="flex flex-wrap pt-2.5 justify-center text-gray-900 ">
            <li>
              <a href="#" className="me-4 text-xs">
                ©Ayatrio furnishing · 2015-2025
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <ul className="flex flex-wrap pt-2.5 justify-center text-gray-900 ">
            <li>
              <a href="/cookie-policy" className="me-4 text-xs hover:underline">
                Cookie policy
              </a>
            </li>
            <li>
              <a href="#" className="me-4 text-xs hover:underline">
                Cookie settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
