"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
// import { getPlaceData } from "../Map/api/index";
import { getPlaceData } from "@/components/Map/api/index";
import Map from "@/components/Map/index";
import axios from "axios";
// import { STORE_MAP_DATA } from "@/constants/store-map-data";
import SaveUserCoordinates from "@/utils/SaveUserCoordinates";

const MapPage = () => {
  const [places, setPlaces] = useState([]);

  const [coords, setCoords] = useState({ lat: 20.5937, lng: 78.9629 });
  const [boundaries, setBoundaries] = useState(null);

  const [STORE_MAP_DATA, SET_STORE_MAP_DATA] = useState([])

  const fetchMapData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mapPlaces`);
      // console.log(response.data);
      SET_STORE_MAP_DATA(response.data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  useEffect(() => {
    // pass boundaries.sw boundaries.ne to getPlaceData
    if (boundaries) {
      // console.log(boundaries);
      getPlaceData(boundaries.sw, boundaries.ne).then((data) => {
        console.log({ boundaries, data });
        setPlaces(data);
        // console.log("data", data);
      });
    }
  }, [boundaries]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 450
  );

  useEffect(() => {
    // Update isMobile state on window resize
    const handleResize = () => {
      setIsMobile(
        () => typeof window !== "undefined" && window.innerWidth <= 450
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [PlacesData, setPlacesData] = useState([]);
  useEffect(() => {
    const fetchMapData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mapPlaces`
      );
      console.log("fetchmapdata", response.data);
      setPlacesData(response.data);
    };
    fetchMapData();
  }, []);
  return (
    <>
      <SaveUserCoordinates />
      <Map
        setBoundaries={setBoundaries}
        coords={coords}
        places={places}
        PlacesData={STORE_MAP_DATA}
      />
    </>
  );
};

export default MapPage;
