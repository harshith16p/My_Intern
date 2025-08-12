import React from "react";
import "./styles.css";

import Image from "next/image";
import Link from "next/link";
import PopUp from "../Reviews/PopUp";

function SuggestionCard(props) {
  return (
    <>
      <div key={props.cardkey} className="pb-8  cursor-pointer ">
        <Link href={`/${props.title.replace(/ /g, "-")}/inspiration`}>
          <div className="flex h-full w-full items-center justify-center cursor-pointer  overflow-hidden">
            <Image
              src={props.mainImage.imgSrc}
              alt={props.title}
              height={600}
              width={600}
              className={"aspect-square w-full object-cover "}
            />
          </div>

          <div className={`${props.bgColorClass} p-8  overflow-hidden`}>
            <div className="text-lg font-semibold hover:underline  text-ellipsis mb-1">
              {props.title}
            </div>
            <div className={`text-sm overflow-hidden text-ellipsis `}>
              {props.desc}
            </div>
            <div className="bg-[#333336] rounded-full max-w-fit p-2 mt-[60px] lg:mt-[90px]">
              <Image
                src={"/icons/top_arrow-white.svg"}
                height={25}
                width={25}
                className="p-1"
                alt="arrow icon"
                loading="lazy"
              />
            </div>
          </div>
        </Link>
      </div>
      {props.isPopupVisible && (
        <PopUp
          isPopupVisible={props.isPopupVisible}
          closePopup={props.closePopup}
        />
      )}
    </>
  );
}

export default SuggestionCard;
