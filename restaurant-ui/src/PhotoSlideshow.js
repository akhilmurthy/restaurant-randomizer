import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PhotoSlideshow = ({ photos, height, width }) => {
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
              className="p-2 bg-[#ff8a5b] hover:bg-[#ff580f] rounded-full text-gray-800 shadow-lg"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextPhoto}
              className="p-2 bg-[#ff8a5b] hover:bg-[#ff580f] rounded-full text-gray-800 shadow-lg"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div
            style={{
              width: width,
              height: height,
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
