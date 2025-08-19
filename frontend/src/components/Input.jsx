import React from "react";
const Input = ({ type, placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="p-3 text-base border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-black"
    />
  );
};
export default Input;
