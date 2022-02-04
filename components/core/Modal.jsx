import React from "react";
import { Modal as AntModal, Button } from "antd";

const Modal = ({ children, isModalVisible, handleOk, handleCancel }) => {
  return (
    <div>
      <AntModal
        title="Select Past Question"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="cancle" type="primary" onClick={handleOk} className="text-black">
            OK
          </Button>,
        ]}
      >
        {children}
      </AntModal>
    </div>
  );
};

export default Modal;
