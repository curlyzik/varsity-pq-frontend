import React, { useState } from "react";
import { Upload, Button, Modal, message } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const UploadPdf = () => {
  // states for ant design upload
  const [pdfFile, setPdfFile] = useState("");
  const [pdfFileTitle, setPdfFileTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload pdf file!", 3);
    }
    // Ignore if pdf file is greater than 2mb
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return (isPdf && isLt2M) || Upload.LIST_IGNORE;
  };

  const handleChange = async ({ fileList, file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPdfFile(file.url || file.preview);
    setPdfFileTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setFileList(fileList);
  };

  console.log(fileList);
  const uploadButton = (
    <div className="!flex flex-col items-center justify-center">
      <AiOutlineUpload />
      <div style={{ marginTop: 8 }}>Upload PDF</div>
    </div>
  );
  return (
    <div>
      <>
        <Upload
          listType="picture-card"
          onChange={handleChange}
          beforeUpload={beforeUpload}
          maxCount={1}
          showUploadList={{ showPreviewIcon: false }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </>
    </div>
  );
};

export default UploadPdf;
