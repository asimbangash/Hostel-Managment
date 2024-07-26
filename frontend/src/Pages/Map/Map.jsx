import React, { useState } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Map() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const center = { lat: +lat, lng: +lng };
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return null; // Render nothing if Google Maps is not loaded

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      bgColor="blue.200"
      h="100vh"
      w="100vw"
    >
      <Box p={4} bgColor="white" h={"20"} shadow="base" w={"100vw"}>
        <HStack spacing={4} justifyContent="space-between">
          {/* Add your logout button or any other header content here */}
        </HStack>
      </Box>

      <Box
        position="absolute"
        top={0}
        left={0}
        h="100%"
        w="100%"
        bgColor="blue.200"
        bgImage="https://images.unsplash.com/photo-1647117181799-0ac3e50a548a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        bgPos="bottom"
      >
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(map) => setMap(map)}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default Map;
