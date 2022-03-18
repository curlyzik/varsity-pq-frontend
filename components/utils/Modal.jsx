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
  closable,
  width,
  centered,
  key,
  destroyOnClose,
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
        closable={closable}
        width={width}
        centered={centered}
        key={key}
        destroyOnClose={destroyOnClose}
      >
        {children}
      </AntModal>
    </div>
  );
};

export default Modal;
