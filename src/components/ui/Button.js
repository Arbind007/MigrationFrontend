// src/components/ui/button.js
import React from "react";

export const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md ${className}`}
  >
    {children}
  </button>
);
