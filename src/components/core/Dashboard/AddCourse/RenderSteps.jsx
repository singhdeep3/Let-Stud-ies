import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse/PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div>
      {steps.map((item, idx) => (
        <div
          className={`${
            step === item.id
              ? "bg-amber-400 border-red-500 text-black"
              : "border-amber-400 bg-amber-200 text-black"
          }`} key={idx}
        >
          {step > item.id ? <FaCheck /> : item.id}
        </div>
      ))}
      <div>
        {steps.map((item,idx) => (
            <div key={idx}>
              <p >{item.title}</p>{" "}
            </div>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default RenderSteps;
