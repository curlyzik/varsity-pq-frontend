import React from "react";
import { Modal as AntModal, Button } from "antd";

const Modal = ({
  title = "Select Past Question",
  children,
  isModalVisible,
  handleOk,
  handleCancel,
  confirmLoading,
  footer,
}) => {
  return (
    <div>
      <AntModal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={footer}
      >
        {children}
      </AntModal>
    </div>
  );
};

export default Modal;
