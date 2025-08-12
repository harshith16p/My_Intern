"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Slider from "./Slider";
const frameInterval = 50; // Update every 50ms instead of every frame
let lastFrameTime = 0;

function Header() {
  // Main state variables
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [activeRoom, setActiveRoom] = useState("Living Room");
  const [roomType, setRoomType] = useState("livingroom");
  const [selectedImage, setSelectedImage] = useState("");
  const [otherImage, setOtherImage] = useState("");
  
  // Camera related states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestAnimationRef = useRef(null);
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [loadedOverlays, setLoadedOverlays] = useState({});
  
  // Hardcoded images for fallback
  const hardcodedImages = {
    "Living Room": [
      // Curtains
      "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg", // White sheer curtains
      "https://images.pexels.com/photos/6312352/pexels-photo-6312352.jpeg", // Gray textured curtains
      "https://images.pexels.com/photos/6312356/pexels-photo-6312356.jpeg", // Patterned curtains
      
      // Wallpapers
      "https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg", // Floral wallpaper
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", // Brick texture
      "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg"  // Geometric pattern
    ],
    "Dining Room": [
      // Curtains
      "https://images.pexels.com/photos/4066294/pexels-photo-4066294.jpeg", // Elegant drapes
      "https://images.pexels.com/photos/6312353/pexels-photo-6312353.jpeg", // Luxury velvet
      
      // Wallpapers
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg", // Damask pattern
      "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg", // Striped
      "https://images.pexels.com/photos/6198655/pexels-photo-6198655.jpeg"  // Modern abstract
    ],
    "Bedroom": [
      // Curtains
      "https://images.pexels.com/photos/4066295/pexels-photo-4066295.jpeg", // Blackout curtains
      "https://images.pexels.com/photos/6312354/pexels-photo-6312354.jpeg", // Light filtering
      
      // Wallpapers
      "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg", // Subtle texture
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg", // Nature inspired
      "https://images.pexels.com/photos/3773575/pexels-photo-3773575.png"  // Minimalist
    ]
  };
  
  // Update the products array to match these images
  const hardcodedProducts = [
    { id: 1, name: "Sheer White Curtains", type: "curtain", roomType: "livingroom", 
      url: "https://i5.walmartimages.com/asr/17c50e99-522a-4b93-910a-bdf5180d003f_1.0b36edcfb9ccbce8bd6d007891580305.jpeg" },
    { id: 2, name: "Textured Gray Curtains", type: "curtain", roomType: "livingroom", 
      url: "https://images.pexels.com/photos/6312352/pexels-photo-6312352.jpeg" },
    { id: 3, name: "Patterned Drapes", type: "curtain", roomType: "livingroom", 
      url: "https://i5.walmartimages.com/asr/7bcb4613-e1ae-46a5-b912-a6892793d170_3.a3ff7638fc3285bfa676bb4589bcec57.jpeg" },
    { id: 4, name: "Floral Wallpaper", type: "wallpaper", roomType: "livingroom", 
      url: "https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg" },
    { id: 5, name: "Brick Wallpaper", type: "wallpaper", roomType: "livingroom", 
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
    { id: 6, name: "Geometric Wallpaper", type: "wallpaper", roomType: "livingroom", 
      url: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg" },
    // Dining room products
    { id: 7, name: "Elegant Drapes", type: "curtain", roomType: "diningroom", 
      url: "https://images.pexels.com/photos/4066294/pexels-photo-4066294.jpeg" },
    { id: 8, name: "Velvet Curtains", type: "curtain", roomType: "diningroom", 
      url: "https://images.pexels.com/photos/6312353/pexels-photo-6312353.jpeg" },
    { id: 9, name: "Damask Wallpaper", type: "wallpaper", roomType: "diningroom", 
      url: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg" },
    // Bedroom products
    { id: 10, name: "Blackout Curtains", type: "curtain", roomType: "bedroom", 
      url: "https://images.pexels.com/photos/4066295/pexels-photo-4066295.jpeg" },
    { id: 11, name: "Light Filtering Curtains", type: "curtain", roomType: "bedroom", 
      url: "https://images.pexels.com/photos/6312354/pexels-photo-6312354.jpeg" },
    { id: 12, name: "Textured Wallpaper", type: "wallpaper", roomType: "bedroom", 
      url: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg" }
  ];

  // Room images state with proper initialization using hardcoded fallbacks
  const [roomImages, setRoomImages] = useState({
    "Living Room": hardcodedImages["Living Room"],
    "Dining Room": hardcodedImages["Dining Room"],
    "Bedroom": hardcodedImages["Bedroom"],
  });

  // Initialize selectedImage on component mount
  useEffect(() => {
    if (roomImages[activeRoom]?.length > 0) {
      setSelectedImage(roomImages[activeRoom][0]);
    }
    
    // Check browser compatibility for camera API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Your browser doesn't support camera access. Please try a modern browser like Chrome or Firefox.");
    }
  }, []);

  // Fetch product data from API, fallback to hardcoded data if API fails
  const fetchProducts = async (roomType) => {
    const categoryName = "wallpaper";
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/aimodelcategories/${categoryName}/${roomType}`;
    console.log("Fetching from URL:", apiUrl);

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Fetched data:", data);

      if (data && Array.isArray(data.images) && data.images.length > 0) {
        const images = data.images.map((imageObj) => imageObj.url);
        console.log("Images to set:", images);

        setRoomImages((prevImages) => ({
          ...prevImages,
          [activeRoom]: images,
        }));

        if (images.length > 0) {
          setSelectedImage(images[0]);
        }
      } else {
        console.warn("No images found or empty array, using hardcoded fallback.");
        fallbackToHardcodedImages(roomType);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      fallbackToHardcodedImages(roomType);
    }
  };

  // Helper function to set hardcoded images as fallback
  const fallbackToHardcodedImages = (roomType) => {
    const roomName = getRoomNameFromType(roomType);
    
    // Filter products by room type if needed
    const filteredImages = hardcodedImages[roomName];
    
    setRoomImages((prevImages) => ({
      ...prevImages,
      [roomName]: filteredImages,
    }));
    
    if (filteredImages?.length > 0) {
      setSelectedImage(filteredImages[0]);
    }
  };

  // Helper function to convert roomType to room name
  const getRoomNameFromType = (type) => {
    switch(type) {
      case "livingroom": return "Living Room";
      case "diningroom": return "Dining Room";
      case "bedroom": return "Bedroom";
      default: return "Living Room";
    }
  };

  // Use effect to fetch data when roomType changes
  useEffect(() => {
    fetchProducts(roomType);
  }, [roomType]);

  // Improved camera initialization with better error handling
  const startCamera = async () => {
    setCameraLoading(true);
    setCameraError(null);
    
    try {
      // Check browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support camera access");
      }
      
      const constraints = { 
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15 },
          facingMode: 'environment'
        },
        audio: false
      };
      
      // Stop any existing stream first
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      // Get new stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (!videoRef.current) {
        throw new Error("Video element is not available");
      }
      
      // Set the new stream
      videoRef.current.srcObject = stream;
      setCameraPermissionGranted(true);
      
      // Set up event handlers for the video element
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play()
          .then(() => {
            setIsCameraActive(true);
            setCameraLoading(false);
            renderCameraWithOverlay();
          })
          .catch(err => {
            console.error("Error playing video:", err);
            setCameraLoading(false);
            setCameraError(`Video playback failed: ${err.message}`);
          });
      };
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraPermissionGranted(false);
      setIsCameraActive(false);
      setCameraLoading(false);
      setCameraError(`Failed to access camera: ${err.message}`);
      
      alert(`Camera error: ${err.message}. Please ensure you've granted camera permissions.`);
    }
  };
  
  // Improved function to stop the camera
  const stopCamera = () => {
    try {
      // Cancel any pending animation frame first
      if (requestAnimationRef.current) {
        cancelAnimationFrame(requestAnimationRef.current);
        requestAnimationRef.current = null;
      }
      
      // Stop video tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
        videoRef.current.srcObject = null;
      }
      
      setIsCameraActive(false);
      setCameraPermissionGranted(false);
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
  };
  
  // Improved render function for camera with product overlay
  // Improved render function for camera with product overlay
// Improved render function for camera with product overlay
const renderCameraWithOverlay = () => {
  try {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas reference missing");
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error("Could not get canvas context");
      return;
    }
    
    // Pre-load product image to avoid loading it every frame
    let productImg = loadedOverlays[selectedImage];

    if (!productImg && selectedImage) {
      // Use native Image constructor, not Next.js Image component
      productImg = new window.Image();
      productImg.crossOrigin = "anonymous";
      productImg.onload = () => {
        // Store the loaded image
        setLoadedOverlays(prev => ({
          ...prev,
          [selectedImage]: productImg
        }));
      };
      productImg.src = selectedImage;
    }
    
    const renderFrame = () => {
      // Only proceed if camera is still active
      if (!isCameraActive) return;
      
      try {
        const now = performance.now();
        const elapsed = now - lastFrameTime;
        
        // Limit frame rate to reduce CPU usage
        if (elapsed > frameInterval) {
          lastFrameTime = now;
          
          // Check if video is ready and has dimensions
          if (video.readyState === video.HAVE_ENOUGH_DATA && 
              video.videoWidth > 0 && video.videoHeight > 0) {
              
            // Set canvas dimensions to match video if needed
            if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }
            
            // Clear previous frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw video frame
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Only draw overlay if product image is loaded
            if (productImg && productImg.complete && productImg.naturalHeight !== 0) {
              // Apply overlay based on product type
              if (selectedProductType === 'curtain') {
                // For curtains, we'll overlay on the sides of the image
                const curtainWidth = canvas.width * 0.3; // Cover 30% on each side
                
                // Left curtain
                ctx.drawImage(
                  productImg,
                  0, 0, // source x, y
                  productImg.width * 0.3, productImg.height, // source width, height
                  0, 0, // destination x, y
                  curtainWidth, canvas.height // destination width, height
                );
                
                // Right curtain
                ctx.drawImage(
                  productImg,
                  productImg.width * 0.7, 0, // source x, y
                  productImg.width * 0.3, productImg.height, // source width, height
                  canvas.width - curtainWidth, 0, // destination x, y
                  curtainWidth, canvas.height // destination width, height
                );
              } else if (selectedProductType === 'wallpaper') {
                // For wallpaper, cover the entire wall area (centered)
                const wallWidth = canvas.width * 0.8; // Cover 80% of width
                const wallHeight = canvas.height * 0.8; // Cover 80% of height
                const wallX = (canvas.width - wallWidth) / 2; // Center horizontally
                const wallY = (canvas.height - wallHeight) / 2; // Center vertically
                
                ctx.drawImage(
                    productImg,
                    0, 0, // Use entire source image
                    productImg.width, productImg.height,
                    wallX, wallY, // Centered position
                    wallWidth, wallHeight
                );
            } else {
                // Default overlay - centered with 50% size
                const overlayWidth = canvas.width * 0.8;
                const overlayHeight = canvas.height * 0.8;
                const overlayX = (canvas.width - overlayWidth) / 2;
                const overlayY = (canvas.height - overlayHeight) / 2;
                
                ctx.globalAlpha = 1.0; // Slightly transparent
                ctx.drawImage(
                    productImg,
                    overlayX, overlayY,
                    overlayWidth, overlayHeight
                );
                ctx.globalAlpha = 1.0;
            }
            }
          }
        }
        
        // Schedule the next frame
        requestAnimationRef.current = requestAnimationFrame(renderFrame);
        
      } catch (err) {
        console.error("Error in render frame:", err);
      }
    };
    
    // Start rendering loop
    renderFrame();
    
  } catch (err) {
    console.error("Error setting up camera overlay:", err);
  }
};
  
  // Clean up camera resources when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  // Restart rendering when camera becomes active or selected image changes
  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      console.log("Camera is active, starting render");
      renderCameraWithOverlay();
    }
    
    return () => {
      if (requestAnimationRef.current) {
        cancelAnimationFrame(requestAnimationRef.current);
        requestAnimationRef.current = null;
      }
    };
  }, [isCameraActive, selectedImage]);

  // Clean up camera resources when component unmounts
