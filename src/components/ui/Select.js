// src/components/ui/select.js
import React from "react";

export const Select = ({ onValueChange, children }) => {
  return (
    <div className="relative">
      <select
        onChange={(e) => onValueChange(e.target.value)}
        className="form-select form-select-xl w-50"
      >
        {children}
      </select>
    </div>
  );
};

export const SelectTrigger = ({ children, className }) => (
  <div className={`border border-gray-300 p-3 rounded-lg bg-white cursor-pointer shadow-sm ${className}`}>
    {children}
  </div>
);

export const SelectValue = ({ placeholder }) => <span className="text-gray-500">{placeholder}</span>;

export const SelectContent = ({ children }) => (
  <div className="absolute bg-white border border-gray-300 shadow-lg rounded-lg mt-1 w-full z-50">
    {children}
  </div>
);

export const SelectItem = ({ value, children }) => (
  <option value={value} className="p-3 hover:bg-gray-200">
    {children}
  </option>
);
