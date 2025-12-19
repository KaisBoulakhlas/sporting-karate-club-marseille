import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
}

interface MapComponentProps {
  locations: Location[];
}

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Create new map instance
      const map = L.map(containerRef.current);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const bounds = L.latLngBounds([]);

      locations.forEach((location) => {
        console.log("Adding marker at:", location.coordinates, "with name:", location.name);

        const marker = L.marker(location.coordinates, {
          icon: L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(map);

        marker.bindPopup(location.name);
        bounds.extend(location.coordinates);
        console.log("Marker added successfully");
      });

      if (locations.length > 0) {
        map.fitBounds(bounds, {
          padding: [80, 80],
          maxZoom: 12
        });
        setTimeout(() => {
          const currentZoom = map.getZoom();
          map.setZoom(currentZoom - 1);
        }, 200);
      } else {
        map.setView([43.33537, 5.43568], 11);
      }

      mapRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "500px",
        width: "100%",
        position: "relative"
      }}
    />
  );
};

export default MapComponent;