useEffect(() => {
  return () => {
    // Make sure to stop camera and cancel any animation frame
    if (requestAnimationRef.current) {
      cancelAnimationFrame(requestAnimationRef.current);
      requestAnimationRef.current = null;
    }
    
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
}, []);

  // Function to handle tab clicks
  const handleTabClick = (room) => {
    if (room === "livingroom") {
      setRoomType("livingroom");
      setActiveRoom("Living Room");
    } else if (room === "diningroom") {
      setRoomType("diningroom");
      setActiveRoom("Dining Room");
    } else if (room === "bedroom") {
      setRoomType("bedroom");
      setActiveRoom("Bedroom");
    }
  };

  // Handle product type filter selection
  const handleProductTypeFilter = (type) => {
    setSelectedProductType(type);
  };

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleCompareClick = () => {
    if (isCameraActive) {
      stopCamera();
    }
    setShowSlider(!showSlider);
  };

  const handleImageClick = (image) => {
    if (isCameraActive) {
      // In camera mode, just set as selected image for overlay
      setSelectedImage(image);
    } else {
      // In normal mode, handle comparison logic
      if (!selectedImage) {
        setSelectedImage(image);
      } else if (selectedImage === image) {
        // Deselect if clicking the same image
        setSelectedImage("");
      } else if (!otherImage) {
        setOtherImage(image);
      } else if (otherImage === image) {
        // Deselect if clicking the same other image
        setOtherImage("");
      } else {
        // Replace first image and move current first to second
        setOtherImage(selectedImage);
        setSelectedImage(image);
      }
    }
  };

  // Improved camera button handler with proper sequencing
  const handleCameraClick = () => {
    console.log("Camera button clicked, current state:", isCameraActive);
    
    if (isCameraActive) {
      stopCamera();
    } else {
      // Always open sidebar when starting camera
      setOpenSidebar(true);
      // Start camera
      startCamera();
    }
  };

  // Get filtered images based on selected product type
  const getFilteredImages = () => {
    if (selectedProductType === "all" || !selectedProductType) {
      return roomImages[activeRoom] || [];
    }
    
    // Filter hardcoded products by type and room
    const roomTypeName = roomType;
    const filteredProducts = hardcodedProducts.filter(
      product => product.roomType === roomTypeName && product.type === selectedProductType
    );
    
    return filteredProducts.map(product => product.url);
  };

  return (
    <div className="bg-gray-100 w-full h-[100vh] flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between py-4 px-8">
        <div className="flex">
          <Link href="/">
            <Image
              src="/images/ayatriologo.webp"
              alt="Ayatrio Logo"
              width={300}
              height={40}
              priority
              className="w-36 lg:w-36 object-cover"
            />
          </Link>
        </div>
        <button
          className="text-xl px-2 hover:bg-[#e5e5e5] rounded-full cursor-pointer"
          onClick={() => window.history.back()}
        >
          <Image
            loading="lazy"
            src="/icons/cancel.svg"
            alt="close"
            width={20}
            height={20}
            className="py-2 font-bold"
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-grow relative flex flex-col">
  {/* Hidden video element that's always available */}
  <video 
    ref={videoRef}
    autoPlay 
    playsInline
    muted
    style={{ 
      position: "absolute", 
      visibility: "hidden", 
      width: "1px", 
      height: "1px"
    }}
  />
              
              {/* Canvas where we render camera + overlay */}
              <canvas 
    ref={canvasRef}
    style={{
      display: isCameraActive ? "block" : "none",
      position: isCameraActive ? "absolute" : "fixed",
      zIndex: isCameraActive ? "40" : "-1",
      width: isCameraActive ? "100%" : "1px",
      height: isCameraActive ? "100%" : "1px"
    }}
    className={isCameraActive ? "object-contain max-w-full max-h-full rounded-lg shadow-lg" : ""}
  />
              
              {/* Camera loading indicator */}
              {cameraLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white">
                  <p>Loading camera...</p>
                </div>
              )}
              
              <div className="flex-grow p-4 flex justify-center items-center">
    {isCameraActive ? (
      <div className="relative w-full max-w-4xl h-full flex justify-center items-center">
        {/* Camera loading indicator */}
        {cameraLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white">
            <p>Loading camera...</p>
          </div>
        )}
        
        {/* Camera error message */}
        {cameraError && (
          <div className="absolute inset-0 bg-red-500 bg-opacity-70 flex items-center justify-center text-white text-center p-4">
            <div>
              <p className="font-bold mb-2">Camera Error</p>
              <p>{cameraError}</p>
            </div>
          </div>
        )}
      </div>
    ) : showSlider ? (
      <Slider variantA={selectedImage} variantB={otherImage} />
    ) : selectedImage ? (
      <img
        src={selectedImage}
        alt={`${activeRoom} visualization`}
        className="object-contain max-w-[72vw] max-h-[75vh] rounded-lg shadow-lg"
      />
    ) : (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg">No images available for {activeRoom}.</p>
      </div>
    )}
  </div>

        {/* Right Section with Action Buttons */}
        <div className="absolute top-0 right-0 h-full flex flex-col justify-center items-end p-4">
          <div className="flex flex-col space-y-4 bg-black rounded-lg shadow-lg">
            {/* Camera Button */}
            <div
              className="group relative flex items-center cursor-pointer"
              onClick={handleCameraClick}
            >
              <div className="absolute right-14 bg-white w-48 text-black p-[14px] flex-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg shadow-lg">
                {isCameraActive ? "Stop Camera" : "Use Live Camera"}
              </div>
              <div className="flex flex-col">
                <div className={`${isCameraActive ? "bg-white" : "bg-black"} p-4 rounded-lg group-hover:bg-white cursor-pointer transition-colors`}>
                  <Image
                    src="/icons/camera.svg"
                    alt="Use Camera"
                    width={20}
                    height={20}
                    className={`${isCameraActive ? "" : "invert"} group-hover:filter group-hover:invert-0 transition-all`}
                  />
                </div>
              </div>
            </div>

            {/* Choose a Room */}
            <div
              className="group relative flex items-center cursor-pointer"
              onClick={handleOpenSidebar}
            >
              <div className="absolute right-14 bg-white text-black w-48 p-[14px] flex-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg shadow-lg">
                Choose a Room
              </div>
              <div className="flex flex-col">
                <div className="bg-black p-4 rounded-lg group-hover:bg-white cursor-pointer transition-colors">
                  <Image
                    src="/icons/click and collect.svg"
                    alt="Choose a Room"
                    width={20}
                    height={20}
                    className="group-hover:filter group-hover:invert-0 invert transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Choose a Product */}
            <div
              className="group relative flex items-center cursor-pointer"
              onClick={handleOpenSidebar}
            >
              <div className="absolute right-14 bg-white text-black w-48 p-[14px] flex-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg shadow-lg">
                Choose a Product
              </div>
              <div className="flex flex-col">
                <div className="bg-black p-4 rounded-lg group-hover:bg-white cursor-pointer transition-colors">
                  <Image
                    src="/icons/instalation.svg"
                    alt="Choose a Product"
                    width={20}
                    height={20}
                    className="group-hover:filter group-hover:invert-0 invert transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Live Specialist Guide */}
            <div
              className="group relative flex items-center cursor-pointer"
              onClick={handleOpenSidebar}
            >
              <div className="absolute right-14 bg-white text-black w-48 p-[14px] flex-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg shadow-lg">
                Live Specialist Guide
              </div>
              <div className="flex flex-col">
                <div className="bg-black p-4 rounded-lg group-hover:bg-white cursor-pointer transition-colors">
                  <Image
                    src="/icons/golive.svg"
                    alt="Live Specialist Guide"
                    width={20}
                    height={20}
                    className="group-hover:filter group-hover:invert-0 invert transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {openSidebar && (
        <div className="fixed top-0 right-0 w-[350px] md:w-[450px] overflow-y-auto bg-white h-full shadow-lg z-50 transition-all ease-in-out duration-300">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">{isCameraActive ? "Live Camera Preview" : "Choose Products"}</h2>
            <button onClick={handleCloseSidebar} className="p-2 hover:bg-gray-100 rounded-full">
              <Image
                loading="lazy"
                src="/icons/cancel.svg"
                alt="close"
                width={20}
                height={20}
              />
            </button>
          </div>

          {isCameraActive ? (
            <div className="p-4 flex flex-col items-center justify-center">
              <h3 className="text-md font-medium mb-4">Apply products to your live environment</h3>
              <button 
                onClick={stopCamera} 
                className="bg-red-600 text-sm text-white py-3 px-6 rounded-full mb-4 hover:bg-red-700 transition-colors"
              >
                Stop Camera
              </button>
              <p className="text-center text-sm text-gray-800">
                Choose a product below to visualize it in your space in real-time
              </p>
              
              {cameraError && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  <p className="font-bold">Error:</p>
                  <p>{cameraError}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 flex flex-col items-center justify-center">
              <button 
                onClick={startCamera} 
                className="bg-blue-600 text-sm text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors"
              >
                Use Live Camera
              </button>
              <div className="flex mt-4">
                <p className="px-[10px] text-center text-sm text-gray-800">
                  Choose the right product for your room with our interactive visualization tool
                </p>
              </div>
            </div>
          )}

          {/* Tab Section */}
          <div className="p-4 flex justify-between border-b">
            <button
              onClick={() => handleTabClick("livingroom")}
              className={`${
                activeRoom === "Living Room"
                  ? "text-blue-600 border-blue-600"
                  : "text-black border-gray-400"
              } px-4 py-2 border-b-2 transition-colors`}
            >
              Living Room
            </button>
            <button
              onClick={() => handleTabClick("diningroom")}
              className={`${
                activeRoom === "Dining Room"
                  ? "text-blue-600 border-blue-600"
                  : "text-black border-gray-400"
              } px-4 py-2 border-b-2 transition-colors`}
            >
              Dining Room
            </button>
            <button
              onClick={() => handleTabClick("bedroom")}
              className={`${
                activeRoom === "Bedroom"
                  ? "text-blue-600 border-blue-600"
                  : "text-black border-gray-400"
              } px-4 py-2 border-b-2 transition-colors`}
            >
              Bedroom
            </button>
          </div>

          {/* Product Type Filter Buttons */}
          <div className="p-4 flex space-x-2 border-b">
            <button 
              onClick={() => handleProductTypeFilter("all")}
              className={`${selectedProductType === "all" ? "bg-black text-white" : "bg-gray-200 text-black"} px-4 py-2 rounded-full transition-colors`}
            >
              All
            </button>
            <button 
              onClick={() => handleProductTypeFilter("curtain")}
              className={`${selectedProductType === "curtain" ? "bg-black text-white" : "bg-gray-200 text-black"} px-4 py-2 rounded-full transition-colors`}
            >
              Curtains
            </button>
            <button 
              onClick={() => handleProductTypeFilter("wallpaper")}
              className={`${selectedProductType === "wallpaper" ? "bg-black text-white" : "bg-gray-200 text-black"} px-4 py-2 rounded-full transition-colors`}
            >
              Wallpapers
            </button>
          </div>

          {/* Image Grid Section with Filtered Images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {getFilteredImages().map((image, index) => (
              <div key={index} className="relative cursor-pointer group">
                <img
                  src={image}
                  alt={`${activeRoom} product ${index}`}
                  className="w-full h-32 object-cover rounded-md transition-transform group-hover:scale-105"
                  onClick={() => handleImageClick(image)}
                />
                {selectedImage === image && (
                  <div className="absolute top-2 right-2 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs shadow-md">
                    ✓
                  </div>
                )}
                {otherImage === image && (
                  <div className="absolute top-2 right-2 bg-green-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs shadow-md">
                    2
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Compare Button (only shown when not in camera mode) */}
          {!isCameraActive && (
            <div className="p-4 flex items-center justify-center">
              <button
                onClick={handleCompareClick}
                disabled={!selectedImage || !otherImage}
                className={`px-6 py-3 rounded-full ${
                  selectedImage && otherImage
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                Compare Selected Products
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer Section */}
      <Footer handleCompareClick={handleCompareClick} />
    </div>
  );
}

export default Header;