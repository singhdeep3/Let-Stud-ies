import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../../../services/operations/authAPI"
export default function LoginForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { email, password } = formData

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(login(email, password, navigate))
    setIsLoggedIn(true);
    toast.success("Logged In");
    navigate("/dashboard");
  }


  return (
    <form className="flex flex-col w-full gap-y-4 mt-6">
      <label className="w-full ">
        <p className="text-[0.875rem] text-amber-50 mb-1 leading-[1.375rem]">
          Email Address<sup className="text-pink-600 ">*</sup>
        </p>
        <input
          type="email"
          required
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter E-mail"
          name="email"
          className="bg-slate-900 rounded-[0.5rem] text-amber-50 w-full p-[12px] border-b-[0.1rem] border-b-orange-200"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-amber-50 mb-1 leading-[1.375rem]">
          Password<sup className="text-black"> *</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="bg-slate-900 rounded-[0.5rem] text-amber-50 w-full p-[12px] border-b-[0.1rem] border-b-orange-200"
        />

        <span className="absolute cursor-pointer  right-3 top-[38px]" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
        </span>

        <Link to="/forgot-password">
          <p className="text-xs mt-1 text-blue-400 max-w-max ml-auto">Forgot Password</p>
        </Link>
      </label>
      <button className=" bg-pink-700 rounded-[8px] font-medium text-black px-[12px] py-[8px] cursor-pointer login" onClick={submitHandler}>Log In</button>
    </form>
  );
}