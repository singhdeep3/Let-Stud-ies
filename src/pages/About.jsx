import React from "react";
import Highlighter from "../components/core/Homepage/Highlighter";
import aboutImg1 from "../assets/Images/aboutImg1.jpg";
import aboutImg2 from "../assets/Images/aboutImg2.jpg";
import aboutImg3 from "../assets/Images/aboutImg3.jpg";
import story from "../assets/Images/story.jpg";
import Quote from "../components/core/AboutPage/Quote";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import Footer from "../components/common/Footer"
const About = () => {
  return (
    <div className="mt-40 w-full max-w-maxContent">
      <section className="bg-slate-600">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Shaping tomorrow with transformative{" "}
            <Highlighter text={"online education"}></Highlighter>
            <p className="mx-auto mt-3 text-center text-base font-medium text-white lg:w-[95%]">
              Driving innovation in online education, we’re creating smarter,
              more accessible learning experiences that empower individuals and
              shape a brighter, more connected future for all.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]">
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={aboutImg1} className="h-72" alt="Image" />
            <img src={aboutImg2} className="h-72 " alt="Image" />
            <img src={aboutImg3} className="h-72" alt="Image" />
          </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-800">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 font-bold text-3xl text-black">
        <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-blue-950">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#1f1717] to-[#f5cb0e] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Story</h1>
              <p className="text-base font-bold text-red-950 lg:w-[95%]">
                Our story began with a simple belief: quality education should
                be accessible to everyone, everywhere. Fueled by passion and
                purpose, we created a platform that delivers expert-led courses
                and curated study materials to empower learners of all
                backgrounds. Today, we continue to innovate, connect, and
                inspire—building a smarter future through online education.
              </p>
              <p className="text-base font-bold text-gray-950 lg:w-[95%]">
                We started with students in mind—real people looking for
                flexible, affordable ways to learn and grow. From comprehensive
                courses to trusted study resources, our platform is built to
                support your academic and career journey every step of the way.
                We believe in learning without limits, and our mission is to
                help you achieve more.
              </p>
            </div>
            <div>
              <img src={story} className="h-80 shadow-[0_0_20px_0] shadow-[#FC6767]" />
            </div>
          </div>

          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Vision</h1>
              <p className="text-base font-bold  text-gray-950 lg:w-[95%]">
                Our vision is rooted in the belief that education is the most
                powerful tool for transforming lives. We aspire to build a
                global community of learners where no one is left behind. By
                harnessing the power of digital innovation, we aim to make
                quality education more inclusive, more flexible, and more
                impactful. We want to reach learners in every corner of the
                world—regardless of their financial, physical, or social
                limitations—and give them the tools to unlock their potential.
                In doing so, we hope to create not just better students, but
                better thinkers, problem-solvers, and global citizens ready to
                shape a better world.
              </p>
            </div>

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">Our Mission</h1>
              <p className="text-base font-bold text-red-950 lg:w-[95%]">
                Our mission is to democratize education by bringing quality
                learning to every corner of the world. We are building a
                platform that supports learners at all stages of life—whether
                it’s starting school, changing careers, or mastering new skills.
                By offering a wide range of courses, study tools, and resources,
                we hope to make lifelong learning not only possible but
                enjoyable. Our content is carefully crafted by experts and
                driven by data, ensuring that every learner gets the support
                they need to succeed. We believe education is a journey—and
                we’re here for every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponent />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <ContactFormSection />
      </section>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-slate-600 text-white">
        
      <Footer />
    </div>



    </div>
  );
};

export default About;
