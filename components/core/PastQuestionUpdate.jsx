import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removePastQuestion,
  removePqId,
} from "../../src/features/pastquestions/pastQuestionSlice.js";
import { Modal, Table, PQUpdateByPdfUpload } from "../index.js";

const PastQuestionUpdate = ({
  updateVisible,
  setUpdateVisible,
  data,
  tableLoading,
}) => {
  const { pastQuestion } = useSelector((state) => state.persistedReducer);
  const dispatch = useDispatch();

  const handleUpdateModalCancel = () => {
    setUpdateVisible(false);
    dispatch(removePastQuestion());
    dispatch(removePqId());
  };

  // table columns
  const columns = [
    {
      title: <h3 className="font-extrabold">Course Code</h3>,
      dataIndex: "course_code",
      key: "course_code",
      fixed: "left",
      width: 50,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "name",
      width: 100,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 50,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 50,
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      width: 50,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        scroll={{ x: 900, y: 300 }}
        loading={tableLoading}
      />
      <Modal
        title={
          <div className="text-xl lg:!text-2xl">
            Update Past Question for{" "}
            <span className="!font-bold">
              {pastQuestion?.course_details?.course_code}
            </span>
          </div>
        }
        isModalVisible={updateVisible}
        handleCancel={handleUpdateModalCancel}
        width={1000}
        footer={null}
        destroyOnClose={true}
      >
        <div className="!flex flex-col gap-y-6">
          <div>
            <h3 className="!mb-3 !text-lg font-bold">Course Details</h3>
            <div className="!flex grid-cols-4 flex-col gap-y-3 text-base lg:!grid">
              <div>Name: {pastQuestion?.course_details?.course}</div>
              <div>
                Course Code: {pastQuestion?.course_details?.course_code}
              </div>
              <div>Session: {pastQuestion?.course_details?.year}</div>
              <div>Level: {pastQuestion?.course_details?.level}</div>
              <div>Semester: {pastQuestion?.course_details?.semester}</div>
            </div>
          </div>

          <div>
            <h3 className="!mb-3 !text-lg font-bold">Upload Past Question</h3>
            <div className="!overflow-hidden">
              <PQUpdateByPdfUpload setUpdateVisible={setUpdateVisible} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PastQuestionUpdate;
