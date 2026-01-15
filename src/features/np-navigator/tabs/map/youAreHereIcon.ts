import L from "leaflet";
import "./youAreHerePin.css";

export function createYouAreHereIcon(): L.DivIcon {
  return L.divIcon({
    className: "", 
    html: `
      <div class="center-body">
        <div class="np-you-pin"></div>
      </div>
    `,
    iconSize: [90, 90],
    iconAnchor: [20, 40],
  });
}