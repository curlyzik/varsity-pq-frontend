import { Upload, Modal, Button } from "antd";
import { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Cropper from "react-cropper";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const PicturesWall = () => {
  // states for ant design
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  // states for cropper js
  const [cropper, setCropper] = useState();
  const [croppedData, setCroppedData] = useState();

  const getCroppedData = () => {
    if (typeof cropper !== "undefined") {
      setCroppedData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  // ant design image upload settings
  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = async ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadButton = (
    <div>
      <AiOutlinePlusSquare />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  console.log(croppedData);
  return (
    <>
      <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Cropper
          src={previewImage}
          scalable={false}
          zoomable={false}
          onInitialized={(instance) => setCropper(instance)}
        />
        <Button onClick={getCroppedData}>Crop Data</Button>
      </Modal>
      <img src={croppedData} />
    </>
  );
};

export default PicturesWall;