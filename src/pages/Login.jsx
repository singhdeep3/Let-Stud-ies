import loginImg from "../assets/Images/login.jpg"
import Template from "../components/core/Auth/Template"

export default function Login({setIsLoggedIn}){

  // <LoginForm setIsLoggedIn={setIsLoggedIn}/>
  return(<Template
  title={"Welcome Back"}
  desc1={"Build skills for today, tomorrow and beyond." }
  desc2={"Education to future-proof your career."}
  image={loginImg}
  formtype={"login"}
  setIsLoggedIn={setIsLoggedIn}/>
  )
}  