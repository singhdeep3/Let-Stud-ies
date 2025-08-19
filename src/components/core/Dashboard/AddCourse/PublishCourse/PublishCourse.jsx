import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  },[]);
  const goBack = () => {
    dispatch(setStep(2));
  };
  const allCourses = () => {
    dispatch(resetCourseState());
    // navigate("/dashboard/my-courses")
  };
  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // Nothing Updated
      allCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) allCourses();
    setLoading(false);
  };
  const onSubmit = () => {
    handleCoursePublish();
  };
  return (
    <div className="rounded-md border-[1px] bg-black p-6 border-gray-800">
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="rounded-2xl h-4 w-4"
            />
            <span className="mt-5">Make this course Public ?</span>
          </label>
        </div>

        <div className="flex justify-end gap-x-4 ">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex p-3 items-center rounded-md"
          >
            Back
          </button>
          <IconBtn  disabled={loading} text={"Save Changes?"} />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
