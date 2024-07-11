import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import CategoriesDropdown from "./CategoriesDropdown"; // Adjust the import path
import PriceSelectButton from "./PriceSelectButton"; // Adjust the import path

const OptionsPane = ({
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
  longitude,
  latitude,
}) => (
  <div className="w-full h-full bg-[#e6a584] border-r border-[#F56243] overflow-auto">
    <hr className="border" />
    <div className="p-4">
      <img src="/logo.png" alt="Logo" className="w-50 h-28 mx-auto mb-4" />
      <hr className="border-b border-[#F56243]" />
      <h3 className="text-md font-bold mt-5">Categories</h3>
      <div className="space-y-2 text-sm flex flex-col pt-2">
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
    <hr className="border-t border-[#F56243]" />

    <div className="p-4">
      <h3 className="text-md font-bold">Price Range</h3>
      <div className="pt-2">
        <PriceSelectButton
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
      </div>
    </div>
    <hr className="border-t border-[#F56243]" />
    <div className="p-4">
      <h3 className="text-md font-bold">Rating</h3>
      <div className="flex space-x-2 pt-2">
        {[2, 3, 4].map((rating) => (
          <button
            key={rating}
            className={`px-2 py-1 border border-[#F56243] ${
              ratingFilter >= rating ? "bg-[#F56243]" : ""
            } rounded-full`}
            onClick={() =>
              setRatingFilter(ratingFilter !== rating ? rating : 0)
            }
          >
            {[...Array(rating)].map((e, i) => (
              <FontAwesomeIcon
                key={i}
                icon={fasFaStar}
                className="text-white text-sm"
              />
            ))}
            <span className="text-white">+</span>
          </button>
        ))}
      </div>
    </div>
    <hr className="border-t border-[#F56243]" />

    <div className="p-4 border-t border-[#F56243]">
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
          className="px-4 py-2 mb-6 bg-[#F56243] text-white rounded-md"
        >
          Randomize
        </button>
      )}
    </div>
  </div>
);

export default OptionsPane;
