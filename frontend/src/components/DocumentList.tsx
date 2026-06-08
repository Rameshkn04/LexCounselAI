import { useEffect, useState } from "react";
import API from "../services/api";

function DocumentList() {

  const [documents, setDocuments] =
    useState([]);

  const loadDocuments = () => {

    API.get("/documents/list")
      .then((response) => {

        setDocuments(
          response.data
        );

      })
      .catch((error) => {

        console.error(error);

      });

  };

  useEffect(() => {

    loadDocuments();

  }, []);

  const deleteDocument = async (
    id: number
  ) => {

    try {

      await API.delete(
        `/documents/${id}`
      );

      setDocuments((prev: any) =>
        prev.filter(
          (doc: any) => doc.id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete document"
      );

    }
  };

  return (

    <div>

      <h3>
        Documents
      </h3>

      {documents.map(
        (doc: any) => (

          <div
            key={doc.id}
            className="document-card"
          >
          <span title={doc.filename}>
            📄 {doc.filename}
          </span>

          <button
          className="delete-btn"
          onClick={() =>
          deleteDocument(doc.id)
       }
      >
      ✕
      </button>
    </div>

        )
      )}

    </div>

  );
}

export default DocumentList;