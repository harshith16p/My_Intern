import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import "./styles.css";
import { useState, useEffect } from "react";
import { mapStyles } from "./mapStyles";
import MapMarker from "./MapMarker";
import { REACT_APP_GMAP_API_KEY } from "./config.js";
import Search from "./Search";
import { useSelector } from "react-redux";
import {
  selectMapDataCoords,
  selectMapDataZoom,
} from "@/components/Features/Slices/mapSlice";
import { fetchStores } from "../Features/api";
const Map = ({ setBoundaries, coords, places, PlacesData }) => {
  const [stores, setStores] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);


  // const [STORE_MAP_DATA, SET_STORE_MAP_DATA] = useState([])

  // useEffect(() => {
  //   fetchStores().then((stores) => {
  //     setStores(stores);
  //     setIsLoading(false);
  //   });
  // }, []);

  // const fetchMapData = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mapPlaces`);
  //     console.log(response.data);
  //     SET_STORE_MAP_DATA(response.data);
  //   } catch (error) {
  //     console.error("Error fetching map data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMapData();
  // }, []);

  // console.log(PlacesData);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GMAP_API_KEY,
  });
  const newZoom = useSelector(selectMapDataZoom);
  const newCoords = useSelector(selectMapDataCoords);
  // console.log(newZoom)
  const india_zoom = 5;
  const hotels_zoom = 11;
  const [zoom, setZoom] = useState(india_zoom);
  const [map, setMap] = useState(null);
  // const [selectedCoords, setSelectedCoords] = useState(coords);
  const handleResultClick = ({ lat, lng }) => {
    if (lat && lng && lat !== null && lng !== null) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      setSelectedCoords({ lat: latitude, lng: longitude });
      // console.log(selectedCoords);
      if (selectedCoords.lat === 20.593 && selectedCoords.lng === 78.96) {
        setZoom(india_zoom);
      } else {
        setZoom(hotels_zoom);
      }
    }
  };
  // console.log(selectedCoords);
  const onLoad = (map) => {
    setMap(map);
  };
  // Custom overlay component
  const CustomMarker = ({ lat, lng, content }) => (
    <OverlayView
      position={{ lat, lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
        {/* snapmarker component */}
        {content}
      </div>
    </OverlayView>
  );
  // console.log("hi")
  // console.log(PlacesData)
  // const handleBoundsChanged = () => {
  //   if (map) {
  //     const bounds = map.getBounds();
  //     const ne = {
  //       lat: bounds.getNorthEast().lat(),
  //       lng: bounds.getNorthEast().lng(),
  //     };
  //     const sw = {
  //       lat: bounds.getSouthWest().lat(),
  //       lng: bounds.getSouthWest().lng(),
  //     };

  //     setBoundaries({ ne, sw });
  //   }
  // };


  return (
    <>
      {!isLoaded ? (
        <h1 className="text-center my-6">Loading...</h1>
      ) : (
        <>
          {/* <Sidebar places={places} /> */}
          <Search places={stores} onResultClick={handleResultClick} />
          <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onLoad}
            center={newCoords || coords}
            zoom={newZoom} // initial zoom level
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: mapStyles,
              mapId: "2d6636895d6a199d",
            }}
          // onBoundsChanged={handleBoundsChanged}
          >
            {
              PlacesData.map((store, i) => {
                // console.log(store)
                return (
                  (
                    <CustomMarker
                      lat={store.geo_location.latitude}
                      lng={store.geo_location.longitude}
                      key={store._id}
                      content={<MapMarker place={store} idx={i} />}
                    />
                  )
                )
              })}
          </GoogleMap>

          <div />
        </>
      )}
    </>
  );
};

export default Map;
