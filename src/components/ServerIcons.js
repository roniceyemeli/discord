import React from "react";

const ServerIcons = ({ image }) => {
  return (
    <img
      src={image}
      alt="ali"
      className="h-12  cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl hover:bg-gray-900"
    />
  );
};

export default ServerIcons;
