import React, { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import Chip from "./components/chip";
import InputField from "./components/input_field";
import Suggestions from "./components/suggestions";

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([
    "User1",
    "User2",
    "User3",
    "User4",
    "User5",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [highlightedChip, setHighlightedChip] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    setInputValue(value);

    setFilteredSuggestions(
      value !== ""
        ? items.filter(
            (item) =>
              !chips.includes(item) && item.toLowerCase().includes(value)
          )
        : []
    );
  };

  const handleItemClick = (item: string) => {
    setChips((prevChips) => [...prevChips, item]);
    setInputValue("");
    setFilteredSuggestions((prevSuggestions) =>
      prevSuggestions.filter((suggestion) => suggestion !== item)
    );
  };

  const handleChipRemove = (chip: string) => {
    setChips((prevChips) => prevChips.filter((item) => item !== chip));
    setFilteredSuggestions((prevSuggestions) => {
      if (chips.length === 1) {
        return items;
      }
      return [...prevSuggestions, chip];
    });
    setHighlightedChip(null);
  };

  const handleBackspacePress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      if (!highlightedChip) {
        const lastChip = chips[chips.length - 1];
        setHighlightedChip(lastChip);
      } else {
        handleChipRemove(highlightedChip);
      }
    }
  };

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Display suggestions when the input is focused
      setFilteredSuggestions(items.filter((item) => !chips.includes(item)));
    }
  };

  const handleSuggestionsFocus = () => {
    if (suggestionsRef.current) {
      suggestionsRef.current.focus();
    }
  };

  return (
    <div className="flex mt-10 justify-center">
      <div className="w-2/3">
        <div className="text-3xl font-medium text-blue-700 text-center mb-4">
          Pick Users
        </div>
        <div className="flex flex-wrap p-3 gap-x-2 gap-y-2 border border-gray-300 rounded">
          {chips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              onRemove={() => handleChipRemove(chip)}
              highlighted={highlightedChip === chip}
            />
          ))}
          <InputField
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onBackspacePress={handleBackspacePress}
            onFocus={handleInputFocus}
          />
        </div>
        {filteredSuggestions.length > 0 && (
          <Suggestions
            ref={suggestionsRef}
            items={filteredSuggestions}
            handleItemClick={handleItemClick}
            onFocus={handleSuggestionsFocus}
          />
        )}
      </div>
    </div>
  );
};

export default App;
