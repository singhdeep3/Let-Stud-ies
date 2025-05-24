import React from "react";
import { FaWpbeginner } from "react-icons/fa";
import { FaLevelUpAlt } from "react-icons/fa";

const CourseCard = ({key,data,currentCard,setCurrentCard}) => {
  return <div>
    <div className="h-80 w-80 bg-rose-400 rounded-full flex flex-col items-center justify-center text-black gap-4 px-6 py-16">
        <div className="text-white text-1xl font-extrabold ">{data.heading}</div>
        <div className="font-semibold text-black text-justify">{data.description}</div>
        <div className="flex flex-row justify-between gap-16">
            <div className="text-blue-800 font-semibold flex items-center gap-3"><FaWpbeginner/>{data.level}</div>
            <div className="text-green-700 font-semibold flex items-center gap-1"><FaLevelUpAlt/>{data.lessionNumber}</div>
        </div>
    </div>
  </div>;
};

export default CourseCard;
