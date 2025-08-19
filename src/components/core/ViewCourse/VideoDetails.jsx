import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseSectionData.length) return;
    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`);
      return;
    }
    const filteredData = courseSectionData.find(
      (course) => course._id === sectionId
    );
    const filteredVideoData = filteredData?.subSection.find(
      (data) => data._id === subSectionId
    );
    setVideoData(filteredVideoData);
    setPreviewSource(courseEntireData.thumbnail);
    setVideoEnded(false);
  }, [courseSectionData, courseEntireData, location.pathname]);

  // Your existing helper functions: isFirstVideo, goToNextVideo, goToPrevVideo, isLastVideo
  // (Keep them as is)
  const isFirstVideo = () => {
    const secIndex = courseSectionData.findIndex((cs) => cs._id === sectionId);
    const subIndex = courseSectionData[secIndex]?.subSection.findIndex(
      (ss) => ss._id === subSectionId
    );
    return secIndex === 0 && subIndex === 0;
  };

  const isLastVideo = () => {
    const secIndex = courseSectionData.findIndex((cs) => cs._id === sectionId);
    const subIndex = courseSectionData[secIndex]?.subSection.findIndex(
      (ss) => ss._id === subSectionId
    );
    const lastSecIndex = courseSectionData.length - 1;
    const lastSubIndex = courseSectionData[secIndex]?.subSection.length - 1;
    return secIndex === lastSecIndex && subIndex === lastSubIndex;
  };

  const goToNextVideo = () => {
    const secIndex = courseSectionData.findIndex((cs) => cs._id === sectionId);
    const subArr = courseSectionData[secIndex]?.subSection || [];
    const subIndex = subArr.findIndex((ss) => ss._id === subSectionId);

    if (subIndex < subArr.length - 1) {
      const nextId = subArr[subIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextId}`
      );
    } else {
      const nextSection = courseSectionData[secIndex + 1];
      if (nextSection) {
        const nextId = nextSection.subSection[0]._id;
        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextId}`
        );
      }
    }
  };

  const goToPrevVideo = () => {
    const secIndex = courseSectionData.findIndex((cs) => cs._id === sectionId);
    const subArr = courseSectionData[secIndex]?.subSection || [];
    const subIndex = subArr.findIndex((ss) => ss._id === subSectionId);

    if (subIndex > 0) {
      const prevId = subArr[subIndex - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevId}`
      );
    } else {
      const prevSection = courseSectionData[secIndex - 1];
      if (prevSection) {
        const prevId =
          prevSection.subSection[prevSection.subSection.length - 1]._id;
        navigate(
          `/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevId}`
        );
      }
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white aspect-video">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div className="relative w-full h-full bg-black">
          <video
            ref={videoRef}
            src={videoData.videoUrl || ""}
            controls
            autoPlay={false}
            muted={false}
            onEnded={() => setVideoEnded(true)}
            className="w-full h-full object-contain bg-black"
          />
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-50 grid h-full place-content-center font-inter text-center px-4"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
