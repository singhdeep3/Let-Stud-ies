import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div>
      <h1>Enrolled Courses</h1>
      {!enrolledCourses ? (
        <div>Loading ...</div>
      ) : !enrolledCourses.length ? (
        <p>You are not enrolled in any course yet!</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>
          {enrolledCourses.map((course, idx) => (
            <div>
              <div>
                <img src={course.thumbnail} alt="Thumbnail" />
                <div key={idx}>
                  <p>{course.courseName}</p>
                  <p>{course.courseDescription}</p>
                </div>
              </div>

              <div>{course?.totalDuration}</div>

              <div>
                <p>Progress: {course.progressPercentage || 0}</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
