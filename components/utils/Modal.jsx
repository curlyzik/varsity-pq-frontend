import React from "react";
import { Modal as AntModal, Button } from "antd";

const Modal = ({
  title = "Select Past Question",
  children,
  isModalVisible,
  handleOk,
  handleCancel,
  confirmLoading,
  loading,
  formSubmit
}) => {
  return (
    <div>
      <AntModal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="cancel"
            type="primary"
            onClick={formSubmit}
            loading={loading}
            className="text-black"
          >
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
