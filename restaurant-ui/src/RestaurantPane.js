import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasFaStar,
  faStar as farFaStar,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import PhotoSlideshow from "./PhotoSlideshow"; // Adjust the import path

const RestaurantPane = ({ randomRest }) => (
  <div className="w-full md:w-1/2 flex items-center justify-center h-full">
    {randomRest === null ? (
      <div>No restaurants meet your criteria</div>
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
                      height="500px"
                      width="500px"
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
      </div>
    ) : null}
  </div>
);

export default RestaurantPane;
