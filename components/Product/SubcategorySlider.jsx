import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SubcategorySlider = ({
  pathname,
  subCategory,
  filteredSubCategory,
  setType,
  onSubcategoryClick,
  onSubcategorySelect, 
  title
}) => {
  const swiperRef = useRef(null);
  const [isSubcategorySelected, setIsSubcategorySelected] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);



  const router = useRouter();

  const handleSubcategoryClick = (curElement) => {
    setSelectedSubcategory(curElement);
    setIsSubcategorySelected(true); 
    setType(curElement.name);
    onSubcategoryClick();
    onSubcategorySelect(curElement); 
  };

  useEffect(() => {
    const params = {
      slidesPerView: 4.08,
      centeredSlides: false,
      spaceBetween: 10,
      draggable: true,
      noSwiping: true,
      allowSlidePrev: true,
      allowSlideNext: true,
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      breakpoints: {
        300: {
          slidesPerView: Math.min(subCategory?.length, 2.5),
          spaceBetween: 10,
        },
        768: {
          slidesPerView: Math.min(subCategory?.length, 3),
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: Math.min(subCategory?.length, 7),
          spaceBetween: 10,
        },
      },
      freeMode: {
        enabled: false,
        sticky: true,
      },
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize?.();
    }
  }, [swiperRef, subCategory]);

  return (
    <div>
      <swiper-container
        ref={swiperRef}
        style={{
          "--swiper-navigation-size": "24px",
          maxHeight: "120px",
          width: "100%",
        }}
      >
        {pathname.split("/")[3] === "all"
          ? subCategory?.map((curElement, idx) => {
              return (
                <swiper-slide
                  style={{
                    maxWidth: "130px",
                  }}
                  key={idx}
                >
                  <div
                    className="cursor-pointer"
                    // onClick={() => handleSubcategoryClick(curElement)}
                    onClick={() => router.push(`/${curElement?.name.replace(/ /g, "-")}/subcollection/${title}`)}

                  >
                    <div className="flex flex-col">
                      <div className="lg:mb-[12px]">
                        <Image
                          src={curElement.img}
                          width={200}
                          height={130}
                          alt={curElement.name}
                          className="w-[200px] h-[70px]"
                        />
                      </div>
                      <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                        {curElement.name}
                      </h2>
                    </div>
                  </div>
                </swiper-slide>
              );
            })
          : filteredSubCategory?.map((curElement, idx) => {
              return (
                <div className="max-w-[130px]" key={idx}>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleSubcategoryClick(curElement)}
                  >
                    <div className="flex flex-col">
                      <div className="lg:mb-[12px]">
                        <Image
                          src={curElement.img}
                          width={200}
                          height={130}
                          alt={curElement.name}
                          className="w-[200px] h-[70px]"
                        />
                      </div>
                      <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                        {curElement.name}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
      </swiper-container>
    </div>
  );
};

export default SubcategorySlider;
