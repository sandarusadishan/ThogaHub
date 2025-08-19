import React from "react";
const Button = ({ children, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-3 text-base bg-black text-white rounded-md w-full cursor-pointer transition-colors duration-300 hover:bg-gray-700"
    >
      {children}
    </button>
  );
};
export default Button;
