import { useState } from "react";
import API from "../services/api";

function UploadDocument() {

  const uploadFile = async (
    event: any
  ) => {

    const file =
      event.target.files[0];

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    await API.post(
      "/documents/upload",
      formData
    );

    alert(
      "Uploaded Successfully"
    );
  };

  return (
    <div>

      <h3>Upload PDF</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={uploadFile}
      />

    </div>
  );
}

export default UploadDocument;