import React from "react";
import Highlighter from "./Highlighter";
const CodeLanguageSection = () => {
  return (
    <div className="mt-40">
      <div className="flex flex-col gap-5 ">
        <div className="text-4xl font-semibold text-center">
          One tool. Every language.{" "}
          <Highlighter text={" Endless possibilities."} />
        </div>
        <div className="text-center text-black mx-auto text-base mt-3 w-[60%]">
        Unlock the power to learn any language with ease. Whether you're a beginner or advanced, our all-in-one platform adapts to your pace, style, and goals—bringing fluency within reach, wherever you start your journey.
        </div>
        <div className="flex flex-row items-center justify-center mt-5">
          
        </div>
      </div>
    </div>
  );
};

export default CodeLanguageSection;
