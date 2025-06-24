import React from "react";
import Highlighter from "../Homepage/Highlighter";

const Quote = () => {
  return (
    <div>
      We’re driving innovation in online education to empower
      <Highlighter text={"learners worldwide."} />
      <span className="text-blue-700"> By reimagining</span> how knowledge is
      shared, we’re building smarter, more accessible learning experiences
      <span className="text-amber-400">
        {" "}
        for a brighter and more connected future.
      </span>
    </div>
  );
};

export default Quote;
