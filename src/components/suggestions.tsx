import React from "react";

interface SuggestionsProps {
  items: string[];
  handleItemClick: (item: string) => void;
  onFocus: () => void;
}

const Suggestions = React.forwardRef<HTMLDivElement, SuggestionsProps>(
  ({ items, handleItemClick, onFocus }, ref) => (
    <div
      ref={ref}
      className="bg-white border border-gray-300 rounded shadow-md w-1/3"
    >
      {items.map((item) => (
        <div
          key={item}
          onClick={() => handleItemClick(item)}
          onFocus={onFocus}
          className="suggestion-item p-2 cursor-pointer hover:bg-gray-100"
        >
          {item}
        </div>
      ))}
    </div>
  )
);

export default Suggestions;
