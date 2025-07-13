import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import AllCourses from "./InstructorCourses/AllCourses";
const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (token) setCourses(result);
    };
    fetchCourses();
  }, []);
  return <div>
    <div>
        <h1>MY COURSES</h1>
        <IconBtn text={"Add Courses"} onClick={()=>navigate("/dashboard/add-course")}/>
    </div>
    {
        courses && <AllCourses  courses={courses} setCourses={setCourses}/>
    }
  </div>;
};

export default MyCourses;
