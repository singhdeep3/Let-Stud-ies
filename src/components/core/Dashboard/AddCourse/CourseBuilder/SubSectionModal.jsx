import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";
const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (view || add) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDec", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValue = getValues();
    const formdata = new FormData();
    console.log(modalData.sectionId)
    formdata.append("sectionId", modalData.sectionId);
    formdata.append("subSectionId", modalData._id);
    if (currentValue.lectureTitle !== modalData.title) {
      formdata.append("title", currentValue.lectureTitle);
    }
    if (currentValue.lectureDesc !== modalData.description) {
      formdata.append("description", currentValue.lectureDesc);
    }
    if (currentValue.lectureVideo !== modalData.videoUrl) {
      formdata.append("video", currentValue.lectureVideo);
    }
    setLoading(true);
    const result = await updateSubSection(formdata, token );
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No change made in form...");
      } else {
        handleEditSubSection();
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);
    console.log(formData.entries())

    const result = await createSubSection( formData, token );
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      console.log(updatedCourse)
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };
  return (
    <div>
      <div>
        <div>
          <p>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button
            onClick={() => {
              !loading ? setModalData(null) : {};
            }}
          >
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div>
            <label htmlFor="lectureTitle">Lecture Title</label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full"
            />
            {errors.lectureTitle && <span>Lecture Title is required.</span>}
          </div>
          <div>
            <label htmlFor="">Label Description</label>
            <textarea
              name=""
              id="lectureDesc"
              placeholder="Enter Lecture Description."
              {...register("lectureDesc", { required: true })}
              className="w-full min-h-[130px]"
            />
            {errors.lectureDesc && (
              <span>Lecture Description is required.</span>
            )}
          </div>
          {!view && (
            <div>
              <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
