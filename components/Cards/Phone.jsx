import axios from "axios";
import Link from "next/link";
import React from "react";
const Phone = async () => {
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trendingCategories`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const categories = await fetchCategory();

  return (
    <div className="md:px-[52px] sm:ml-[12px] ml-[12px] md:ml-[0px] ">
      <h1 className="font-semibold xl:text-2xl text-xl pt-4 pb-2 pr-[100px]">
      Ayatrio: Premium Home Furnishing & Decor Store Online at Best Prices | Flooring, Carpet & Rugs, UV Artificial Grass | Luxury Wallpaper, 3D Wall Panels | Blackout Window Curtains & Blinds | Upholstery & Fabric
      </h1>
      <h2 className="text-[14px] text-[#484848]">
      We’re the India's premier destination for luxury home furnishing & décor brands trusted by over 1 million Indian homes with 25+ years of design excellence. Our experts vet each product for meticulous craftsmanship and modern original design, so you can discover a wide selection of unique furnishing & décor items. Our lifestyle brands offer inspired living through high-quality 10000+ premium products, exclusive designs, and timeless style - all powered by digital design and visualization tools that provide seamless shopping solutions in-store and online. Explore sustainable luxury flooring options including hardwood, Laminate, waterproof vinyl, and eco-friendly artificial grass that blend durability with elegance. Explore our extensive range of designer carpets & rugs in 1000+ patterns and textures. Reimagine walls with artistic wallpaper collections and contemporary wall panels that tell your unique story. Our made-to-measure curtains for windows and precision-engineered window blinds combine functionality with style. Elevate your home with our ethically-sourced upholstery & fabric options in 1500+ colors, perfect for customized furniture makeovers. From statement home décor to complete room transformations, our expert consultants provide personalized guidance with free samples, live face to face design consultation, and nationwide shipping. Experience the perfect blend of affordability and sophistication with our 45-day satisfaction guarantee. Your dream space is just a click away.
      </h2>

      <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Flooring for Home</h2>
       <p>Discover an extensive collection of flooring online, catering to every need and aesthetic. Explore durable and stylish options including laminate flooring, known for its versatility and affordability. Our range of SPC flooring (Stone Plastic Composite) offers a perfect blend of style and resilience, with Click-N-Lock® SPC flooring providing easy installation and featuring real wood-inspired designs like oak and teak, as well as elegant stone textures such as terracotta and sandstone. We also offer a wide selection of vinyl flooring, known for its waterproof and low-maintenance properties, and classic wooden flooring, including hardwood flooring, bringing warmth and timeless elegance to any space. Our focus is on providing durable, convenient, and stylish flooring solutions for homes and commercial spaces.</p>
      </div>

      <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Wall wallpaper for room</h2>
      <p>Transform your walls with our diverse wallpaper online collection. Discover modern wallpapers with a vibrant look and luxury wallpapers with intricate art-inspired designs. Explore a wide variety of patterns and styles, including Abstract Wallpaper with artistic expressions, Animal Wallpaper bringing nature-inspired motifs, classic and elegant Damask Wallpaper, beautiful and refreshing Floral Wallpaper, contemporary and structured Geometric Wallpaper, versatile Plains & Textures Wallpaper for subtle sophistication, and vibrant Tropical Wallpaper to create a lively atmosphere. We offer options for every room, including specialized kids room wallpaper.</p>
      </div>

      <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Curtain for Window</h2>
      <p>Discover our extensive collection of window curtains online. Find functional options like dimout curtains and blackout curtains for optimal light control and privacy, as well as stylish choices such as elegant linen sheer curtains and visually appealing ombre curtains. Our range includes a variety of designs, from classic plain curtains to patterned floral curtains and geometric curtains, catering to diverse aesthetic preferences. Explore our selection of fabrics, including luxurious satin, natural linen and jute, soft velvet, and textured options like herringbone and slub matte fabrics.</p>
      </div>

      <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Carpet & Rugs</h2>
      <p>Explore a rich assortment of carpets online and rugs online, designed to add comfort, warmth, and style to your floors. Discover luxurious handmade carpets (hand-knotted, hand-tufted, handwoven) crafted from premium materials like wool, silk, viscose, and jute, showcasing exquisite craftsmanship. Our collection includes a variety of styles, from traditional rugs and contemporary carpets to bohemian rugs and regional designs. We also offer practical and stylish options such as carpet tiles for commercial environments and plush wall-to-wall carpets ideal for hotels.</p>
      </div>

      <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Window Blinds</h2>
      <p>Find the perfect window blinds online to control light and enhance privacy in your home or office. Our selection includes a variety of styles to suit different needs and preferences. Explore classic and elegant roman blinds, versatile and easy-to-operate roller blinds, warm and natural wooden blinds, and modern and stylish zebra blinds.</p>
      </div>

      <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Window Blinds</h2>
      <p>Find the perfect window blinds online to control light and enhance privacy in your home or office. Our selection includes a variety of styles to suit different needs and preferences. Explore classic and elegant roman blinds, versatile and easy-to-operate roller blinds, warm and natural wooden blinds, and modern and stylish zebra blinds.</p>
      </div>

      <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Artificial Grass, Artificial Wall, Artificial Plants</h2>
      <p>Enhance your interiors and exteriors with our low-maintenance greenery solutions. Browse our premium-quality artificial grass online, designed to mimic natural grass for both residential and commercial spaces, providing a lush and realistic look with minimal upkeep. Explore our selection of artificial walls, perfect for adding texture and visual interest, and a wide variety of artificial plants and flowers online, bringing the beauty of nature indoors without the need for watering. Consider incorporating nature-inspired decor to create a refreshing and inviting ambiance.</p>
      </div>

    <div className="text-[14px] text-[#484848] pt-3">
    <span className="text-[14px] text-[#000000]"> For the living, dining room & bedroom:</span>  Looking for Our comprehensive collection of modern design of Wallpaper, Flooring, Curtain, Blinds, Artificial Grass, Bedding, Mattresses, Pillows, Cushion & Covers, Dinnerware, Kitchenware offers everything you need to refresh a room or completely remodel your home 

         </div>

         <div className="text-[14px] text-[#484848] pt-3">
      <h2 className="text-[14px] text-[#000000]">Ayatrio Care+:</h2>
       <p>was kickstarted as a loyalty reward programme for all its ayatrio regular family member at zero subscription fee. All you need is your fast purches with above Rs:1000 to be a part of this service. Free delivery, early access during sales and shopping festivals, exchange offers and priority customer service are the top benefits to a Ayatrio Care+ family member. In short, earn more when you shop more!</p>
      </div>

         <div className="text-[14px] text-[#484848] pt-3">
      <span className="text-[14px] text-[#000000]">No Cost EMI:</span>  In an attempt to make high-end products accessible to all, our No Cost EMI plan enables you to shop with us under EMI, without shelling out any processing fee. Applicable on select all furnishing & décor items Wallpaper, Flooring, Curtain, Blinds, Artificial Grass, Bedding, Mattresses, Pillows, Cushion & Covers, Dinnerware, Kitchenware and more, chances are it may be up for a no cost EMI. Take a look ASAP! Terms and conditions apply. 
      </div>

         <div className="text-[14px] text-[#000000] pt-3">
         Enjoy Online or In-Store Shopping Experience

         </div>
         <div className="text-[14px] text-[#484848] pt-1">
         Since we are an offline and online furnishing & décor store, you can shop with us as per your liking. You could walk into one of our furniture showrooms and handpick items for your home or opt for online furniture shopping to avoid any hassle.

         </div>
         <div className="text-[14px] text-[#484848] pt-3">
         If you want to continue furniture shopping online, you can rely on our easy-to-use website and peruse through our entire catalogue from the comfort of your home. With our clean interface and easily navigable website, furniture shopping online has never been easier.
         </div>
         <div className="text-[14px] text-[#484848] pt-3">
         Regardless of whether you choose to shop for home furnishing & décor items online or offline, we do everything we can to assist you in creating a space you would be dream of future of living.

         </div>


      <p className=" w-5/6 font-light font-inter text-sm text-[#666] py-4">
        {categories?.map((category) => (
          <span key={category.id}>
            <span className="cursor-pointer hover:underline">
              <Link
                href={`/${category.name.replace(/ /g, "-")}/collection/all`}
              >
                {category.name}
              </Link>
            </span>
            {categories.indexOf(category) !== categories.length - 1 && (
              <span> | </span>
            )}
          </span>
        ))}
      </p>
      <br />
    </div>
  );
};

export default Phone;
