import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import { Rating } from "react-simple-star-rating";


const Course_Card = ({ course, height }) => {
  const [avgReview, setAvgReview] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReview(count);
  }, [course]);

  return (
    <div>
      <Link to={`/courses/${course._id}`}>
        <div>
          <div>
            <img
              src={course?.thumbnail}
              alt="Thumbnail"
              className={`${height} w-[550px] rounded-xl object-cover`}
            />
          </div>
          <div>
            <p>{course?.courseName}</p>
            <p>
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex flex-row gap-3">
              <span>{avgReview || 0}</span>
              {/* <RatingStars Review_Count={avgReview} /> */}
              <div className="flex ml-8 -m-[38px]">
              <Rating
                                style={{display:"flex",rotate:"90deg"}}
                                  initialValue={avgReview}
                                  readonly={true}
                                  size={20}
                                  fillColor="#f1a545"
                                />
              </div>
             
              <span className="ml-20">{course?.ratingAndReviews?.length}  Ratings</span>
            </div>
            <p>{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
