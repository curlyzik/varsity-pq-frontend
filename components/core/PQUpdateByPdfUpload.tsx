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
import { RootState } from "../../src/app/store";
import { UploadFile } from "antd/lib/upload/interface";

interface UploadChangeParameter<T extends object = UploadFile> {
  file: T;
  fileList: UploadFile[];
}

const UploadPdf: React.FC<{
  setUpdateVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUpdateVisible }) => {
  const { auth, pastQuestion } = useSelector(
    (state: RootState) => state.persistedReducer
  );
  const dispatch = useDispatch();
  console.log(pastQuestion);

  const [pdfUrl, setPdfUrl] = useState<UploadFile | string>(
    `${pastQuestion?.file}`
  );

  useEffect(() => {
    setPdfUrl(`${pastQuestion?.file}`);
  }, [pastQuestion]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [file, setFile] = useState<UploadFile | null>();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  /*When document gets loaded successfully*/
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleChange = async (info: UploadChangeParameter) => {
    console.log(info.file);
    setFile(info.file);
    setFileList(info.fileList);

    setPdfUrl(info.file);
  };

  const handleSubmit = async () => {
    const isPdf = file?.type === "application/pdf";
    if (!isPdf) {
      return message.error("You can only upload pdf file!", 3);
    }
    // Ignore if pdf file is greater than 2mb
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      return message.error(`${file.name} must smaller than 2MB!`);
    }

    const formData = new FormData();
    formData.append("course", pastQuestion.pqId!);
    formData.append("file", fileList[0].originFileObj as Blob);

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
      `${pastQuestion?.course_details.course_code} past question updated successfully!`,
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
      <div style={{ marginTop: 8 }} className="text-black">
        Change PQ PDF
      </div>
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
          showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
          defaultFileList={[
            {
              uid: "1",
              url: pastQuestion?.file!,
              name: pastQuestion?.course_details.course!,
            },
          ]}
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
          Update {pastQuestion?.course_details.course_code} past question
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
