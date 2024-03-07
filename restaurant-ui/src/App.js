import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import PriceSelectButton from "./PriceSelectButton";
import MapComponent from "./MapComponent";
import axios from "axios";

function App() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [otherCuisine, setOtherCuisine] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [maxDistance, setMaxDistance] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [cuisines, setCuisines] = useState([
    { name: "Filipino", alias: "filipino" },
    { name: "Indian", alias: "indpak" }, // For Indian, Yelp uses 'indpak' to include both Indian and Pakistani cuisines
    { name: "Italian", alias: "italian" },
    { name: "Japanese", alias: "japanese" },
    { name: "American", alias: "tradamerican" }, // Assuming traditional American cuisine
    { name: "Korean", alias: "korean" },
    { name: "Mediterranean", alias: "mediterranean" },
    { name: "Mexican", alias: "mexican" },
    { name: "French", alias: "french" },
    { name: "Chinese", alias: "chinese" },
  ]);

  const handleFeatureClick = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the cuisine to the selectedCuisines array
      setSelectedCuisines((prevSelectedCuisines) => [
        ...prevSelectedCuisines,
        value,
      ]);
    } else {
      // Remove the cuisine from the selectedCuisines array
      setSelectedCuisines((prevSelectedCuisines) =>
        prevSelectedCuisines.filter((cuisine) => cuisine !== value)
      );
    }
  };

  const handleOtherCuisineChange = (event) => {
    setOtherCuisine(event.target.value);
  };

  const addOtherCuisine = () => {
    if (otherCuisine && !cuisines.includes(otherCuisine)) {
      setCuisines([...cuisines, otherCuisine]);
      setSelectedCuisines([...selectedCuisines, otherCuisine]);
      setOtherCuisine("");
    }
  };
  console.log(latitude, longitude);
  const handleRandomize = () => {
    const apiKey =
      "aQt_Th1T2kOYbKbS463k24x4E20q_MRL-6qr4X_ebk2RJk9a4os--pO7UcRN7AdTZ7RaicdoE_lJGabw94TgzwLTCsqNK4-iXSytyeHHd51adnKKZoZVoKruaX3iZXYx"; // Replace with your Yelp API key

    // Construct search parameters based on selected criteria
    const params = {
      term: "restaurants",
      latitude: latitude,
      longitude: longitude,
      categories: selectedCuisines.join(","), // Join selected cuisines into comma-separated string
      price: selectedPrice.join(","), // Join selected price range into comma-separated string
      attributes: selectedFeatures.join(","), // Join selected features into comma-separated string
      radius: maxDistance * 1609.34, // Convert maxDistance from miles to meters
    };

    // Make request to Yelp API
    axios
      .get("http://localhost:3001/search", {
        params: params,
      })
      .then((response) => {
        console.log(response.data.businesses);
        // Handle response data
      })
      .catch((error) => {
        console.error("Error making request to server:", error);
        // Handle errors
      });
  };

  return (
    <div className="flex">
      <div className="w-1/6 h-screen bg-[#ffbc63] border-r border-[#ff580f]">
        <hr className="border" />
        <div className="p-4">
          <h3 className="text-md font-bold">Cuisines</h3>
          <div className="space-y-2 flex flex-col pt-2">
            {cuisines.map((cuisine) => (
              <label
                key={cuisine.alias}
                htmlFor={cuisine.alias}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  id={cuisine.alias}
                  name="cuisine"
                  value={cuisine.alias}
                  onChange={handleCheckboxChange}
                  checked={selectedCuisines.includes(cuisine.alias)}
                />
                <span className="ml-1">{cuisine.name}</span>
              </label>
            ))}
            <div className="flex pt-2">
              <input
                type="text"
                value={otherCuisine}
                onChange={handleOtherCuisineChange}
                placeholder="Other Cuisine"
                className="p-1 border-t border-[#ff580f] flex-grow"
              />
              <button
                onClick={addOtherCuisine}
                className="px-4 py-2 bg-[#ff580f] text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <hr className="border-t border-[#ff580f]" />

        <div className="p-4">
          <h3 className="text-md font-bold">Price Range</h3>
          <div className="pt-2">
            <PriceSelectButton
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
        </div>
        <hr className="border-t border-[#ff580f]" />
        <div className="p-4">
          <h3 className="text-md font-bold">Features</h3>
          <div className="flex justify-center space-x-2 pt-2">
            <button
              className={`px-4 py-2 border border-[#ff580f] rounded-full ${
                selectedFeatures.includes("outdoor_seating")
                  ? "bg-[#ff580f] text-white"
                  : ""
              }`}
              onClick={() => handleFeatureClick("outdoor_seating")}
            >
              Outdoor Seating
            </button>
          </div>
        </div>
        <div className="p-4 border-t border-[#ff580f]">
          <h3 className="text-md font-bold">Max Distance</h3>
          <div className="flex pt-5">
            <input
              type="number"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              placeholder="Max Distance (in miles)"
              className="px-4 py-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center pt-5">
          {longitude !== 0 && latitude !== 0 && (
            <button
              onClick={handleRandomize}
              className="px-4 py-2 bg-[#ff580f] text-white rounded-md"
            >
              Randomize
            </button>
          )}
        </div>
      </div>

      <div className="w-5/6 flex bg-gradient-to-r from-[#ffbc63] via-[#ff8e56] via-[#ff7e26] to-[#ff580f]">
        <div className="w-1/2">
          <MapComponent setLongitude={setLongitude} setLatitude={setLatitude} />
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}

export default App;
