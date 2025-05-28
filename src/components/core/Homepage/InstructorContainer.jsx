import React from "react";
import Teacher from "../../../assets/Images/Teacher.jpeg";
import Highlighter from "./Highlighter";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorContainer = () => {
    return (
        <div className="mt-14 w-full">
            <div className="w-full flex flex-row  items-center justify-center ">
                <div className="w-[30%]">
                    <img src={Teacher} alt="" className="shadow-white" />
                </div>
                <div className="w-[40%] flex flex-col gap-10 ml-24">
                    <div className="w-[50%] text-4xl font-semibold">
                        Teach Others with <Highlighter text={"Your Knowledge."} />{" "}
                    </div>
                    <p className="text-lg font-bold text-black">
                        Share your wisdom freely, guiding others with the light of your
                        experience, so they too can grow, thrive, and pass on the knowledge
                        to empower future generations.
                    </p>
                    <CTAButton active={true} linkto={"/signUp"}>
                        <div className="flex flex-row gap-2 items-center">
                            Start Your Journey <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    );
};

export default InstructorContainer;
