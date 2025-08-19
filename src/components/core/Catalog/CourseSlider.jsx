import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import { FreeMode, Pagination } from "swiper";
import Course_Card from "./Course_Card";

const CourseSlider = ({ courses }) => {
  return (
    <div>
      {courses?.length ? (
        <Swiper
          // loop
          spaceBetween={150}
          pagination={{ dynamicBullets: true }}
          breakpoints={{ 1024: { slidesPerView: 2 } }}
        >
          {courses?.map((course, idx) => (
            <SwiperSlide key={idx}>
              <Course_Card course={course} height={"h-[250px"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found :-(</p>
      )}
    </div>
  );
};

export default CourseSlider;
