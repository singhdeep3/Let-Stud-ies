import React from "react";
import Highlighter from "./Highlighter";
import image1 from "../../../assets/Images/image1.png";
import image2 from "../../../assets/Images/image2.png";
import image3 from "../../../assets/Images/image3.png";
import CTAButton from "./CTAButton";
const CodeLanguageSection = () => {
  return (
    <div className="mt-40 mb-32">
      <div className="flex flex-col items-center gap-5 ">
        <div className="text-4xl font-semibold text-center">
          One tool. Every language.{" "}
          <Highlighter text={" Endless possibilities."} />
        </div>
        <div className="text-center text-black mx-auto text-base mt-3 w-[60%]">
          Unlock the power to learn any language with ease. Whether you're a
          beginner or advanced, our all-in-one platform adapts to your pace,
          style, and goals—bringing fluency within reach, wherever you start
          your journey.
        </div>
        <div className="flex flex-row items-center justify-center mt-5 gap-7">
          <img
            src={image1}
            alt="image"
            className="h-96  w-64 object-contain rounded-2xl"
          />
          <img
            src={image2}
            alt="image"
            className="h-96 w-64  object-contain rounded-2xl"
          />
          <img
            src={image3}
            alt="image"
            className="h-96 w-64  object-contain rounded-2xl"
          />
        </div>
        <div className="mt-10">
          <CTAButton active={true} linkto={"/signUp"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default CodeLanguageSection;
