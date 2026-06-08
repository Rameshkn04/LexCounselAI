import React from "react";
import API from "../services/api";

function UploadDocument() {

  const uploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {

      await API.post(
        "/documents/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Uploaded Successfully"
      );

    } catch (error) {

      console.error(
        "Upload Error:",
        error
      );

      alert(
        "Upload Failed"
      );
    }
  };

  return (

    <div className="upload-container">

      <h3>
        📄 Upload PDF
      </h3>

      <label htmlFor="document-upload" className="sr-only">
        Upload PDF file
      </label>
      <input
        id="document-upload"
        type="file"
        accept=".pdf"
        onChange={uploadFile}
      />

    </div>
  );
}

export default UploadDocument;