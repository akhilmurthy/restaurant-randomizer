import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PhotoSlideshow = ({ photos }) => {
  const [current, setCurrent] = useState(0);

  const nextPhoto = () => {
    setCurrent((current + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrent((current - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative">
      {photos.length > 0 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between z-10">
            <button
              onClick={prevPhoto}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-800 shadow-lg"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextPhoto}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-800 shadow-lg"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div
            style={{
              width: "500px",
              height: "500px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={photos[current]}
              alt={`Restaurant photo ${current + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoSlideshow;
