import Template from "../components/core/Auth/Template";
import signupImg from "../assets/Images/signup.jpg"
export default function Signup({setIsLoggedIn}){


    return(<Template
    title={"Join the millions learning to code with StudyNotion for free"}
    desc1={"Build skills for today, tomorrow and beyond."}
    desc2={"Education to future-proof your career."}
    image={signupImg}
    formtype={"signup"}
    setIsLoggedIn={setIsLoggedIn}
    />)
}