import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../services/operations/authAPI";
import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import {ACCOUNT_TYPE} from "../../../utils/constants"
export default function SignupForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password != formData.confirmPassword) {
      toast.error("Password is not matched!");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  return (
    <div>
      <div className="flex mt-3 rounded-full bg-slate-700 p-1 gap-x-1 max-w-max">
        <button
          className={`${
            accountType === "student"
              ? "bg-slate-950  text-white"
              : "bg-transparent text-slate-400"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("student")}
        >
          Student
        </button>
        <button
          className={`${
            accountType === "instructor"
              ? "bg-slate-950 text-white"
              : "bg-transparent text-slate-400"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("instructor")}
        >
          Instructor
        </button>
      </div>

      <form>
        {/* First and Last name div */}
        <div className="flex gap-x-4 mt-[20px]">
          <label className="w-full">
            <p className="text-[0.875rem] text-amber-50 mb-1 leading-[1.375rem]">
              First Name<sup className="text-pink-600 ">*</sup>
            </p>
            <input
              type="text"
              required
              name="firstName"
              onChange={changeHandler}
              value={formData.firstName}
              placeholder="Enter First Name"
              className="bg-slate-900 rounded-[0.5rem] text-amber-50 w-full p-[12px] border-b-[0.1rem] border-b-orange-200"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-amber-50 mb-1 leading-[1.375rem]">
              Last Name<sup className="text-pink-600 ">*</sup>
            </p>
            <input
              type="text"
              required
              name="lastName"
              onChange={changeHandler}
              value={formData.lastName}
              placeholder="Enter Last Name"
              className="bg-slate-900 rounded-[0.5rem] text-amber-50 w-full p-[12px] border-b-[0.1rem] border-b-orange-200"
            />
          </label>
        </div>
        <div className="mt-[20px]">
          <label className="w-full ">
            <p className="text-[0.875rem] text-amber-50 mb-1 leading-[1.375rem]">
              E-Mail Address<sup className="text-pink-600 ">*</sup>
            </p>
            <input
              type="email"
              required
              name="email"
              onChange={changeHandler}
              value={formData.email}
              placeholder="Enter E-Mail"
              className="bg-slate-900 rounded-[0.5rem] text-amber-50 w-full p-[12px] border-b-[0.1rem] border-b-orange-200"
            />
          </label>
        </div>

        <div className="flex gap-x-4 mt-[20px]">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-amber-50 mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-600 ">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              onChange={changeHandler}
              value={formData.password}
              placeholder="Enter Password"
              className="bg-slate-900 rounded-[0.5rem] text-amber-50 w-full p-[12px] border-b-[0.1rem] border-b-orange-200"
            />
            <span
              className="absolute cursor-pointer  right-3 top-[38px]"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-amber-50 mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-600 ">*</sup>
            </p>
            <input
              type={confirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="bg-slate-900 rounded-[0.5rem] text-amber-50 w-full p-[12px] border-b-[0.1rem] border-b-orange-200"
            />
            <span
              className="absolute cursor-pointer  right-3 top-[40px]"
              onClick={() => setConfirmPassword((prev) => !prev)}
            >
              {confirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button
          className="w-full rounded-[8px] mt-6 bg-pink-700 cursor-pointer font-medium text-black px-[12px] py-[8px] login"
          onClick={submitHandler}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
