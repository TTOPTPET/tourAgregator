import * as L from "leaflet";
import { Marker, Polyline, useMapEvents } from "react-leaflet";
import iconImage from "../../../media/Icons/mapIcons/maps-and-flags.png";
import { useEffect } from "react";
type Props = {
  positions: [number, number][];
  setPositions: (positions: [number, number][]) => void;
  accessType?: "insert" | "observe";
  center: [number, number];
};

export default function LocationMarker({
  positions,
  setPositions,
  accessType,
  center,
}: Props) {
  const LeafIcon: any = L.Icon.extend({
    options: {},
  });

  const Icon = new LeafIcon({
    iconUrl: iconImage,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
  });

  const map = useMapEvents({
    click(e) {
      if (accessType === "insert") {
        setPositions([
          ...positions,
          [+e.latlng.lat.toFixed(5), +e.latlng.lng.toFixed(5)],
        ]);
      }
    },
  });

  useEffect(() => {
    if (accessType === "observe")
      map.flyTo(center, map.getZoom(), { duration: 0.1 });
  }, [center]);

  return (
    <>
      {positions && positions.length && (
        <>
          <Marker position={positions[0]} icon={Icon}>
            {/* <Tooltip permanent>Начало</Tooltip> */}
          </Marker>
          <Polyline
            pathOptions={{ color: "#30ABC8", weight: 5 }}
            positions={positions}
          />
          {positions.length > 1 && (
            <Marker position={positions[positions.length - 1]} icon={Icon}>
              {/* <Tooltip permanent>Конец</Tooltip> */}
            </Marker>
          )}
        </>
      )}
    </>
  );
}
