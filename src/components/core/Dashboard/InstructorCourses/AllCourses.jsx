import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Thead, Tr,Th } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import Confirmation from "../../../common/Confirmation";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const AllCourses = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) setCourses(result);
    setConfirmationModal(null);
    setLoading(null);
  };
  return (
    <div>
        <Table>
          <Thead>
            <Tr>
              <Th>Courses</Th>
              <Th>Duration</Th>
              <Th>Price</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.length === 0 ? (
              <Tr>
                <Td>No Courses Found :-(</Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr key={course._id} className="flex gap-x-10 p-8">
                  <Td>
                    <img
                      src={course?.thumbnail}
                      className="h-[150px] w-[220px] rounded-lg object-cover"
                      alt="Thumbail"
                    />
                    <div className="flex flex-col">
                      <p>{course.courseName}</p>
                      <p>{course.courseDescription}</p>
                      <p>Created at :</p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="text-blue-950 font-bold">Draft</p>
                      ) : (
                        <p className="text-red-900 font-bold">Published</p>
                      )}
                    </div>
                  </Td>
                  <Td>2hr 30min</Td>
                  <Td>{course.price}</Td>
                  <Td>
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`);
                      }}
                      className="mr-8"
                    >
                      EDIT
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you really want to delete this course?",
                          text2:
                            "This course content will also be deleted with this operation.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                    >
                      DELETE
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      {confirmationModal && <Confirmation modalData={confirmationModal} />}
    </div>
  );
};

export default AllCourses;
