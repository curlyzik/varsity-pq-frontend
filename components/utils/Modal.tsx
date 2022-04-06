import React from "react";
import { Modal as AntModal, Button } from "antd";

interface ModalProps {
  title?: string;
  isModalVisible?: boolean | undefined;
  handleOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleCancel?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void | undefined;
  confirmLoading?: boolean | undefined;
  footer?: React.ReactNode;
  closable?: boolean | undefined;
  width?: string | number | undefined;
  centered?: boolean | undefined;
  key?: React.Key | number | undefined;
  destroyOnClose?: boolean | undefined;
}

const Modal: React.FC<ModalProps> = ({
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
        title={
          <div className="text-xl font-semibold dark:text-white">{title}</div>
        }
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
        className="dark:bg-[#111]"
      >
        {children}
      </AntModal>
    </div>
  );
};

export default Modal;
