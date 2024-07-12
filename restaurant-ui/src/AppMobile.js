import React, { useState } from "react";
import OptionsPane from "./OptionsPane";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasFaStar,
  faStar as farFaStar,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import PhotoSlideshow from "./PhotoSlideshow";

const AppMobile = ({
  categories,
  selectedCategories,
  handleCheckboxChange,
  setCategories,
  setSelectedCategories,
  selectedPrice,
  setSelectedPrice,
  ratingFilter,
  setRatingFilter,
  maxDistance,
  setMaxDistance,
  handleRandomize,
  randomRest,
  longitude,
  latitude,
  setLatitude,
  setLongitude,
}) => {
  const [isRandomized, setIsRandomized] = useState(false);

  const handleRandomizeClick = () => {
    setIsRandomized(true);
    handleRandomize();
  };

  const handleBackClick = () => {
    setIsRandomized(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#e6a584]">
      {!isRandomized ? (
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
          handleRandomize={handleRandomizeClick}
          longitude={longitude}
          latitude={latitude}
        />
      ) : (
        <div className="md:flex">
          <button
            onClick={handleBackClick}
            className=" p-2 bg-[#ff8a5b] hover:bg-[#ff580f] rounded-full text-gray-800 shadow-lg mt-2 ml-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="px-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-50 h-28 mx-auto mb-4 mt-2"
            />
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
              {randomRest.name}
            </h2>
            <p className="text-gray-500">{randomRest.location.address1}</p>
            <div className="mt-4">
              {randomRest.categories.map((category) => (
                <span
                  key={category.alias}
                  className="inline-block text-white bg-[#F56243] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-3"
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
                    <span className="bg-[#F56243] text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      {randomRest.price}
                    </span>
                  )}
                  <div className="mt-2">
                    <PhotoSlideshow
                      photos={randomRest.photos || []}
                      height="300px"
                      width="100%"
                    />
                  </div>
                </div>
              )}
            </div>
            <a
              href={randomRest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#F56243] text-white mt-4 py-2 px-4 rounded"
            >
              View on Yelp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppMobile;
