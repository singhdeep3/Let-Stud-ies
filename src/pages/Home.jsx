import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "../App.css";
import CoverVideo from "../assets/Images/CoverVideo.mp4";
import Highlighter from "../components/core/Homepage/Highlighter";
import CTAButton from "../components/core/Homepage/CTAButton";
import EditorBlock from "../components/core/Homepage/EditorBlock";
import ProgressSection from "../components/core/Homepage/ProgressSection";
import CodeLanguageSection from "../components/core/Homepage/CodeLanguageSection";
import InstructorContainer from "../components/core/Homepage/InstructorContainer"
import Footer from "../components/common/Footer";
import Cards from "../components/core/Homepage/Cards"


const Home = () => {
  return (
    <div>
      {/* Section 1 */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-center">
        <Link to={"/signUp"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-amber-50 font-bold text-black transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-3 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-amber-100">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Build Your Own Destiny and
          <Highlighter text={"Knowledge"} />
        </div>

        <div className="w-[70%] mt-4 text-center text-lg font-bold  text-rose-950">
          This isn't just a platform. It's a starting line for students hungry
          to become more, and for creators ready to teach, inspire, and leave a
          mark. Wherever you are on your journey—learning, teaching, or
          dreaming—you belong here. Because your next chapter might just begin
          with a single click.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signUp"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="w-8/12 h-8/12  mx-3 my-14">
          <video muted loop autoPlay>
            <source src={CoverVideo} type="video/mp4" />
          </video>
        </div>

        {/* Editor Section 1 */}
        <div className="w-11/12">
          <EditorBlock
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Explore yourself in <Highlighter text={"code-world"} /> with the
                help our courses.
              </div>
            }
            subheading={
              "Explore the world of coding with clear guidance and practical learning. Our courses are designed to help you build real skills, whether you're a beginner or looking to advance. With our support, you'll stay motivated, confident, and ready to turn your ideas into working code. Let's start building together."
            }
            ctabtn1={{
              text: "Try it yourself",
              linkto: "/signUp",
              active: true,
            }}
            ctabtn2={{
              text: "Learn More",
              linkto: "login",
              active: false,
            }}
            editorblock={`<!DOCTYPE html>\n<html>\n<head><title>Pheonix</title>\n<link rel="stylesheets" href="styles.css">\n</head>\n<body>\n<p><a href="Pheonix.com">Help</p>\n</body>\n</html> `}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Editor Section 2 */}
        <div className="w-11/12">
          <EditorBlock
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Build Skills. Build <Highlighter text={"Confidence."} />
              </div>
            }
            subheading={
              "Confidence in coding doesn’t come from reading about it—it comes from doing it. Our courses are designed to help you build real, usable skills through a hands-on, practical approach. Each lesson is crafted to be clear, engaging, and goal-focused, so you always know what you're working toward."
            }
            ctabtn1={{
              text: "Try it yourself",
              linkto: "/signUp",
              active: true,
            }}
            ctabtn2={{
              text: "Learn More",
              linkto: "login",
              active: false,
            }}
            editorblock={`<!DOCTYPE html>\n<html>\n<head><title>Pheonix</title>\n<link rel="stylesheets" href="styles.css">\n</head>\n<body>\n<p><a href="Pheonix.com">Help</p>\n</body>\n</html> `}
            codeColor={"text-yellow-25"}
          />
        </div>

        <Cards />
      </div>

      {/* Section 2 */}

      <div className="bg-white text-black ">
        <div className="h-[333px] pattern">
          <div className=" w-11/12 mb-16  max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="flex flex-row gap-7 mt-64 mb-24 text-white">
              <CTAButton active={true} linkto={"/signUp"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signUp"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-7">
          <div className="flex flex-row gap-7 items-center justify-center">
            <div className="text-4xl font-semibold w-[30%] pb-14">
              Skip the fluff—build skills that{" "}
              <Highlighter text={"open doors."} />
            </div>

            <div className="flex flex-col gap-10 w-[37%]">
              <div className="text-[16px]">
                Skip the fluff—build skills that open doors. Our courses are
                focused, practical, and built to help you learn what actually
                matters in today’s tech world.
              </div>
              <CTAButton active={true} linkto={"/signUp"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <ProgressSection />
          <CodeLanguageSection />
        </div>
      </div>

      {/* Section 3 */}

      <div className="flex flex-col w-11/12 mx-auto max-w-maxContent items-center justify-between gap-8 text-white ">

        <InstructorContainer />
        <h2 className="text-center text-4xl font-semibold mt-10 ">See What People Say...</h2>


      </div>

      {/* Footer */}
      <Footer />



    </div>
  );
};

export default Home;
