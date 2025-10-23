"use client";

import { useDashboard } from "@/app/hooks/useContext";
import { useState, useEffect, useRef, KeyboardEvent } from "react";

type CustomSelect = {
  setSelectedValue: (value: number) => void;
  selectedValue: number;
};

export const CustomSelect = ({
  setSelectedValue,
  selectedValue,
}: CustomSelect) => {
  // State to manage the visibility of the dropdown menu.
  const [isOpen, setIsOpen] = useState(false);
  //State to manage which option is currently focused
  const [focusedOption, setFocusedOption] = useState<number | null>(null);
  // A ref to the main container, used to detect clicks outside the component.
  const selectRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef(new Map());
  // The values for the dropdown options.
  const options = [1, 2, 3, 4, 5];
  const { dispatch } = useDashboard();

  // This useEffect hook handles closing the dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the click is outside the select box.
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Add the event listener to the document.
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]); // Re-run effect if selectRef changes.

  // This useEffect handles keyboard navigation and focusing the initial option.
  useEffect(() => {
    if (isOpen) {
      // When the dropdown opens, focus on the currently selected option.
      const selectedOptionEl = optionRefs.current.get(selectedValue);
      if (selectedOptionEl) {
        selectedOptionEl.focus();
      }
    }
  }, [isOpen, selectedValue]);

  // Function to handle when an option is clicked.
  const handleOptionClick = (value: number) => {
    setSelectedValue(value);
    setIsOpen(!isOpen); // Close the dropdown after selection.
  };

  // Handles keyboard events on the main button and the options.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let isOpenCopy = !isOpen;

    if (event.key === " ") {
      event.preventDefault(); // Prevent default button behavior
      setIsOpen(isOpenCopy);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const currentIndex = options.indexOf(focusedOption!);
      let newIndex = currentIndex;
      if (event.key === "ArrowDown") {
        newIndex = (currentIndex + 1) % options.length;
      } else if (event.key === "ArrowUp") {
        newIndex = (currentIndex - 1 + options.length) % options.length;
      }
      setFocusedOption(options[newIndex]);
    } else if (event.key === "Enter") {
      // Select the focused option with the Enter key
      event.preventDefault();
      if (focusedOption) setSelectedValue(focusedOption);
      setIsOpen(isOpenCopy);
    }
  };

  return (
    <div
      className="relative w-full"
      ref={selectRef}
      aria-labelledby="custom-select-label"
    >
      {/* The button that shows the selected value */}
      <div
        className="w-full text-black bg-gray-50 text-center py-2 px-4 rounded-md border border-gray-300 cursor-pointer
                       flex justify-between items-center transition duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="combobox"
        aria-label="Select quantity options"
        aria-haspopup="listbox"
        aria-controls="custom-select-options"
        aria-expanded={isOpen}
        onKeyDown={handleKeyDown}
      >
        {/* The text displayed in the button */}
        <span id="selected-text">{`Quantity: ${selectedValue}`}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-label={isOpen ? "Open" : "Closed"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* The dropdown options list, conditionally rendered based on 'isOpen' state */}
      <div
        id="custom-select-options"
        aria-label="Options"
        role="listbox"
        className={`absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="py-1">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-black ${
                focusedOption === option ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={option === focusedOption}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
              ref={(el) => optionRefs.current.set(option, el)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
