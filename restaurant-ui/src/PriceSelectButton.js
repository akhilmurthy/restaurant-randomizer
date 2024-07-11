const PriceSelectButton = ({ selectedPrice, setSelectedPrice }) => {
  const handleOptionClick = (option) => {
    const index = selectedPrice.indexOf(option);
    if (index === -1) {
      setSelectedPrice([...selectedPrice, option]);
    } else {
      setSelectedPrice(selectedPrice.filter((item) => item !== option));
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        className={`px-4 py-2 border border-[#F56243] rounded-full ${
          selectedPrice.includes(1) ? "bg-[#F56243] text-white" : ""
        }`}
        onClick={() => handleOptionClick(1)}
      >
        $
      </button>
      <button
        className={`px-4 py-2 border border-[#F56243] rounded-full ${
          selectedPrice.includes(2) ? "bg-[#F56243] text-white" : ""
        }`}
        onClick={() => handleOptionClick(2)}
      >
        $$
      </button>
      <button
        className={`px-4 py-2 border  border-[#F56243] rounded-full ${
          selectedPrice.includes(3) ? "bg-[#F56243] text-white" : ""
        }`}
        onClick={() => handleOptionClick(3)}
      >
        $$$
      </button>
      <button
        className={`px-4 py-2 border  border-[#F56243] rounded-full ${
          selectedPrice.includes(4) ? "bg-[#F56243] text-white" : ""
        }`}
        onClick={() => handleOptionClick(4)}
      >
        $$$$
      </button>
    </div>
  );
};

export default PriceSelectButton;
