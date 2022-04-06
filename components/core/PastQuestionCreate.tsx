import React from "react";
import { Modal, PQCreateByPdfUpload } from "../index.js";

const PastQuestionCreate = ({
  showCreateModal,
  setShowCreateModal,
  setCourseDetails,
  courseDetails,
  fetchCourses,
}) => {
  const handleCreateModalCancel = () => {
    setShowCreateModal(false);
    setCourseDetails({});
  };

  return (
    <div>
      <Modal
        title={
          <div className="text-xl lg:!text-2xl">
            Create Past Question for{" "}
            <span className="!font-bold">{courseDetails.code}</span>
          </div>
        }
        isModalVisible={showCreateModal}
        handleCancel={handleCreateModalCancel}
        width={1000}
        footer={null}
        destroyOnClose={true}
      >
        <div className="!flex flex-col gap-y-6">
          <div>
            <h3 className="!mb-3 !text-lg font-bold">Course Details</h3>
            <div className="!flex grid-cols-4 flex-col gap-y-3 text-base lg:!grid">
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
              <PQCreateByPdfUpload
                fetchCourses={fetchCourses}
                courseDetails={courseDetails}
                setShowCreateModal={setShowCreateModal}
                setCourseDetails={setCourseDetails}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PastQuestionCreate;
