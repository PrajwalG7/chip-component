import React from "react";

interface ChipProps {
  label: string;
  onRemove: (label: string) => void;
  highlighted?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove, highlighted }) => (
  <div
    className={`bg-slate-300 rounded-xl p-1 ${
      highlighted ? "border-blue-800 border-2" : ""
    }`}
  >
    {label}
    <button onClick={() => onRemove(label)} className="ml-1">
      x
    </button>
  </div>
);

export default Chip;
