// src/components/ui/card.js
import React from "react";

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-2xl  border border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => <div className="mt-2">{children}</div>;
