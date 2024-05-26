import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import {
    useMapsLibrary,
    useMap
  } from '@vis.gl/react-google-maps';

const Directions = ({ from, to }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const selected = routes[0];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch(() => {
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, from, to]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(0);
  }, [directionsRenderer]);

  if (!leg) return null;

  return <></>;
};

Directions.propTypes = {
  from: PropTypes.func,
  to: PropTypes.func,
};

export default Directions;
