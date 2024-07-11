import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import PriceSelectButton from "./PriceSelectButton";
import axios from "axios";
import MapComponent from "./MapComponent";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import PhotoSlideshow from "./PhotoSlideshow";
import categories from "./categories.json";
import CategoriesDropdown from "./CategoriesDropdown";
import OptionsPane from "./OptionsPane";
import RestaurantPane from "./RestaurantPane";

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [maxDistance, setMaxDistance] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [randomRest, setRandomRest] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3001/yelp-categories"
  //       );

  //       setCategories(response.data.categories);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       // Handle error, maybe set an error message in state
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const [categories, setCategories] = useState([
    { name: "Indian", alias: "indpak" }, // For Indian, Yelp uses 'indpak' to include both Indian and Pakistani cuisines
    { name: "Filipino", alias: "filipino" },
    { name: "Italian", alias: "italian" },
    { name: "Japanese", alias: "japanese" },
    { name: "American", alias: "tradamerican" }, // Assuming traditional American cuisine
    { name: "Korean", alias: "korean" },
    { name: "Mediterranean", alias: "mediterranean" },
    { name: "Mexican", alias: "mexican" },

    { name: "Chinese", alias: "chinese" },
  ]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the cuisine to the selectedCuisines array
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        value,
      ]);
    } else {
      // Remove the cuisine from the selectedCuisines array
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter((category) => category !== value)
      );
    }
  };

  const handleRandomize = () => {
    // Construct search parameters based on selected criteria
    const params = {
      term: "restaurants",
      latitude: latitude,
      longitude: longitude,
      categories: selectedCategories.join(","), // Join selected cuisines into comma-separated string
      price: selectedPrice.join(","), // Join selected price range into comma-separated string
      radius: maxDistance > 20 ? 20 * 1609.34 : maxDistance * 1609.34, // Convert maxDistance from miles to meters
    };

    // Make request to Yelp API
    axios
      .get("https://restaurant-server-7phcvm3nna-uc.a.run.app/search", {
        params: params,
      })
      .then((response) => {
        const filteredBusinesses = response.data.businesses.filter(
          (business) => business.rating >= ratingFilter
        );

        setRestaurants(filteredBusinesses);
        if (filteredBusinesses.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * filteredBusinesses.length
          );
          const randomRestaurant = filteredBusinesses[randomIndex];
          setLatitude(randomRestaurant.coordinates.latitude);
          setLongitude(randomRestaurant.coordinates.longitude);

          axios
            .get(
              `https://restaurant-server-7phcvm3nna-uc.a.run.app/business-details/${randomRestaurant.id}`
            )
            .then((response) => {
              randomRestaurant["photos"] = response.data;
              setRandomRest(randomRestaurant);
            })
            .catch((error) => {
              console.error(
                "Error fetching detailed business information:",
                error
              );
            });
        } else {
          setRandomRest(null);
        }
        // Handle response data
      })
      .catch((error) => {
        console.error("Error making request to server:", error);
        // Handle errors
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="w-1/5">
        <OptionsPane
          categories={categories}
          selectedCategories={selectedCategories}
          handleCheckboxChange={handleCheckboxChange}
          setCategories={setCategories}
          setSelectedCategories={setSelectedCategories}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          maxDistance={maxDistance}
          setMaxDistance={setMaxDistance}
          handleRandomize={handleRandomize}
          longitude={longitude}
          latitude={latitude}
        />
      </div>
      <div className={`w-4/5 flex flex-row bg-[#e6a584] overflow-hidden`}>
        <div className={`${randomRest ? "w-1/2" : "w-full"} h-full`}>
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>
        {randomRest && <RestaurantPane randomRest={randomRest} />}
      </div>
    </div>
  );
}
export default App;
