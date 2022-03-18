import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import {
  removePastQuestion,
  removePqId,
} from "../../src/features/pastquestions/pastQuestionSlice";

const UploadPdf = ({ setUpdateVisible }) => {
  const { auth, pastQuestion } = useSelector((state) => state.persistedReducer);
  const dispatch = useDispatch();

  const [pdfUrl, setPdfUrl] = useState(`${process.env.NEXT_PUBLIC_API_URL}${pastQuestion?.file}/`);

  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

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
    formData.append("course", pastQuestion.pqId);
    formData.append("file", fileList[0].originFileObj);

    // create past question
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/past-questions/${pastQuestion?.pqId}/`,
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
      setUpdateVisible(false);
      dispatch(removePastQuestion());
      dispatch(removePqId());
      setFileList([]);
      setFile(null);
      setLoading(false);
    } catch (error) {
      if (error) {
        setErrorMessage("Error updating past question");
      }
      setError(true);
      setSuccess(false);
      setLoading(false);
    }
  };

  const messageSuccess = () => {
    message.success(
      `${pastQuestion?.course_details?.course_code} past question updated successfully!`,
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
      <div style={{ marginTop: 8 }}>Change PQ PDF</div>
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
          defaultFileList={[
            {
              uid: 1,
              url: pastQuestion?.file,
              name: pastQuestion?.course_details?.course,
            },
          ]}
        >
          {uploadButton}
        </Upload>

        <Button
          onClick={handleSubmit}
          disabled={fileList.length === 0}
          loading={loading}
        >
          Upload {pastQuestion?.course_details?.course_code} past question
        </Button>
      </div>

      <div className="!mt-4 border md:!mt-0">
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
