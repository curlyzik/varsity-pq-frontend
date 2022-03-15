import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";

const UploadPdf = ({ courseDetails, setShowCreateModal, setCourseDetails }) => {
  const { auth } = useSelector((state) => state.persistedReducer);

  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = async ({ fileList, file }) => {
    setFile(file);
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      return message.error("You can only upload pdf file!", 3);
    }
    // Ignore if pdf file is greater than 2mb
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return message.error(`${file.name} must smaller than 2MB!`);
    }

    const formData = new FormData();
    formData.append("course", courseDetails.id);
    formData.append("file", fileList[0].originFileObj);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/past-questions/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(data);
      setSuccess(true);
      setShowCreateModal(false);
      setCourseDetails({});
      setFileList([]);
      setFile(null);
      setLoading(false);
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.message);
      }
      setError(true);
      setSuccess(false);
      setLoading(false);
    }
  };

  const messageSuccess = () => {
    message.success(
      `${courseDetails.code} past question uploaded successfully!`,
      3,
      () => {
        return setSuccess(false);
      }
    );
  };

  const messageError = () => {
    message.error(errorMessage, 3, () => {
      return setError(false);
    });
  };

  useEffect(() => {
    if (success) {
      messageSuccess();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      messageError();
    }
  }, [error]);

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

        <Button
          onClick={handleSubmit}
          disabled={fileList.length === 0}
          loading={loading}
        >
          Upload {courseDetails.code} past question
        </Button>
      </>
    </div>
  );
};

export default UploadPdf;
