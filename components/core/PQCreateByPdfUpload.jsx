import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";

const UploadPdf = ({
  courseDetails,
  setShowCreateModal,
  setCourseDetails,
  fetchCourses,
}) => {
  const { auth } = useSelector((state) => state.persistedReducer);

  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);

  console.log(fileList);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const [pdfUrl, setPdfUrl] = useState();

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  /*When document gets loaded successfully*/
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleChange = async ({ fileList, file }) => {
    setFile(file);
    setFileList(fileList);

    setPdfUrl(fileList[0].originFileObj);
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

    // create past question
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
      // fetch courses again after creating past question
      fetchCourses();
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
    <div className="block md:!flex md:flex-row">
      <div>
        <Upload
          accept=".pdf"
          listType="picture-card"
          onChange={handleChange}
          beforeUpload={() => false}
          maxCount={1}
          showUploadList={{ showPreviewIcon: false }}
        >
          {uploadButton}
        </Upload>

        <Button
          onClick={handleSubmit}
          disabled={fileList.length === 0}
          loading={loading}
          className="dark:bg-white dark:text-black dark:hover:bg-black 
                    dark:hover:text-white dark:focus:bg-black 
                    dark:focus:text-white"
        >
          Upload {courseDetails.code} past question
        </Button>
      </div>

      <div className="!mt-4 border p-4 md:!mt-0">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="canvas"
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default UploadPdf;
