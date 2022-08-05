import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

var data = require("./data/Farmers_Markets.json");
var wardData = require("./data/Wards.json");

const App = () => {
  const markets = data["features"];
  const wards = wardData["features"];

  return (
    <MapContainer center={[38.9072, -77.0369]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markets.map((market) => (
        <Marker
          position={
            [
              ...market["geometry"]["coordinates"],
            ].reverse() /* deep copy and reverse */
          }
        >
          <Popup>
            <a
              href={market["properties"]["WEB_URL"]}
              target="_blank"
              rel="noreferrer"
            >
              {market["properties"]["NAME"]}
            </a>
          </Popup>
        </Marker>
      ))}
      {wards.map((w) => (
        <Polyline
          positions={w["geometry"]["coordinates"][0].map((c) =>
            [...c].reverse()
          )}
          pathOptions={{ color: "black", weight: 1 }}
          smoothFactor={1}
        />
      ))}
    </MapContainer>
  );
};

export default App;
