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
import Select from "react-select";
import categories from "./categories.json";
import CategoriesDropdown from "./CategoriesDropdown";

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
      .get("http://localhost:3001/search", { params: params })
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
              `http://localhost:3001/business-details/${randomRestaurant.id}`
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
    <div className="flex h-screen w-screen">
      <div className="w-1/6 h-full bg-[#ffbc63] border-r border-[#ff580f]">
        <hr className="border" />
        <div className="p-4">
          <h3 className="text-md font-bold">Categories</h3>
          <div className="space-y-2 flex flex-col pt-2">
            {categories.map((category) => (
              <label
                key={category.alias}
                htmlFor={category.alias}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  id={category.alias}
                  name="cuisine"
                  value={category.alias}
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes(category.alias)}
                />
                <span className="ml-1">{category.name}</span>
              </label>
            ))}
            <div className="flex pt-2">
              <CategoriesDropdown
                categories={categories}
                setCategories={setCategories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
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
          <h3 className="text-md font-bold">Rating</h3>
          <div className="flex space-x-2 pt-2">
            {[2, 3, 4].map((rating) => (
              <button
                key={rating}
                className={`px-2 py-1 border border-[#ff580f] ${
                  ratingFilter >= rating ? "bg-[#ff580f]" : ""
                } rounded-full`}
                onClick={() =>
                  setRatingFilter(ratingFilter !== rating ? rating : 0)
                }
              >
                {[...Array(rating)].map((e, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={fasFaStar} // Ensure you've imported faStar as shown earlier
                    className="text-white text-sm"
                  />
                ))}
                <span className="text-white">+</span>
              </button>
            ))}
          </div>
        </div>
        <hr className="border-t border-[#ff580f]" />

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
      <div className="w-5/6 flex bg-gradient-to-r from-[#ffbc63] via-[#ff8e56] via-[#ff7e26] to-[#ff580f] overflow-hidden">
        <div className="w-1/2 h-full">
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />{" "}
        </div>
        <div className="w-1/2">
          {randomRest === null ? (
            <div> No restaurants meet your criteria</div>
          ) : randomRest ? (
            <div
              key={randomRest.id}
              className="restaurant max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
            >
              <div className="md:flex">
                <div className="p-8">
                  <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                    {randomRest.name}
                  </h2>
                  <p className=" text-gray-500">
                    {randomRest.location.address1}
                  </p>
                  <div className="mt-4">
                    {randomRest.categories.map((category) => (
                      <span
                        key={category.alias}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-3"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2">
                    {randomRest.rating && (
                      <div>
                        <span className="mr-2">{randomRest.rating}</span>
                        <Rating
                          className="mr-2"
                          emptySymbol={
                            <FontAwesomeIcon
                              icon={farFaStar}
                              className="text-yellow-400"
                            />
                          }
                          fullSymbol={
                            <FontAwesomeIcon
                              icon={fasFaStar}
                              className="text-yellow-400"
                            />
                          }
                          fractions={2}
                          readonly
                          initialRating={randomRest.rating}
                        />
                        <span className="text-gray-600 mr-2">
                          ({randomRest.review_count} reviews)
                        </span>
                        {randomRest.price && (
                          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {randomRest.price}
                          </span>
                        )}
                        <div className="mt-2">
                          <PhotoSlideshow photos={randomRest.photos || []} />
                        </div>
                      </div>
                    )}
                  </div>

                  <a
                    href={randomRest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#ff580f] text-white mt-4 py-2 px-4 rounded"
                  >
                    View on Yelp
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default App;
