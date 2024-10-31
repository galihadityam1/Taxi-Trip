// Import the necessary libraries and components as before
"use client";
import { useState, useEffect, useCallback, Suspense } from 'react';
import Map, { Source, Layer, Popup, ViewState, MapLayerMouseEvent } from 'react-map-gl';
import type { TaxiTrip } from '@/Types';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_ACCESS_TOKEN } from './utils/constant';
import TableTrips from './components/TableTrips';
import { fetchTrips } from '@/actions/trips';
import { useSearchParams } from 'next/navigation';

const MAPBOX_TOKEN = MAPBOX_ACCESS_TOKEN;

interface TripPopupInfo {
  trip: TaxiTrip;
  x: number;
  y: number;
}

const INITIAL_VIEW_STATE: ViewState = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 11,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 }
};

// Component to load search parameters
function SearchParamsWrapper({ onParamsLoaded }: { onParamsLoaded: (params: URLSearchParams) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onParamsLoaded(searchParams);
  }, [searchParams, onParamsLoaded]);

  return null;
}

const Home = () => {
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [popupInfo, setPopupInfo] = useState<TripPopupInfo | null>(null);
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);

  const onMouseEnter = useCallback((event: MapLayerMouseEvent) => {
    if (event.features && event.features[0]) {
      setPopupInfo({
        trip: event.features[0].properties as TaxiTrip,
        x: event.point.x,
        y: event.point.y
      });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setPopupInfo(null);
  }, []);

  const fetchData = useCallback(async (searchParams: URLSearchParams) => {
    try {
      const time = searchParams.get('time');
      const fare = searchParams.get('fare');
      const distance = searchParams.get('distance');
      const payment = searchParams.get('payment');
      const params = { time, fare, distance, payment };
      let data;
      if (time || fare || distance || payment) {
        data = await fetchTrips(params);
      } else {
        data = await fetchTrips(null);
      }

      setFilteredTrips(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const handleParamsLoaded = useCallback(
    (params: URLSearchParams) => {
      fetchData(params);
    },
    [fetchData]
  );

  return (
    <div className="h-screen w-full flex flex-row">
      <Suspense fallback={<div>Loading search params...</div>}>
        <SearchParamsWrapper onParamsLoaded={handleParamsLoaded} />
      </Suspense>

      <div className="w-1/2 p-4 bg-white shadow-sm overflow-auto border-r-2 border-black">
        <Suspense fallback={<div>Loading trips...</div>}>
          <TableTrips data={filteredTrips} />
        </Suspense>
      </div>

      <div className="w-1/2 relative">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={['trip-lines']}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Source
            id="trips"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: (filteredTrips && filteredTrips.map((trip: TaxiTrip) => ({
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [trip.pickup_longitude, trip.pickup_latitude],
                    [trip.dropoff_longitude, trip.dropoff_latitude]
                  ]
                },
                properties: trip
              }))) || []
            }}
          >
            <Layer
              id="trip-lines"
              type="line"
              paint={{
                'line-color': '#007cbf',
                'line-width': 1,
                'line-opacity': 0.6
              }}
            />
          </Source>

          {popupInfo && (
            <Popup
              longitude={Number(popupInfo.trip.pickup_longitude)}
              latitude={Number(popupInfo.trip.pickup_latitude)}
              closeButton={false}
              className="bg-white p-2 rounded shadow-lg"
            >
              <div>
                <p><strong>Fare:</strong> ${Number(popupInfo.trip.fare_amount).toFixed(2)}</p>
                <p><strong>Distance:</strong> {Number(popupInfo.trip.trip_distance).toFixed(1)} miles</p>
                <p><strong>Payment:</strong> {popupInfo.trip.payment_type}</p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Home;
