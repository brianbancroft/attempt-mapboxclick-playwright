import { useState, useEffect, useMemo, useCallback } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Popup from "./Popup";

import { dataLayer } from "./map-style";
import { updatePercentiles } from "./utils";

const token =
  "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJjbDlvZ3B5dHQwZWZpM3VvOGRwZ2M4Z3BkIn0.LgSjTyt_o46a6rJc9Ec71g";

function MapboxMap() {
  const [year, setYear] = useState(2015);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch(
      "https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson"
    )
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const onClick = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  const handleClose = useCallback(() => {
    setHoverInfo(undefined);
  }, []);

  const data = useMemo(() => {
    return (
      allData && updatePercentiles(allData, (f) => f.properties.income[year])
    );
  }, [allData, year]);

  return (
    <section className="w-screen h-screen">
      <Map
        testMode
        id="map"
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 4.5,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={token}
        interactiveLayerIds={["data"]}
        onClick={onClick}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <>
            <Popup
              left={hoverInfo.x}
              top={hoverInfo.y}
              state={hoverInfo.feature.properties.name}
              medianHouseholdIncome={hoverInfo.feature.properties.value}
              incomePercentile={
                (hoverInfo.feature.properties.percentile / 8) * 100
              }
              handleClose={handleClose}
            />
          </>
        )}
      </Map>
    </section>
  );
}

export default MapboxMap;
