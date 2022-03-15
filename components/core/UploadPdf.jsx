import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

const UploadPdf = ({ courseDetails }) => {
  // states for ant design upload
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState();

  const handleChange = async ({ fileList, file }) => {
    setFile(file);
    setFileList(fileList);
  };

  const handleSubmit = () => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      return message.error("You can only upload pdf file!", 3);
    }
    // Ignore if pdf file is greater than 2mb
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return message.error(`${file.name} must smaller than 2MB!`);
    }
  };

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
          accept=".pdf"
          listType="picture-card"
          onChange={handleChange}
          beforeUpload={() => false}
          maxCount={1}
          showUploadList={{ showPreviewIcon: false }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>

        <Button onClick={handleSubmit} disabled={fileList.length === 0}>
          Upload {courseDetails.code} past question
        </Button>
      </>
    </div>
  );
};

export default UploadPdf;
