// src/components/ui/input.js
import React from "react";

export const Input = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="form-control form-control-lg"
  />
);
