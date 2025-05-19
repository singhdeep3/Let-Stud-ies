import React from "react";
import Logo1 from "../../../assets/ProgressLogos/Logo1.png";
import Logo2 from "../../../assets/ProgressLogos/Logo2.png";
import Logo3 from "../../../assets/ProgressLogos/Logo3.png";
import Logo4 from "../../../assets/ProgressLogos/Logo4.png";
import line from "../../../assets/ProgressLogos/line.svg";
import Progress from "../../../assets/Images/Progress.jpg"
import Underline from "../../../assets/Images/Underline.svg"
const timeline = [
  {
    Logo: Logo1,
    heading: "Innovation",
    Description: "Driving smarter solutions",
  },
  {
    Logo: Logo2,
    heading: "Collaboration",
    Description: "Achieving more together",
  },
  {
    Logo: Logo3,
    heading: "Integrity",
    Description: "Acting with honesty",
  },
  {
    Logo: Logo4,
    heading: "Customer Focus",
    Description: "Putting clients first",
  },
];

const ProgressSection = () => {
  return (
    <div>
      <div className="flex flex-row justify-center  gap-1 items-center mt-28">
        <div className="w-[25%] flex flex-col gap-5">
          {timeline.map((element, idx) => {
            return (
              <div className="flex flex-row gap-6 " key={idx}>
                <div className="w-[50px] h-[50px] bg-white flex items-center">
                  <img src={element.Logo} alt="Logo1" />
                </div>
                <div className="w-[40px] h-[3px] mt-5">
                  <img src={line} />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative w-[26%] aspect-square shadow-blue-200 ">
          <img src={Progress} alt="progreeImg" className="w-full h-full rounded-full object-cover " />

          <div className="absolute w-[230px] h-[230px] rounded-full bg-green-300 flex flex-col justify-center items-center text-black uppercase py-10
            left-64 -top-16">
            <div className="flex flex-row gap-5 items-center px-4">
              <p className="text-3xl font-bold">3</p>
              <p className="text-black text-sm">Years Of Love</p>
            </div>
            <img src={Underline} className="w-[50%]" />
            <div className="flex gap-2 items-center  px-1">
              <p className="text-3xl font-bold">30K+</p>
              <p className="text-black text-sm">Students Served...</p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default ProgressSection;
