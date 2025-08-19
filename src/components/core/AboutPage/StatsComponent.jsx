import React from "react";
const stats = [
  { count: "8K", label: "Students Online" },
  { count: "11+", label: "Mentors" },
  { count: "300+", label: "Courses" },
  { count: "66+", label: "Awards" },
];
const StatsComponent = () => {
  return(<div className="bg-green-500">
  <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
    <div className="grid grid-cols-2 md:grid-cols-4 text-center">
      {
        stats.map((data,idx) => {
          return (
            <div className="flex flex-col py-10" key={idx}>
              <h1 className="text-[30px] font-bold text-black">
                {data.count}
              </h1>
              <h2 className="font-semibold text-[16px] text-black">
                {data.label}
              </h2>
            </div>
          )
        })
      }
    </div>
  </div>
  </div>)
};

export default StatsComponent;
