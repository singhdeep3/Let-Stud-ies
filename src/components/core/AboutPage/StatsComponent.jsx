import React from "react";
const stats = [
  { count: "8K", label: "Students Online" },
  { count: "11+", label: "Mentors" },
  { count: "300+", label: "Courses" },
  { count: "66+", label: "Awards" },
];
const StatsComponent = () => {
  return <section>
    <div>
      <div className="flex">
        {
          stats.map((data,idx) => {
            return (
              <div>
                <h1>
                  {data.count}
                </h1>
                <h2>
                  {data.label}
                </h2>
              </div>
            )
          })
        }
      </div>
    </div>
  </section>;
};

export default StatsComponent;
