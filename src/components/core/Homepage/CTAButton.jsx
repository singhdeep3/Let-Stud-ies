import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkto }) => {
  return (
    <div>
      <Link to={linkto}>
        <div
          className={`inline-block  rounded-md font-bold transition-transform duration-200 hover:scale-105  hover:shadow-2xl hover:shadow-lime-950/80    ${
            active ? "bg-amber-200 text-black" : "bg-gray-800 text-white"
          }`}
        >
          <div className="text-center text-[13px] py-3 px-6 rounded-md font-bold">
            {children}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CTAButton;
