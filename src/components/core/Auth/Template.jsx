import frameImage from "../../../assets/frame.png"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";
export default function Template({
  title,
  desc1,
  desc2,
  image,
  formtype,
  setIsLoggedIn,
}) {
  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto justify-between gap-y-0">
      <div className="w-11/12 max-w-[450px]">
        <h1 className="font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] mt-4">
          <span className="text-amber-100">{desc1}</span>
          <br />
          <span className="text-red-950 italic">{desc2}</span>
        </p>

        {formtype == "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}

        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="h-[1px] w-full bg-amber-300"></div>
          <p className="text-amber-300 font-medium leading-[1.375rem]">OR</p>
          <div className="h-[1px] w-full bg-amber-300"></div>
        </div>

        <button className="w-full flex justify-center items-center bg-pink-800 cursor-pointer rounded-[8px] font-medium text-amber-50 px-[12px] py-[8px] gap-x-2 mt-6">
          <FcGoogle />
          <p>Sign in with Google</p>
        </button>
      </div>

      <div className="relative w-11/12 max-w-[450px]">
        <img
          src={frameImage}
          alt="frameimg"
          width={558}
          height={504}
          loading="lazy"
        />
        <img
          src={image}
          alt="Userimg"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4"
        />
      </div>
    </div>
  );
}