import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import cat from "./categories.json";

const CategoriesDropdown = ({
  categories,
  setCategories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Assuming your categories.json is an array of category objects
    const formattedOptions = cat.map((category) => ({
      value: category.alias,
      label: category.title,
    }));
    setOptions(formattedOptions);
  }, []);

  const handleChange = (selectedOption) => {
    const transformedSelection = {
      alias: selectedOption.value, // Assuming the 'value' corresponds to 'alias'
      name: selectedOption.label, // Assuming the 'label' corresponds to 'title'
    };

    setCategories([...categories, transformedSelection]);
    setSelectedCategories([...selectedCategories, selectedOption.value]);
  };

  return (
    <div>
      <Select
        className="w-56 text-sm"
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default CategoriesDropdown;
