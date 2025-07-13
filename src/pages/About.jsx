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
    <div className="mt-40 w-11/12 max-w-maxContent">
      <section>
        <div>
          <header>
            Shaping tomorrow with transformative{" "}
            <Highlighter text={"online education"}></Highlighter>
            <p>
              Driving innovation in online education, we’re creating smarter,
              more accessible learning experiences that empower individuals and
              shape a brighter, more connected future for all.
            </p>
          </header>
          <div className="flex gap-x-4 mx-auto">
            <img src={aboutImg1} className="h-72" alt="Image" />
            <img src={aboutImg2} className="h-72 " alt="Image" />
            <img src={aboutImg3} className="h-72" alt="Image" />
          </div>
        </div>
      </section>

      <section>
        <div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="flex flex-col">
          <div className="flex">
            <div>
              <h1>Our Story</h1>
              <p>
                Our story began with a simple belief: quality education should
                be accessible to everyone, everywhere. Fueled by passion and
                purpose, we created a platform that delivers expert-led courses
                and curated study materials to empower learners of all
                backgrounds. Today, we continue to innovate, connect, and
                inspire—building a smarter future through online education.
              </p>
              <p>
                We started with students in mind—real people looking for
                flexible, affordable ways to learn and grow. From comprehensive
                courses to trusted study resources, our platform is built to
                support your academic and career journey every step of the way.
                We believe in learning without limits, and our mission is to
                help you achieve more.
              </p>
            </div>
            <div>
              <img src={story} />
            </div>
          </div>

          <div className="flex">
            <div>
              <h1>Our Vision</h1>
              <p>
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

            <div>
              <h1>Our Mission</h1>
              <p>
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
      <ContactFormSection/>
      <Footer/>


    </div>
  );
};

export default About;
