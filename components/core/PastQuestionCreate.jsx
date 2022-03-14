import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCourseId } from "../../src/features/courses/courseDetailSlice.js";
import { Modal } from "../index.js";

const PastQuestionCreate = ({ showCreateModal, setShowCreateModal }) => {
  const { auth, courseDetail } = useSelector((state) => state.persistedReducer);
  const { courseId } = courseDetail;
  console.log(courseId);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowCreateModal(false);
    dispatch(removeCourseId());
  };

  return (
    <div>
      <Modal
        title={`Create Past Question for ${courseId}`}
        isModalVisible={showCreateModal}
        handleCancel={handleCancel}
        centered={true}
        width={1000}
      ></Modal>
      <div></div>
    </div>
  );
};

export default PastQuestionCreate;
