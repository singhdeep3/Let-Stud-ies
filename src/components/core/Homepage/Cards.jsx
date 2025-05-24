import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Highlighter from "./Highlighter";
import CourseCard from "./CourseCard";
const tabs = ["Free", "Beginners", "Popular", "Advanced", "Future trends"];

const Cards = () => {
  const [current, setCurrent] = useState(tabs[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setCards = (value) => {
    setCurrent(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className="mt-20">
      <div className="text-4xl font-semibold text-center">
        LookUp to your <Highlighter text={"Potential."} />
      </div>
      <p className="text-center text-black mt-3 font-semibold">
        Learn, teach, know with Pheonix.
      </p>
      <div className="flex flex-row gap-3 bg-rose-800 px-3 py-3 mb-28 mt-5 rounded-full">
        {tabs.map((e, idx) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-7 ${current === e
                ? "bg-rose-600 text-black font-medium"
                : "text-black"
                } rounded-full transition-all duration-200 cursor-pointer hover:bg-rose-900 hover:text-white px-3 p-3`}
              key={idx} onClick={() => setCards(e)}>
              {e}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[150px]  relative">
        <div className="absolute  w-full flex flex-row gap-10 justify-center items-center mx-auto ">
          {
            courses.map((e,idx)=>{
              return(
                <CourseCard key={idx} data={e} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
              )
            })
          }

        </div>
      </div>
    </div>
  );
};

export default Cards;
