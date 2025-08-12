"use client";
import React, { useEffect, useState } from "react";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProfileContent from "./ProfileContent";
import { fetchProfileData } from "@/actions/fetchProfileData";
import Image from "next/image";
import Link from "next/link";


const Profile = () => {
  // const profileData = await fetchProfileData()
  const [profileData, setProfileData] = useState([]);
  // const profileData = []

  useEffect(() => {
    fetchProfileData().then((data) => {
      setProfileData(data);
    });
  }, []);

  return (
    <div>






      <div className="pt-14 lg:pt-[90px] grid md:grid-cols-5 grid-cols-1 gap-4 bg-[#f5f5f5] sm:pl-[50px] pl-[20px]  ">
        <div className="col-span-2 md:mb-auto mb-0">
          <div className="col-span-1 mt-4">
            <h2 className="mb-2 ">In Store. At Home. Virtual. Design & Planing Services</h2>
            <div className="font-bold text-3xl mb-4">
              <p className="leading-10">Our Design Crew Loves to Make You Smile</p>
            </div>
            <p className=" mb-8">
               Design ideas & inspiration everything you need to express your unique style - You'll receive mood boards, product recommendations, 3D room planing & cost.
            </p>
            <Link href="/freesample" className="bg-black pt-3 pb-3  mb-5 mt-16 md:mt-12 border-2 border-black rounded-full flex justify-center items-center text-white w-[300px]">
              <p>Book a Free Appointment</p>
              <div className="ml-5">
                <Image src={"/icons/top_arrow-black-dr.svg"} alt="arrow profile" height={15} width={15} loading="lazy" />
              </div>
            </Link>
            <p className="text-xs">Note: Whether in person or virtual, please select the location that's nearest to you.</p>
          </div>
        </div>
        <div className="col-span-3 my-auto overflow-x-auto">
          <ProfileContent initialData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
