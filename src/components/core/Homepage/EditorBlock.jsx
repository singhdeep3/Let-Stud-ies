import React from "react";
import CTAButton from "./CTAButton";
import Highlighter from "./Highlighter";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const EditorBlock = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  editorblock,
  gradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-center gap-10  `}>
      {/* Section 1 */}
      <div className="w-[50%] h-72 flex flex-col gap-8 px-7">
        {heading}
        <div className="text-black font-bold ">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            {" "}
            <div className="flex gap-2 items-center">
              {ctabtn1.text}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {" "}
            <div className="flex gap-2 items-center">
              {ctabtn2.text}
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-[100%] h-72 flex flex-row  lg:w-[500px] py-4 ">
        <div className=" w-[10%]  text-center flex flex-col text-red-950 font-bold font-serif">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
        </div>

        <div
          className={`w-[90%]  flex flex-col relative  gap-2 font-bold ${codeColor} pr-2 `}
        >
          <div className="absolute -top-12 -left-32 w-110 h-50 rounded-full bg-[radial-gradient(circle,_rgba(163,234,123,0.7)_2%,_transparent_65%)] blur-2xl z-0 pointer-events-none" />
          <TypeAnimation
            sequence={[editorblock, 5000, ""]}
            repeat={Infinity}
            omitDeletionAnimation
            style={{
              whiteSpace: "pre-line",
              display: "block",
              border: "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorBlock;
