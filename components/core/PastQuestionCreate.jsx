import React from "react";
import { Modal, UploadPdf } from "../index.js";

const PastQuestionCreate = ({
  showCreateModal,
  setShowCreateModal,
  setCourseDetails,
  courseDetails,
}) => {
  const handleCreateModalCancel = () => {
    setShowCreateModal(false);
    setCourseDetails({});
  };

  return (
    <div>
      <Modal
        title={
          <div className="!text-2xl">
            Create Past Question for{" "}
            <span className="!font-bold">{courseDetails.code}</span>
          </div>
        }
        isModalVisible={showCreateModal}
        handleCancel={handleCreateModalCancel}
        width={1000}
        footer={null}
      >
        <div className="!flex flex-col gap-y-6">
          <div>
            <h3 className="!mb-3 !text-lg font-bold">Course Details</h3>
            <div className="!grid grid-cols-4 gap-y-3 text-base">
              <div>Name: {courseDetails.name}</div>
              <div>Course Code: {courseDetails.code}</div>
              <div>Session: {courseDetails.year}</div>
              <div>Level: {courseDetails.level}</div>
              <div>Semester: {courseDetails.semester}</div>
            </div>
          </div>

          <div>
            <h3 className="!mb-3 !text-lg font-bold">Upload Past Question</h3>
            <div>
              {/* <UploadImage /> */}
              <UploadPdf courseDetails={courseDetails} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PastQuestionCreate;
