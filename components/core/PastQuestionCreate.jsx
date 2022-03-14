import React from "react";
import { Modal } from "../index.js";
const PastQuestionCreate = ({
  courseId,
  setCourseId,
  showCreateModal,
  setShowCreateModal,
}) => {
  console.log(courseId);

  const handleCancel = () => {
    setShowCreateModal(false);
    setCourseId(null);
  };
  return (
    <div>
      <Modal
        title={`Create Past Question for ${courseId}`}
        isModalVisible={showCreateModal}
        handleCancel={handleCancel}
        centered={true}
        width={1000}
      >
        
      </Modal>
      <div></div>
    </div>
  );
};

export default PastQuestionCreate;
