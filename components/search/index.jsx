import React, { useState, useContext, useEffect } from "react";
import { MdSearch, MdDelete } from "react-icons/md"; // Import delete icon
import { InputContext } from "@/app/page";
import AOS from "aos";
import "aos/dist/aos.css";

const Search = () => {
  const [value, setValue] = useState("");
  const { inputValue, setInputValue } = useContext(InputContext);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered index

  const handleInputChange = (e) => setValue(e.target.value);

  const handleSubmit = () => {
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      return;
    }

    if (!searchedWords.includes(trimmedValue)) {
      const updatedSearchWords = [...searchedWords, trimmedValue];

      localStorage.setItem('searchedWords', JSON.stringify(updatedSearchWords));

      setInputValue(trimmedValue);
      setValue("");
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleDelete = (index) => {
    const updatedSearchWords = [...searchedWords];
    updatedSearchWords.splice(index, 1);

    localStorage.setItem('searchedWords', JSON.stringify(updatedSearchWords));
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  const searchedWords = JSON.parse(localStorage.getItem('searchedWords')) || [];

  return (
    <div className="bg-slate-50 rounded-lg p-4 md:p-8 md:h-full w-[100%] md:w-[30%] lg:overflow-hidden overflow-auto">
      <h1
        className="font-semibold text-start mb-4 text-[1.5em] flex justify-start items-center"
        data-aos="fade-in"
      >
        Word<span>Finder</span>
      </h1>
      <div
        className="p-4 rounded-lg bg-slate-100 flex items-center justify-center"
        data-aos="fade-in"
      >
        <input
          type="search"
          name=""
          id="search"
          placeholder="Let's Search..."
          className="rounded-lg bg-slate-100 outline-none border-none text-[20px] w-[100%]"
          onChange={handleInputChange}
          value={value}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={handleSubmit}>
          <MdSearch size={30} className="text-primary" />
        </button>
      </div>

      <div className="mt-4 w-[100%] overflow-hidden h-[100%]">
        <h2 className="text-lg font-bold mb-2">Recent Searches:</h2>
        <ul className="flex justify-start items-center flex-col gap-3 w-[100%] h-[100%] overflow-hidden overflow-y-auto">
          {searchedWords.map((word, index) => (
            <li
              key={index}
              className="cursor-pointer w-full p-2 rounded-md relative hover:bg-slate-100 flex justify-between items-center"
              onClick={() => setInputValue(word)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {word}
              {hoveredIndex === index && (
                <button
                  className="absolute right-5 top-[20%] z-10 text-red-500 rounded-full p-1 hover:bg-slate-200"
                  onClick={() => handleDelete(index)}
                >
                  <MdDelete size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
