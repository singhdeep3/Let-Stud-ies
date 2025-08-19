import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";

const Course_Card = ({ course, height }) => {
  const [avgReview, setAvgReview] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview);
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
              className={`${height} w-full rounded-xl object-cover`}
            />
          </div>
          <div>
            <p>{course?.courseName}</p>
            <p>
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex gap-3">
              <span>{avgReview || 0}</span>
              <RatingStars Review_Count={avgReview} />
              <span>{course?.ratingAndReview?.length} Ratings</span>
            </div>
            <p>{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
